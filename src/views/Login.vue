<template>
  <main class="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    <h2 class="text-5xl font-bold text-gray-700"> Appointment App </h2>

    <div class="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
      <div class="p-6 mt-6 text-left border w-96 rounded-xl ">
        <label class="text-xl font-bold text-gray-600">Username :</label>
        <p class="my-2 text-xl">
          <input type="text" class="p-1 border border-gray-400 rounded w-full"/>
        </p>
        <label class="text-xl font-bold text-gray-600">Password :</label>
        <p class="my-2 text-xl">
          <input type="text" class="p-1 border border-gray-400 rounded w-full"/>
        </p>
        <p class="text-center ">
          <button class="border p-2 text-gray-600 rounded hover:bg-gray-100 hover:border-gray-300">Login</button>
        </p>
      </div>

    </div>
  </main>

</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  }
}
</script>