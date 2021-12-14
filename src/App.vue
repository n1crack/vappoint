<template>
  <div class="flex justify-center mb-3">
    <h2 class="text-3xl font-bold text-gray-700"> Appointment App </h2>
  </div>
  <div class="flex justify-center">
    <div class="flex">
      <router-link to="/" class="mx-1 p-1 border-b hover:border-green-600 font-bold text-green-600">
        Home
      </router-link>
    </div>
    <div v-if="!loggedIn" class="flex">
      <router-link to="/login" class="mx-1 p-1 border-b hover:border-green-600 font-bold text-green-600">
        Login
      </router-link>
      <router-link to="/register" class="mx-1 p-1 border-b hover:border-green-600 font-bold text-green-600">
        Register
      </router-link>
    </div>
    <div v-else class="flex">
      <router-link to="/profile" class="mx-1 p-1 border-b hover:border-green-600 font-bold text-green-600">
        Profile
      </router-link>
      <router-link to="/appointment" class="mx-1 p-1 border-b hover:border-green-600 font-bold text-green-600">
        Appointments
      </router-link>

      <form @submit="handleLogout">
        <button class="mx-1 p-1 border-b hover:border-green-600 font-bold text-green-600">
          <span>Logout</span>
        </button>
      </form>
    </div>
  </div>
  <main class="flex flex-col items-center justify-center w-full flex-1  text-center">
    <div class="flex flex-wrap items-center justify-around lg:max-w-4xl mt-6 w-full">
      <router-view/>
    </div>
  </main>
</template>

<script setup>

import store from "./store";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const loggedIn = ref(false)

loggedIn.value = store.state.auth.status.loggedIn

watch(store.state.auth.status, (status) => {
  loggedIn.value = status.loggedIn;
})

const handleLogout = (event) => {
  event.preventDefault();
  store.dispatch("auth/logout").then(() => router.push('/login'));
}


</script>