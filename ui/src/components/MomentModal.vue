<script setup>
const props = defineProps({
    toggleModal: Function,
    imgURL: String
})

console.log(props)
</script>

<template>
    <div class="content">
        <div>x</div>
        <div>{{ props.imgURL }}</div>
    </div>
</template>

<style scoped>
.content {
    width: 400px;
    height: 400px;
}
</style>