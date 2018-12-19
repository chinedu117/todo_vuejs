<template>
	  <div class="todo-footer-checkall">
             <input type="checkbox" class="checkall" @change="checkAllItems($event)" :checked="!anyRemaining">
             <span>check all</span>
       </div>
</template>

<script>
export default {
  name: 'todo-check-all',
  props:{
  	'anyRemaining': {
       type: Boolean,
       required: true
  	}
  },
  methods: {

  	checkAllItems(event) {
  		 // eventBus.$emit("checkAllItems",event)
       this.$store.dispatch('checkAll', event.target.checked)
  	}
  }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
