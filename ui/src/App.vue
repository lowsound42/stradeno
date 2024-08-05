<script setup>
import MapView from './views/MapView.vue'
</script>

<template>
  <Suspense>
    <MapView />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>



<style></style>