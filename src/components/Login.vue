<template>
  <div class="m-3 p-2 col-md-12">
    <div class="">
      <div class="inline-flex align-middle justify-center">
        <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="rounded-lg w-1/2 m-2"
        />
      </div>

      <form @submit="handleLogin">
        <div class="text-left border rounded-xl p-2">

          <div class="my-2 text-xl">
            <label for="email" class="text-gray-700">Email</label>
            <input id="email" name="email" type="text" v-model="state.user.email"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>
          <div class="my-2 text-xl">
            <label for="password" class="text-gray-700">Password</label>
            <input id="password" name="password" type="password" v-model="state.user.password"
                   class="p-1 border border-gray-400 rounded w-full"/>

          </div>

          <div class="my-2 text-xl text-center">
            <button class="border p-2 text-gray-600 rounded bg-gray-100 hover:bg-gray-200 hover:border-gray-300">
              <span>Login</span>
            </button>
          </div>

          <div>
            <div v-if="message" class="bg-red-100 text-red-600 p-2 rounded" role="alert">
              {{ message }}
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

const store = useStore();
const router = useRouter();
const state = reactive(
    {
      user: {
        email: 'john@test.com',
        password: 'password'
      }
    });
let message = ref('');


const handleLogin = (event) => {
  event.preventDefault();

  store.dispatch("auth/login", state.user).then(
      () => {
        router.push("/profile");
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
};

</script>