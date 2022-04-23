<template>
    <div btn bg-gray-900 p-0 flex>
        <span p-1 grow text-left>{{display}}</span>
        <span @click="minus" btn hover:border-white>-</span>
        <span p-1>{{count}}</span>
        <span @click="plus" btn hover:border-white>+</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{display:string, value:string, count:number}>()
const emit = defineEmits<{(e:'change',value:any,count:number):void}>()
function minus() {
    emit("change", props.value, props.count - 1)
}
function plus() {
    emit("change", props.value, props.count + 1)
}
</script>

<style scoped>

</style>