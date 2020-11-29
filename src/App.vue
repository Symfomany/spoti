<template>
  <v-app>
    <v-main class="background">
      <v-btn
        v-if="$route.name === 'artist'"
        class="ma-6"
        fab
        color="teal lighten-5"
        to="/"
        ><v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-container fill-height fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.background {
  background: rgb(156, 156, 118);
  background: linear-gradient(
    45deg,
    rgba(156, 156, 118, 1) 18%,
    rgba(51, 136, 168, 1) 100%
  );
}
.border-radius {
  border-radius: 30px !important;
}
</style>
