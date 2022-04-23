<template>
    <div m-10 px-10 pb-5 bg-light-200 text-black text-lg font-title>
        <h2>{{name}}</h2>
        <div class="detachment">
            <template v-for="item in roleDisplay">
                <div class="role">{{item.display}}</div>
                <div class="count">{{item.min}}-{{item.max}}</div>
                <SlotVisual class="slots" :min="item.min" :max="item.max" :icon="item.icon"/>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Detachment, display, roles } from '../models';
import SlotVisual from './SlotVisual.vue';

const props = defineProps<{name:string, detachment:Detachment}>()
const roleDisplay = computed(() => {
    return roles.filter(r => r in props.detachment)
        .filter(r => props.detachment[r]?.max || 0 > 0)
        .map(r => ({display:display('Role',r), min:props.detachment[r]?.min || 0, max:props.detachment[r]?.max || 0, icon:display('RoleIcon', r)}))
})
</script>

<style scoped>
.detachment {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-auto-flow: row;
    grid-template-rows: repeat(auto-fit, minmax(10px, 3rem));
    align-content: center;
    justify-content: center;
    gap: 0.5rem;
}
.role {
    align-self: center;
    justify-self: end;
}
.slots {
    align-self: center;
    justify-self: start;
}
.count {
    align-self: center;
}

@media(min-width: 640px) {
.detachment {
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(10px, 3rem));
}
.role {
    align-self: end;
    justify-self: center;
}
.slots {
    align-self: start;
    justify-self: center;
}
.count {
    /* align-self: center; */
}
}
</style>