<template>
    <div flex justify-center gap-4 flex-wrap>
        <Button v-for="item in options" 
            :key="item.value" :display="item.display" :value="item.value" :is-selected="isSelected(item.value)"
            @click="$emit('select', item.value)" />
    </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'
interface DisplayValue {
    display: string
    value: any
}
const props = defineProps<{options:DisplayValue[], isSelected:(value:any) => boolean}>()
const emit = defineEmits<{(e:'select',value:any):void}>()
</script>

<style scoped>

</style>