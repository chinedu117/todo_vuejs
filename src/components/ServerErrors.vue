<template>
    	<div class="server-alert">
			<h4>Errors</h4>
			<div class="py-1" v-for="(error,index) in errorMsg" :key="index">
				{{ error[0] }}
			 </div>
		</div>  
</template>
<script>
export default {
    name: 'server-errors',
    date() {
        return {

        }
    },

    props: {

        errorMsg: {
            type: Array,
            required: true,
            
        }
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

	 }

</style>


