<template>

  <h2>Information bar</h2>

  <div id="information-bar">
    
    <div v-for="(part, index) in parts"
         :key="index"
         :style="`flex: ${part.count};`"
         :class="part.css">
    </div>
    
  </div>
  
  <div class="weighted-indicator" :class="{optimal: weightedIndicator === weightedIndicatorPotentialMaximum}">
    {{weightedIndicator.toString().padStart(3)}}%
  </div>
  
  <div class="potential-maximum">
    {{weightedIndicatorPotentialMaximum.toString().padStart(3)}}% <small>(potential maximum)</small>
  </div>
  
</template>

<script setup>
import {computed} from "vue";
import {
  assembleConvenienceIndicators,
  getConvenienceIndicatorsForTimeZones
} from "../util";
import {DateTime} from "luxon";

const props = defineProps({
  timeZones: Array,
  startTime: DateTime,
  columnIndex: Number
});

const parts = computed(() => {

  const convenienceIndicatorsForTimeZones =
      getConvenienceIndicatorsForTimeZones(props.timeZones, props.startTime, props.columnIndex);

  const assembledConvenienceIndicators = assembleConvenienceIndicators(convenienceIndicatorsForTimeZones);
  
  return assembledConvenienceIndicators;
});

const weightedIndicator = computed(() => {
  
  return calculatedWeightedIndicator(parts.value);
});

const calculatedWeightedIndicator = ([good, okay, bad, reallyBad]) => {
  const perfectValue = props.timeZones.length * 4;

  const weightedValue = good.count * 4 + okay.count * 2 + bad.count * 1 + reallyBad.count * 0;

  // console.log('weightedValue', weightedValue, perfectValue);

  const percentage = Math.round((weightedValue / perfectValue) * 100);

  return percentage;
}

const weightedIndicatorPotentialMaximum = computed(() => {

  const calculatedWeightedIndicators = [];
  for (let i = 0; i < 24; i++) {

    const convenienceIndicatorsForTimeZones =
        getConvenienceIndicatorsForTimeZones(props.timeZones, props.startTime, i);
    
    const assembledConvenienceIndicators = assembleConvenienceIndicators(convenienceIndicatorsForTimeZones);

    calculatedWeightedIndicators.push(calculatedWeightedIndicator(assembledConvenienceIndicators));
  }
  
  //console.table(calculatedWeightedIndicators);
  
  //const min = Math.min(...calculatedWeightedIndicators);
  const max = Math.max(...calculatedWeightedIndicators);
  //console.log(`Min ${min} - Max ${max}`)
  
  return max;
});
</script>

<style scoped>

#information-bar {
  display: flex;
  height: 2rem;
}

.weighted-indicator, .potential-maximum {
  font-family: Courier, monospace;
  white-space: pre;
}

.potential-maximum {
  color: rgb(150, 150, 150);
}

.optimal {
  &::after {
    font-size: 0.85rem;
    color: limegreen;
    content: "\2713";
  }
}
</style>