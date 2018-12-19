<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
 	<v-layout row wrap>
 	   <v-flex xs12>
	 		<v-card>
			 		<v-toolbar 
            flat
			 		>
			 			<v-toolbar-side-icon/>
			 			<v-toolbar-title>
			 				Login
			 		    </v-toolbar-title>
			        </v-toolbar>
              <server-errors v-if="serverErrors" :errorMsg="serverErrors"></server-errors>
							<div class="success-alert" v-if="successMsg">
									<h4>Success</h4>
										<div class="py-1">
										
										{{ successMsg }}
									</div>
								</div>
	          
		            <v-flex xs12 px-4>
						<v-text-field 
						  label="Username"
						 
						  v-model="credentials.username"
				          ripple
						 />
					 </v-flex>
						
				       
				      <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
						  v-model="credentials.password"
						/>
				       </v-flex>

				       <v-flex xs12 px-4>
				       	   <v-btn @click="login"> Login</v-btn>
				       </v-flex>
 

				  
		    </v-card>
		</v-flex>
   </v-layout>
</v-container>
</template>



<script>
 
	import serverErrors from '@/components/ServerErrors'
	export default {
	
	  name: 'login',
	
	  data () {
	    return {
	    	credentials: { 
												username: '',
	    	               password: ''
										},
				'successMsg': this.registerSuccessMsg,
				serverErrors: ''
	    }
		},

		components: {
			serverErrors
		},
		
		props:{
      registerSuccessMsg: {
				type:String
			}
		},



	  methods: {

	  	login() {

				this.$store.dispatch('login',this.credentials)
				.then(response => {
						 
					   this.$store.dispatch('retrieveUser')
					   this.$router.push({ name: 'Todo' })
				})
				.catch(error => {
						 
						 this.successMsg = ''
						 this.serverErrors = [error.response.data]
						// console.log([error.response.data])
				})
	  	}
	  }
	}
	</script>
	
<style scoped>

  .container {
  	 max-width: 500px;

  }
	
	 .success-alert {
		 
		  padding: 15px 10px;
			 margin: 20px 10px;
			 border: 1px solid #36854ec7;
			 background: #61a57b5d;
			 border-radius: 10px;
			 display: block;
			 text-align: left;
			 font-size: 16px;
	 }

</style>