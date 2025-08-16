<template>
  <v-app>
    <v-app-bar color="primary" dark flat>
      <v-toolbar-title>Users CRUD</v-toolbar-title>
      <v-spacer />
      <v-btn to="/users" variant="text">Lista</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// brak logiki – router-view renderuje widoki
</script>

<style>
html, body, #app { height: 100%; }
</style>
