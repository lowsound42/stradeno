<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LPolyline } from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue'

const polyline = ref({});
const data = await fetch('http://localhost:8000')
polyline.value = await data.json()

const zoom = ref(3)

</script>

<template>
    <Suspense>
        <div style="height:1200px; width:800px">
            <l-map style="height: 1200px" :zoom="zoom" :center="[49.1304, -104.3468]" :use-global-leaflet="false">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                    name="OpenStreetMap"></l-tile-layer>
                <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
            </l-map>
        </div>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
</template>



<style></style>