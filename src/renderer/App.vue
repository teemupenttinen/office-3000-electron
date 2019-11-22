<template>
  <v-app>
    <v-toolbar app class='transparent elevation-0' v-if="$store.getters.getUser !== null">
      <v-spacer></v-spacer>
      <v-btn icon class="white--text" @click="logout()">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Office 3000"
    };
  },
  methods:{
    logout(){
      this.$store.dispatch("logout");
    }
  },
  name: "App"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
#app {
  background-image: linear-gradient(
    rgb(17, 28, 74),
    rgb(205, 16, 63)
  ) !important;
}
</style>

