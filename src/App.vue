<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed, ref } from 'vue';
import { composeDetachment, detachments, display, makeStupidName, resources } from './models';
import ButtonGroup from './components/ButtonGroup.vue';
import NumberButton from './components/NumberButton.vue';
import Detachment from './components/Detachment.vue';

const selectedDetachment = ref();
function selectDetachment(value: string) {
  selectedDetachment.value = value;
}
function isSelected(value:any) {
  return selectedDetachment.value == value
}
const displayDetachments = Object.keys(detachments).map(k => ({value: k, display: display('Detachment', k)}));
const resourceCounts = ref(Object.keys(resources).reduce((a:Record<string,number>,k) => {
  a[k] = 0
  return a
},{}))
function changeCount(value: string, count: number) {
  if (count >= 0) {
    resourceCounts.value[value] = count
  }
  else {
    resourceCounts.value[value] = 0
  }
}
const numberOptions = computed(() => {
    return Object.entries(resourceCounts.value).map(([value, count]) => ({value, count, display: display('Resource', value)}))
})
const totalResources = computed(() => Object.values(resourceCounts.value).reduce((s,v) => s+v,0))
const detachment = computed(() => {
  if (selectedDetachment.value) {
    return composeDetachment(selectedDetachment.value, resourceCounts.value)
  } else {
    return false
  }
})
const detachmentName = computed(() => (totalResources.value > 0 && detachment.value) ? makeStupidName(detachment.value) : display('Detachment', selectedDetachment.value) + " Detachment")
</script>

<template>
  <div text-center text-m>
  <h1 font-title>Detachments Yo</h1>
    <div label>Choose base detachment:</div>
  <ButtonGroup :options="displayDetachments" :is-selected="isSelected" @select="selectDetachment" mb-4>
  </ButtonGroup>
    <div label>Add your resources:</div>
  <div flex flex-col sm:flex-row flex-wrap gap-4 justify-center content-center>
    <NumberButton v-for="item in numberOptions" :display="item.display" :count="item.count" :value="item.value" @change="changeCount" />
  </div>
  <Detachment :name="detachmentName" v-if="detachment" :detachment="detachment" />
  </div>
</template>

<style>
</style>
