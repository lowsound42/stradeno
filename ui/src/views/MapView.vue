<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LPolyline, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue'
import { poiData } from '../data/poicoords.js'
import MomentModal from "@/components/MomentModal.vue";

const polyline = ref({});
const data = await fetch('http://localhost:8000')
polyline.value = await data.json()
const test = ref(false)
const zoom = ref(4)

</script>

<template>
    <Suspense>
        <div>
            <dialog :open="test" class="dialog" props="{imageURL: 'test'}">
                <MomentModal class="modal" />
            </dialog>
            <div class="map-container">
                <div class="map">
                    <l-map style="height: 100%" :zoom="zoom" :center="[49.1304, -104.3468]" :use-global-leaflet="false">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                            name="OpenStreetMap"></l-tile-layer>
                        <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
                        <l-marker @click="test = !test" v-for="marker in poiData" :key="marker.id"
                            :lat-lng="marker.coordinates">
                        </l-marker>
                    </l-map>
                </div>
            </div>
        </div>
        <template #fallback>
            <div class="loader">Loading...</div>
        </template>
    </Suspense>
</template>



<style>
.dialog {
    z-index: 999;
}

.map-container {
    display: flex;
    justify-content: center;
}

.map {
    height: 100vh;
    width: 100vw;
}
</style>