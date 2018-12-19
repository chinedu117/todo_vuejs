import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as API from '@/api'

Vue.use(Vuex)

export const store =  new Vuex.Store({

	state: {
    // snackBar: {
    //   show:false,
    //   msg:'',
    //   type:''
    // },
		filter:'all',
 		todos:[],
    token: localStorage.getItem('access_token') || null,
    user: Object.assign({},JSON.parse(localStorage.getItem('user'))) || null
	},

	mutations: {
    // setSnackBar(state, msg, type)
    // {  
    //    state.snackBar.show = true
    //    state.snackBar.msg = msg
    //    state.snackBar.type = type
    // },

    saveUser(state, user) {
      
      const loggedUser = user
      state.user = loggedUser
      localStorage.setItem('user',JSON.stringify(loggedUser))

    },

  //set token in the local storage after successfull log in 
    saveToken(state, token) {
         
        const access_token  = 'Bearer ' + token
         state.token = access_token

         localStorage.setItem('access_token',access_token)
    },
    
    //clear the toekn from local storage after succccesfull logout
    clearToken(state) {

        localStorage.removeItem('access_token')
        state.token = null
        localStorage.removeItem('user')
        state.user = null
    },
    //initialise the list 
    emptyList(state) {
        
        state.todos = []
    },
		deleteTodo(state,todoID) {
            
            const index = state.todos.findIndex(todo => todo.id == todoID)

            state.todos.splice(index,1);

		},
        checkAll(state,checked) {

        	state.todos.forEach((todo)  => todo.completed = checked)
        },
        updateFilter(state,filter) {

          state.filter = filter
        },
        clearCompleted(state) {

        	state.todos = state.todos.filter(todo => !todo.completed)
        },
        addTodo(state,todo) {
             state.todos.push({
              'id':todo.id,
               'title':todo.title,
               'completed': false,
               'editing': false
           })
        },

		updateTodo(state,todo) {

           const index =  state.todos.findIndex(item => item.id == todo.id)
           	todo.editing = false
            state.todos.splice(index,1,todo)

         }

	},

	getters: {
    
  //  showSnackBar(state)
  //  {
  //     return state.snackBar.show
  //  },
   getUser(state) {
       
       return state.user
   },
   getToken(state) {
      
       return state.token
   },
   loggedIn(state) {

      return state.token != null
   },

	remainingTodo(state) {

        return state.todos.filter(todo => !todo.completed).length
        
     },

     anyRemaining(state,getters) {
       return getters.remainingTodo > 0
      // return true
     },

     todosFiltered(state) {

        if(state.filter == 'all'){
           
           return state.todos

        }else if(state.filter == 'completed'){

          return state.todos.filter(todo => todo.completed)

        }else if(state.filter == 'active'){

          return state.todos.filter(todo => !todo.completed)
        }else{

            return state.todos

        }
     },

     showCompleted(state) {

        	return state.todos.filter(todo => todo.completed).length > 0
        }
	},

	actions: {

    // showSnackBar(context,msg,type){
    //     context.commit('setSnackBar',msg,type)
    // },

    retrieveUser(context) {

      axios.defaults.headers.common['Authorization'] = context.getters.getToken
        
      return new Promise((resolve,reject) => {

          axios.get(API.USER_INFO_URL)
              .then(function (response) {
                
               // console.log(response.data)
                //save the token to local storage
              
               context.commit('saveUser', response.data)
         
               resolve(response)
                })
              .catch(function (error) {

                   // console.log(error)
                   reject(error)
               })

        })
    },

    logout(context) {
      
     
      axios.defaults.headers.common['Authorization'] = context.getters.getToken

      if(context.getters.loggedIn){

        return new Promise( (resolve,reject) => {
          axios.post(API.LOGOUT_URL)
              .then((response) => {

                //clear tkoen from the local storage and the state
              context.commit('clearToken')
                //console.log(response)
                
               
               resolve(response)
                })
              .catch((error)=> {
                   
                context.commit('clearToken')
                   console.log(error)
                   reject(error)
               })
        

      })

      }
      
      
    },

    register(context,params) {

        //console.log(params)
        
        return new Promise((resolve,reject) => {

          axios.post(API.REGISTER_URL,{
                     'name': params.name,
                     'password': params.password,
                     'email': params.email
                     })
              .then(function (response) {
                
               // console.log(response)
                //save the token to local storage
              //  context.commit('saveToken',response.data.access_token)
         
               resolve(response)
                })
              .catch(function (error) {

                   //console.log(error)
                   reject(error)
               })

        })

    },

    login(context, credentials) {
        
        
        return new Promise((resolve,reject) => {

          axios.post(API.LOGIN_URL,{
                     'username': credentials.username,
                     'password': credentials.password
                     })
              .then(function (response) {
                
                /// console.log(response)
                //save the token to local storage
               context.commit('saveToken',response.data.access_token)
         
               resolve(response)
                })
              .catch(function (error) {

                   // console.log(error)
                   reject(error)
               })

        })
        

    },



		addTodo(context,todo) {
         
      axios.defaults.headers.common['Authorization'] = context.getters.getToken
            axios.post(API.ADD_TODO_URL,todo)
	            .then(function (response) {
                  
	              context.commit('addTodo',response.data)


	              })
	            .catch(function (error) {

	              	 //console.log(error)
	             })

      
		},


		updateTodo(context,todo) {
           
      axios.defaults.headers.common['Authorization'] = context.getters.getToken
	           axios.patch(API.UPDATE_TODO_URL + todo.id,{
	           	'id': todo.id,
	           	'title': todo.title,
	           	'completed': todo.completed
	           })
	            .then(function (response) {
	              
	                 context.commit('updateTodo',todo)
	                 
	              })
	            .catch(function (error) {
	               //   console.log(error) 
	             })

           
         
		},
       
		retrieveTodoList(context) {
       //remove any existing data     
      context.commit('emptyList')
      axios.defaults.headers.common['Authorization'] = context.getters.getToken
			axios.get(API.TODO_LIST_URL)
            .then(function (response) {
                  
                 //   console.log(response.data)
                  
                  response.data.forEach((todo) => {
                     context.commit('addTodo',todo)
                  })
                   
              })
            .catch(function (error) {
              //  console.log(error)
             });
		},

		deleteTodo(context,todoID) {

      axios.defaults.headers.common['Authorization'] = context.getters.getToken
            axios.delete(API.DELETE_TODO_URL + todoID)
            .then(function (response) {
                  
                  
                  context.commit('deleteTodo',todoID)
                //   console.log('Successfully removed')
              })
            .catch(function (error) {
               // console.log(error)
             });
		},

		checkAll(context,checked) {
             
      axios.defaults.headers.common['Authorization'] = context.getters.getToken      
			 axios.patch(API.CHECKALL_TODO_URL,{
			 		completed: checked,
	           })
	            .then(function (response) {
	                 
	                  // console.log(response) 
	                 context.commit('checkAll',checked)
	                 
	              })
	            .catch(function (error) {
	                 // console.log(error) 
	             })

		},

		clearCompleted(context) {

			const completed = store.state.todos
			                  .filter(todo => todo.completed)
			                  .map(todo => todo.id)

  
      axios.defaults.headers.common['Authorization'] = context.getters.getToken
           axios.delete(API.DELETE_COMPLETED_TODO_URL,{
           	data: {
           		todos:completed,
           		} 
           })
            .then(function (response) {
                   
                  //  console.log('cleared')
                  context.commit('clearCompleted')
                 
              })
            .catch(function (error) {
               //  console.log(error)
             });
		}
	}
})

