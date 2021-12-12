<template>
  <div class="p-6 mt-6 text-left border w-full rounded-xl" v-if="currentUser">
    <header v-if="currentUser">
      <h3 class="font-bold text-indigo-600 text-center pb-6">
       {{ currentUser.name }}'s Profile
      </h3>
    </header>
    <p>
      <strong>Email:</strong> {{ currentUser.email }}
    </p>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {onMounted, ref} from "vue";

const store = useStore();

const currentUser = ref();
const message = ref('');

onMounted(()=> {
  store.dispatch("user/profile").then(
      (response) => {
        currentUser.value = response.data;
      },
      (error) => {
        message.value =
            (error.response &&
                error.response.data &&
                error.response.data.error) ||
            error.message ||
            error.toString();
      }
  );
})


</script>
