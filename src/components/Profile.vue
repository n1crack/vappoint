<template>
  <div class="m-3 p-3 text-left border w-full rounded" v-if="currentUser">
    <header v-if="currentUser">
      <h3 class="font-bold text-indigo-600 text-center pb-6">
       {{ currentUser.name }}'s Profile
      </h3>
    </header>

    <div class="lg:flex ">
      <div class="w-full lg:w-1/12 inline-flex align-middle justify-center">
          <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              class="object-center rounded-lg "
          />
      </div>
      <div class="p-5">
        <strong>Email:</strong> {{ currentUser.email }}
      </div>
    </div>
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
