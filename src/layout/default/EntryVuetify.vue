<template>
    <!-- the app component helps to determine the viewport -->
    <v-app>
        <!-- the app prop makes the component to be fixed -->
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app></v-toolbar>
    <v-content>
        <v-container fluid>
        <router-view></router-view>
        </v-container>
    </v-content>
    <v-footer app></v-footer>
    </v-app>
</template>
<script>
export default {
    
}
</script>
<style>

</style>
