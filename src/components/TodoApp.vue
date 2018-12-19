<template>
  <v-container grid-list-md text-xs-center class="page-wrapper">
      <v-layout row wrap>
        <div class="pb-4"><h3> Welcome, {{ user.name }}</h3></div>
         <v-flex xs12>
           <v-card>
              <v-toolbar>
                 <v-toolbar-side-icon>
                 </v-toolbar-side-icon>
                 <v-toolbar-title>
                   Todo
                 </v-toolbar-title>
                 <v-spacer>
                 </v-spacer>
              </v-toolbar>
              

              
                

                <div v-if="todosFiltered.length < 1" class="todo-none">
                        No Item
                </div> 

                <v-list two-line  v-else>
                  
                  <transition-group name="fadeUp">
                     
                    <todo-list-item

                      v-for = "(todo,index) in todosFiltered" 
                      :todo = "todo"
                      :index ="index"
                      :key = "todo.id"
                 
                      :checkAll = "!anyRemaining"
                    ></todo-list-item>
                
                   </transition-group> 
                  </v-list>
                
              
               
            </v-card>
         </v-flex>
          
         <v-flex xs12 class="todo-footer">
            <todo-check-all :anyRemaining = "anyRemaining" />

            <todo-remaining></todo-remaining>
         </v-flex>
         <todo-filter/>
         <v-flex xs8>
              <v-text-field v-model="newTodo" placeholder="Whatelse do you want to do?" @keyup.enter="addTodo()"/>
          </v-flex>
          <v-flex xs4>
            <transition name="fadeDown" >
              <v-btn @click="clearCompleted" v-if="showCompleted"> Clear Completed </v-btn>
            </transition>
          </v-flex>
      </v-layout>
 </v-container>
</template>

<script>



import TodoListItem from './TodoListItem'
import TodoRemaining from './TodoRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFilter from './TodoFilter'


require('vue2-animate/dist/vue2-animate.min.css')

export default {
  name: 'TodoApp',
  components: {
     TodoListItem,
     TodoRemaining,
     TodoCheckAll,
     TodoFilter,
   },

  data () {

    return {
      newTodo: '',
      titleBeforeEditingCache: ''
      

    }
  },

  created(){
      //signals when item editing is complete
      //this.user = this.$store.getters.getUser
      eventBus.$on("editingComplete",(data) => this.doneEditing(data))
      
      //fill up the container with the list of todos
      
      this.$store.dispatch('retrieveTodoList')
      
    
    },

    beforeDestroy() {
      // detach the event
      eventBus.$off("editingComplete")

    },

  computed: {
    //this method is being called very late, hence throwing null data error
    user() {
            
         return this.$store.getters.getUser
    },
     // check if there is any remaining item so as to automatically check the checkall check box
     anyRemaining() {
       return this.$store.getters.anyRemaining

     },

     // returns the list of the filtereed todos depending the filter used
     todosFiltered() {
       return this.$store.getters.todosFiltered
        
     },
     
     // hides or shows the clear completed button
     showCompleted() {

        return this.$store.getters.showCompleted
     }
  },
 
 methods: {

     addTodo() {

        
         if(!(this.newTodo == '')) {
            
             this.$store.dispatch('addTodo',{
                             title: this.newTodo,
                             editing: false,
                             completed: false
                           })
   
             this.newTodo = ''
      
         }
       
     },

     editTodo(todo) {
        this.titleBeforeEditingCache = todo.title
        todo.editing = true
     },

      doneEditing(data) {

         this.$store.dispatch('updateTodo',data.todo)
     
     },

     clearCompleted() {

      this.$store.dispatch('clearCompleted')
        
     }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

 .completed {
   text-decoration: line-through;
   color: grey;
 }

 .todo-item { 
     
     align-items: center;
     justify-content: space-between;
     
   }
  
  .todo-label {
     margin-left: 10px;
    }

  .todo-edit-field {
   flex: 0;
   margin-left: 10px;
    
  }
   .remove-item {
     cursor: pointer;
     margin-left: 14px;
  
   }

   .remove-item:hover {
      color: red;
   }

   .todo-footer { 
       display: flex;
       justify-content: space-between;

    }

    .todo-none {

      width: 100%;
      height: 50px;
      display: block;
      margin: 50px 10px;

      font-size: 20px;

    }

    .todo-filter {
      display: block;
      width: 100%;
      align-content: left;
    }

    .todo-footer-checkall {
      margin-left: 15px;
    }
    .checkall {
      margin-right: 10px;
    }
    .active {
      background-color: red;
    }
</style>
