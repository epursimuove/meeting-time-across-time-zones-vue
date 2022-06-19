<template>

  <h2>Information bar</h2>

  <div id="information-bar">
    
    <div v-for="(part, index) in parts"
         :key="index"
         :style="`flex: ${part.count};`"
         :class="part.css">
    </div>
    
  </div>
  
</template>

<script setup>
import {computed} from "vue";
import {getConvenienceIndicator} from "../util";
import {DateTime} from "luxon";

const props = defineProps({
  timeZones: Array,
  startTime: DateTime,
  columnIndex: Number
});

const parts = computed(() => {

  const counts = {
    good: 0,
    okay: 0,
    bad: 0,
    "really-bad": 0,
  }
  
  props.timeZones
      .map(timeZone => getConvenienceIndicator(props.startTime.plus({hours: props.columnIndex}).setZone(timeZone.id)))
      .forEach(convenienceLevel => counts[convenienceLevel]++);
  
  return [
    {
      css: "good",
      count: counts.good
    },
    {
      css: "okay",
      count: counts.okay
    },
    {
      css: "bad",
      count: counts.bad
    },
    {
      css: "really-bad",
      count: counts["really-bad"]
    },
  ];
});
</script>

<style scoped>

#information-bar {
  display: flex;
  height: 2rem;
}

</style>