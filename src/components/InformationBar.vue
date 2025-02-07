<template>

  <h2>Information bar</h2>

  <div id="information-bar">
    
    <div v-for="(part, index) in parts"
         :key="index"
         :style="`flex: ${part.count};`"
         :class="part.css">
    </div>
    
  </div>
  
  <div>
    {{weightedIndicator}}%
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

const weightedIndicator = computed(() => {
  const [good, okay, bad, reallyBad] = parts.value;

  // console.log('good, okay, bad, reallyBad', good, okay, bad, reallyBad);
  
  const perfectValue = props.timeZones.length * 5;
  
  const weightedValue = good.count * 5 + okay.count * 3 + bad.count * 2 + reallyBad.count * 1;

  // console.log('weightedValue', weightedValue, perfectValue);
  
  const percentage = Math.round((weightedValue / perfectValue) * 100);
  
  return percentage;
});
</script>

<style scoped>

#information-bar {
  display: flex;
  height: 2rem;
}

</style>