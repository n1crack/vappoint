<template>
  <main class="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
    <h2 class="text-5xl font-bold text-gray-700"> Appointment App </h2>

    <div class="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
      <div class="p-6 mt-6 text-left border w-96 rounded-xl ">
        Profile Page
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    msg: String
  }
}
</script>