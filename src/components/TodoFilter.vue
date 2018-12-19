<template>
<v-flex xs12 class="todo-filter">

          <v-btn small class="{ 'active' : filter == 'all'}" @click="changeFilter('all')"> ALL</v-btn>
          <v-btn small class="{ 'active' : filter == 'completed'}" @click="changeFilter('completed')"> COMPLETED</v-btn>
          <v-btn small class="{ 'active' : filter == 'active'}" @click="changeFilter('active')"> ACTIVE</v-btn>

         </v-flex>
</template>
<script>
	export default {
	  name: 'todo-filter',
	  // props: {
	  // 	'filter': {
	  // 		type: String,
	  // 		required: true
	  // 	}
	  // },
	  methods: {

	  	changeFilter(filter) {
             
             this.$store.commit('updateFilter', filter)
	  		 // eventBus.$emit("filterChanged",data)
	  	}
	  }

	 
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
