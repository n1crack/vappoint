<template>
  <div class="m-3 p-2 grid grid-cols-12 lg:gap-5">
    <div class="col-span-12 lg:col-span-8">
      <div id="map" class="h-72 lg:h-full"></div>
    </div>
    <div class="col-span-full lg:col-span-4">
      <form @submit="handleCreate">
        <div class="p-3 text-left border rounded-xl ">
          <div class="my-2 lg:text-xl">
            <label for="address" class="text-gray-700">Appointment Address</label>
            <input id="address" name="address" type="text" v-model="state.appointment.address"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>
          <div class="my-2 lg:text-xl">
            <label for="date" class="text-gray-700">Appointment Date</label>
            <input id="date" name="date" type="datetime-local" v-model="state.appointment.date"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>

          <div class="my-2 lg:text-xl">
            <label for="name" class="text-gray-700">Contact Name</label>
            <input id="name" name="name" type="text" v-model="state.appointment.name"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>
          <div class="my-2 lg:text-xl">
            <label for="surname" class="text-gray-700">Contact Name</label>
            <input id="surname" surname="surname" type="text" v-model="state.appointment.surname"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>
          <div class="my-2 lg:text-xl">
            <label for="email" class="text-gray-700">Contact Email</label>
            <input id="email" name="email" type="text" v-model="state.appointment.email"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>
          <div class="my-2 lg:text-xl">
            <label for="phone" class="text-gray-700">Contact Phone</label>
            <input id="phone" name="phone" type="text" v-model="state.appointment.phone"
                   class="p-1 border border-gray-400 rounded w-full"/>
          </div>
          <div class="my-2 lg:text-xl text-center">
            <button class="border p-2 text-gray-600 rounded bg-gray-100 hover:bg-gray-200 hover:border-gray-300">
              <span>Create Appointment</span>
            </button>
          </div>
          <div v-if="errors" class="bg-red-100 text-red-600 p-2 rounded" role="alert">
            <ul>
              <li v-for="(error, index) in errors" :key="index">
                {{ error[0] }}
              </li>
            </ul>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import axios from "axios";
import moment from "moment";
import "leaflet/dist/leaflet"
import "leaflet/dist/leaflet.css"
import authHeader from "../services/auth-header";
import {API_URL, MAPBOX_API_KEY} from "../../config";
import decodePath from "../plugins/GHUtil";

const router = useRouter();
const state = reactive(
    {
      appointment: {
        name: 'Jane',
        surname: 'Doe',
        email: 'jane@test.com',
        phone: '+9055555555',
        address: 'CM8 1EF',
        date: moment().format("YYYY-MM-DDTHH:mm"),
      },
      path : ''
    });
let errors = ref();
const nearestPostCode = ref();

onMounted(() => {
  const map = window.L.map('map').setView([51.729117, 0.477935], 18);
  const popup = window.L.popup();

  const pLineGroup = window.L.layerGroup()
    pLineGroup.addTo(map);
  const onMapClick = async (e) => {

    // find nearest post code..


    axios.get(API_URL + 'api/postcodes/nearest', {
          params: {
            lon: e.latlng.lng,
            lat: e.latlng.lat
          },
          headers: authHeader()
        }
    )
        .then((response) => {
          nearestPostCode.value = response.data;
          state.appointment.address = response.data.postcode ?? '';
          state.path = response.data.appointment;

          const polyline = window.L.polyline(decodePath(state.path.points), {color: 'orange'});

          pLineGroup.clearLayers();
          pLineGroup.addLayer(polyline)

          popup
              .setLatLng(e.latlng)
              .setContent("You clicked the map at " + e.latlng.toString() + "<br><strong>Time to arrive:</strong> " + (state.path.time / (60 * 1000)).toFixed(2) + " min, <br><strong>Distance:</strong> " + (state.path.distance / 1000).toFixed(2) + " km")
              .openOn(map);
        })
        .catch(function (error) {
          popup
              .setLatLng(e.latlng)
              .setContent(error.response.data.error || 'Not found.')
              .openOn(map);
        })
  }

  map.on('click', onMapClick);

  const myIcon = window.L.divIcon({
    className: 'map-marker',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [-3, -26]
  });

  window.L.marker([51.729117, 0.477935]).bindPopup('This is Estate Agency').setIcon(myIcon).addTo(map);

  window.L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_API_KEY
  }).addTo(map);
})


const handleCreate = (event) => {
  event.preventDefault();

  const appointment = {...state.appointment, date: moment(state.appointment.date).format('YYYY-MM-DD HH:mm:ss')};

  axios.post(API_URL + 'api/appointment/', appointment, {headers: authHeader()})
      .then(() => {
            router.push("/appointment");
          }
      )
      .catch((error) => {
        errors.value =
            (error.response &&
                error.response.data &&
                error.response.data.errors) ||
            error.message ||
            error.toString();
      });
};

</script>
