<template>
    <v-container>
        <div class="bgColor"></div>
        <!-- Alert -->
        <v-snackbar :timeout="60000" color="error" top v-model="$store.getters.getErrorMessage">
            Invalid Credentials
        </v-snackbar>
        <v-container class="loginPos">
            <v-layout row wrap>
                <!-- Logo -->
                <v-flex xs12 text-xs-center>
                </v-flex>
                <!-- Form -->
                <v-flex xs12 md6 offset-md3>
                    <v-form v-model="valid">
                        <v-text-field color="success" autofocus placeholder="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                        <v-text-field color="success" @keyup.enter="submit" placeholder="Password" v-model="password" :rules="passwordRules" required @click:append="e1 ? 'visibility_off' : 'visibility'" @click:append-cb="() => (e1 = !e1)" :type="e1 ? 'text' : 'password'"> </v-text-field>
                    </v-form>
                </v-flex>
                <!-- Button -->
                <v-flex xs12 md6 offset-md3 text-xs-center>
                    <v-btn color="success" :disabled="!emailRules" @click="submit">
                        <v-icon>done</v-icon>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: false, //password visibility
      valid: false,
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  mounted() {},
  methods: {
    submit: function() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  },
  computed: {},
  name: "Controller"
};
</script>

<style scoped>


.loginPos {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
