<script setup>
import { ref, computed } from 'vue'
import Login from './components/login/LoginPage.vue'
import SignUp from './components/signup/SignUp.vue'
// import NotFound from './NotFound.vue'

const routes = {
  '/': Login,
  '/signup': SignUp
}

const currentPath = ref(window.location.pathname)

window.addEventListener('popstate', () => {
  console.log(window.location.pathname)
  currentPath.value = window.location.pathname
})

const currentView = computed(() => {
  return routes[currentPath.value || '/']
})
</script>

<template>
  <!-- <a href="/">Login</a> |
  <a href="/signup">Signup</a> | -->
  <!-- <a href="#/non-existent-path">Broken Link</a> -->
  <component :is="currentView" class="bg-[url('../public/images/bgvector.svg')]"/>
</template>