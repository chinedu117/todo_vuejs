<template>
	 <span>
              {{ remainingTodo }} remaining
     </span>
</template>
<script>
export default {
  name: 'todo-remaining',
  computed: {

  	remainingTodo() {

  		return this.$store.getters.remainingTodo
  	}
  }
  // props:{
  // 	'remainingTodo': {
  //      type: Number,
  //      required: true
  // 	}
  // }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
