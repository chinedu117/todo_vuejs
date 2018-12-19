<template>
 <v-container grid-list-md text-xs-center class="page-wrapper">
 	<v-layout row wrap>
 	   <v-flex xs12>
	 		<v-card>
			 		<v-toolbar>
			 			<v-toolbar-side-icon/>
			 			<v-toolbar-title>
			 				Register
			 		    </v-toolbar-title>
			        </v-toolbar>
                 <server-errors v-if="serverErrors" :errorMsg="serverErrors"></server-errors>
								 
								<div class="success-alert" v-if="successMessage">
									<h4>Success</h4>
										<div class="py-1">
										
										{{ successMessage }}
									</div>
								</div>
								 
								 	
                <form action="#" @submit.prevent="beforeSubmit" >	
	                 <v-flex xs12 px-4>
									
						<v-text-field 
						  label="Email"
						  v-validate="'required|email'"
						  name="email"
						  v-model="registerParams.email"
				          ripple
						 />
						 <div class="error" v-if="errors.has('email')"> * {{ errors.first('email') }}</div>
					 </v-flex>

		            <v-flex xs12 px-4>
						<v-text-field 
						  label="Name"
						  name="name"
						  v-validate="'required'"
						  v-model="registerParams.name"
				          ripple
						 />
						 <div class="error" v-if="errors.has('name')"> * {{ errors.first('name') }}</div>
					 </v-flex>
						
				       
				      <v-flex xs12 px-4>
						<v-text-field
						  label="Password"
						  v-validate="'required|min:6' "
						  v-model="registerParams.password"
						  name="password"
						/>
						<div class="error" v-if="errors.has('password')"> * {{ errors.first('password') }}</div>
				       </v-flex>

				       <v-flex xs12 px-4>
				       	   <v-btn type="submit">Register</v-btn>
				       </v-flex>
 
                	</form>
				  
		    </v-card>
		</v-flex>
   </v-layout>
</v-container>
</template>



<script>

	import serverErrors from '@/components/ServerErrors'

	export default {
	
	  name: 'register',
	  components: {serverErrors},
	  data () {
	    return {
	    	'registerParams': {	name: '',
	    						password: '',
	    						email: ''
	    					},
				'serverErrors': '',
				'successMessage': ''
	    }
	  },

	  methods: {
		  //called before form is submitted
        beforeSubmit () {
			   //this refers to the validate method of the plugin "veeValidate" imported in the root file
      			this.$validator.validate().then(result => {
        			if (result) {
							 //submit only if all the from is valid
							 this.register()
       				 }
      			});
   			 }
 		 },
	  	register() {

				this.$store.dispatch('register',this.registerParams)
				            .then(response => {
										this.successMessage = "Successfully Registered!"

										this.$router.push({ name: "Login", params:{
																													registerSuccessMsg: this.successMessage
													 																					 }
												})

														// Attempm to login directly

														// this.$store.dispatch('login',{
														// 	'username':response.data.email,
														// 	'password': response.data.password
														// })
														// .then(response => {
														// 	//redirece to the app
														// 	this.$router.push({ name: "Todo"})
														// })
														// .catch(error => {
														// 	//unable to login
														// 	this.$router.push({ name: "Login"})
														// })
											 
										})
										.catch(error => {
											
											 //console.log(Object.values(error.response.data.errors))
											 this.serverErrors = Object.values(error.response.data.errors)
										})
	  	}
	  }
	
	</script>
	
<style>
   .server-alert {
		   padding: 15px 10px;
			 margin: 20px 10px;
			 border: 1px solid #e08989c7;
			 background: #eb898941;
			 border-radius: 10px;
			 display: block;
			 text-align: left;
			 font-size: 16px;

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

	 .error {
		 color: red;
		 text-align: left;
		 font-size: 12px;
		 
	 }

	

</style>