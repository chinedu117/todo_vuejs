<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
   margin: 10px auto;
   display: block;
   height: 30px;

}

.container {
  max-width: 600px;

}
</style>
