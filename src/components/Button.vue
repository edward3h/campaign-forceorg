<template>
    <div @click="clicked" :class="[isSelected ? 'bg-green-400 text-black' : 'bg-gray-900', 'hover:border-white']" btn>
        {{ display }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{display:string, isSelected:boolean, value:any}>()
const emit = defineEmits<{(e:'click',value:any):void}>()
function clicked() {
    emit('click', props.value)
}
</script>

<style scoped>

</style>