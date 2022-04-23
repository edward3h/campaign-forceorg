<template>
    <div flex sm:flex-col>
        <div v-for="item in boxes" :class="['slot', item.full ? 'slot-full' : 'slot-thin', `bg-${item.colour}`]" text-light-200 text-2xl text-center vertical-middle>
            <span v-if="item.icon">{{item.icon}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
const props = defineProps<{min:number, max:number, icon:string}>()
const boxes = computed(() => {
    const r:{full: boolean, colour: string, icon?: string}[] = []
    for (let i = 0; i < props.max; i++) {
        const full = i == 0;
        const colour = i < props.min ? `red-${8-i}` : `gray-${Math.max(9 - i + props.min,2)}`
        const icon = i == 0 ? props.icon : undefined
        r.push({full, colour, icon})
    }
    return r
})
</script>

<style scoped>
.slot-full {
    font-family: 'crusade_2regular';
}
</style>