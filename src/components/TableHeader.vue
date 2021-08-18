<template>

  <th class="table-header">

    <div class="table-header-content">

      <div class="offset-information">
        <span v-html="offsetInformation"></span>
      </div>

      <div class="identifier">
        {{ timeZone.prettyId }}
      </div>

    </div>

  </th>

</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
  timeZone: Object
});

const offsetInformation = computed(() => {
  const startTimeForCurrentTimeZone = props.timeZone.startTimeForCurrentTimeZone;

  const dstAtStart = startTimeForCurrentTimeZone.isInDST;
  const dstAtEnd = startTimeForCurrentTimeZone.plus({hours: 23}).isInDST;
  // console.log('dstAtStart, dstAtEnd', props.timeZone.prettyId, dstAtStart, dstAtEnd);
  const dstIndicator = dstAtStart !== dstAtEnd ? " &starf;!" : dstAtStart ? " &starf;" : "";
  // console.log('startTimeForCurrentTimeZone', props.timeZone.prettyId, startTimeForCurrentTimeZone);
  const offsetString = startTimeForCurrentTimeZone.zoneName === "UTC" ? "" : startTimeForCurrentTimeZone.toISO().slice(-6);

  return `UTC${offsetString}${dstIndicator}`;
});

</script>

<style scoped>

.table-header {
  padding: 0.7em;
  white-space: nowrap;
}

.table-header-content {
  /*height: 100%;*/
  /*height: 5.5em;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: flex-end;*/
  /*align-items: center;*/
}

.offset-information {
  color: #666;
  font-size: 0.7em;
}

</style>