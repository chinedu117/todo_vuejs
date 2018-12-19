<template>
    <v-list-tile class="todo-item">


    	<input type="checkbox" v-model="completed" @change="editingFinished" />
            
      <v-list-tile-content>
                        
            <div
             v-if="!editing" 
             @dblclick="editTodo" 
             class="todo-label" 
             :class="{ 'completed': completed}">
                      {{ title }}
            </div>

            <v-text-field
             ref="editField"
             v-else
             v-model="title" 
             @keyup.enter="editingFinished" 
             @blur="editingFinished" 
             class="todo-edit-field" 
             @keyup.esc="cancelEdit"
             autofocus/>
                  
        </v-list-tile-content> 
            
        <div>
           <button @click="makePlural">plural</button>
           <span @click="removedTodo(id)" class="remove-item">
                          &times
          
          </span>
        </div>
         

    </v-list-tile>   
</template>

<script>

export default {

  name: 'todo-list-item',
   props: {
    checkAll: {
        type: Boolean,
        required: true
    },
     index: {
        type: Number,
        required: true
    },
     todo: {
        type: Object,
        required: true
    },
  },
  data () {

    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'editing': this.todo.editing,
      'completed': this.todo.completed,
      'titleBeforeEditingCache': '',
    }
  },
  created() {
      eventBus.$on("pluralize",this.handlePluralize)
  },

  beforeDestory() {
      eventBus.$off("pluralize",this.handlePluralize)
  },


 

  watch: {
     
     checkAll() {

        if(this.checkAll) {
          this.completed = true
        }else{

          this.completed = this.todo.completed
        }
     }  
     
  },
 
 methods: {

  removedTodo(todoID) {
    //this.$store.state.todos.splice(index,1)
    this.$store.dispatch('deleteTodo',todoID)
   // eventBus.$emit("removedTodo",index)
  },

  editTodo() {
        this.titleBeforeEditingCache = this.title
        this.editing = true
     },

   editingFinished() {
      if(this.title.trim() == 0){
          this.title = this.titleBeforeEditingCache
        }

        this.editing = false

        eventBus.$emit("editingComplete",{
          'index': this.index,
          'todo': {
             'id': this.id,
             'completed': this.completed,
             'title': this.title,
             'editing': this.editing
          }
        })

        

     },
     cancelEdit() {
      
      this.title = this.titleBeforeEditingCache
      this.editing = false
      
     },

     makePlural() {

       eventBus.$emit("pluralize")
     },

     handlePluralize() {

        this.title = this.title + "s"

        this.editingFinished()
     }



 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

 
</style>

