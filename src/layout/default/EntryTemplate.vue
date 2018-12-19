<template>
  <div id="app">
	 <ul class="nav">
	<!--  	<li><a href="">Home</a></li>
	 	<li><a href="">Todo</a></li>

	 	<li><a href="">About</a></li>
	 	<li><a href="">FAQ</a></li>

	 	<li><a href="">Test</a></li> -->
        
	 	<li><router-link :to="{ name: 'Home' }">Home</router-link></li>
	 	<li><router-link :to="{ name: 'Todo' }">App</router-link></li>
	 	<li v-if="!loggedIn"><router-link :to="{ name: 'Login' }">Login</router-link></li>
	 	<li v-if="!loggedIn"><router-link :to="{ name: 'Register' }">Register</router-link></li>
		<li v-if="loggedIn"><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
	 	<!-- <li><router-link :to="{}">Home</router-link></li>

	 	<li><router-link :to="{}">Home</router-link></li>
	 	<li><router-link :to="{}">Home</router-link></li> -->
	 	

	 </ul>
	 <img src="@/assets/logo.png" class="logo">
	 <transition 
	  name="router-animation"
	  enter-active-class="animated fadeIn"
	  leave-active-class="animated  fadeOut"
	  mode="out-in"
	  >
	 	<router-view/>
	 </transition>

	  <!-- <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    > -->
	 <v-snackbar
	  
	  v-model="snackBar.show"
	  :timeout="6000"
	  :bottom="true"
	 >
	 {{ snackBar.msg }}
	 <v-btn
        dark
        flat
        @click="snackbar.show = false"
      >
        Close
      </v-btn>
	 </v-snackbar>
  </div>
</template>



<script>

	
	export default {
	
	  name: 'entry-template',
	  data() {
		  return {
			  snackBar: {
				  show: false,
				  msg: '',
				  type: 'info'
			  }
		  }
	  },
      created() {
		
		//this.snackBar.show = false
		eventBus.$on("showSnackBar",(data) => this.displaySnackBar(data))
	  },

	  beforeDestroy(){
        eventBus.$off("showSnackBar")
	  },

	  computed: {

		loggedIn() {
		return	this.$store.getters.loggedIn
			
		}


	},
	methods: {

		displaySnackBar(alert)
		{
			//console.log(alert)
			this.snackBar.show = true
			this.snackBar.msg = alert.msg
			this.snackBar.type = alert.type
		}
	}
	}
	</script>
	
<style>

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

.logo {
   margin: 10px auto;
   display: block;
   height: 30px;

}

.container {
  max-width: 600px;

}

 .nav {
 	display: flex;
 	list-style: none;
 	justify-content: flex-end;
 	padding: 15px 0;
 	margin: 0;
 	border-bottom: 1px solid lightgrey;
 	margin-bottom: 24px;
 }

 .nav a {
 	text-transform: uppercase;
 	letter-spacing: .1rem;
 	padding: 0 25px;
 	text-decoration: none;
 	font-size: 14px;
 	font-weight: 600;
 	color: #1f3839;

 }

 .flex-center { 
   display: flex;
   justify-content: center;
  }

  .page-wrapper {

	  animation-duration: 0.2s;
  }
	
</style>
