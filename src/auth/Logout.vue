<template>
</template>
<script>

	
	export default {
	
      name: 'logout',
      created() {

          this.logout()
      },
      methods: {

	  	logout() {

              this.$store.dispatch('logout')
              .then(response => {
                   
                   eventBus.$emit('showSnackBar',{
                                                   msg: 'You are logged out!',
                                                   type: 'info'
                                    })
                  
                   this.$router.push({ name: 'Login'})
        
              })
              .catch(error => {

                    console.log(error)
              })
	  	}
	  }
	}
	</script>
	
<style scoped>
</style>