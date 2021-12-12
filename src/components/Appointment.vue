<template>
  <div class="w-full">
    <div>
      <router-link to="/appointment/create" class="mx-2 p-2 border border-green-300 hover:border-green-500 bg-green-50 font-bold text-green-600">
       + Create new appointment
      </router-link>
    </div>
    <div v-for="(appointment, index) in appointments" :key="index">
      <div class="m-3 p-2 border rounded  text-left">
        <div class="p-3 border relative">
          <div class="absolute top-0 right-0">
            <button class="px-2 border border-red-300 bg-red-50 text-red-500">Delete</button>
          </div>

          <div class="font-bold text-blue-500 my-3">Appointment Detail</div>

          <div class="flex"><span class="font-bold text-gray-700">Address:</span><span
              class="ml-auto">{{ appointment.address }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">Date:</span> <span
              class="ml-auto">{{ formatDate(appointment.date) }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">Distance:</span> <span
              class="ml-auto">{{ formatDistance(appointment.distance) }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">Travel Time:</span> <span
              class="ml-auto">{{ formatTravelTime(appointment.time) }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">When to Leave Office:</span> <span
              class="ml-auto">{{ formatDate(appointment.when_to_leave) }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">Next Available Date:</span> <span
              class="ml-auto">{{ formatDate(appointment.next_available_date) }}</span></div>

          <div class="font-bold text-blue-500 my-3">Contact Detail</div>

          <div class="flex"><span class="font-bold text-gray-700">Contact Name:</span> <span
              class="ml-auto">{{ appointment.contact_name }} {{ appointment.contact_surname }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">Email:</span> <span
              class="ml-auto">{{ appointment.contact_email }}</span></div>
          <div class="flex"><span class="font-bold text-gray-700">Phone:</span> <span
              class="ml-auto">{{ appointment.contact_phone }}</span></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useStore} from 'vuex'
import {onMounted, ref} from "vue";
import moment from "moment";

const store = useStore();

const appointments = ref([]);
const message = ref('');

const formatTravelTime = (time) => {
  return moment.duration(time, "milliseconds").humanize(false);
}

const formatDistance = (distance) => {
  return (distance / 1000).toFixed(2) + ' km';
}

const formatDate = (date) => {
  return moment(date).format('D MMM, Y, HH:mm');
}

onMounted(() => {
  store.dispatch("appointment/all").then(
      (response) => {
        appointments.value = response.data.data;
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
