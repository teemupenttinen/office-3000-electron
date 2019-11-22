<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center class="text-xs-center white--text">
      <v-flex xs12 sm8 md4>
        <h1 class="display-4">Connected</h1>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      ipAddress: false,
      port: false,
    };
  },
  
  name: "Main"
};
</script>

<style scoped>

</style>