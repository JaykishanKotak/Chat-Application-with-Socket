<template>
  <img alt="Vue logo" src="./assets/Signal-Logo.png">
  <ChatApp />
</template>

<script>
import ChatApp from './components/ChatApp.vue';

export default {
  name: 'App',
  components: {
    ChatApp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: cornflowerblue;
  margin-top: 20px;
}
</style>
