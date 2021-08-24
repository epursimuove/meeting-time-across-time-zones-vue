<template>

  <th class="table-header">

    <div class="table-header-content">

      <div class="offset-information"
           :class="{'warning': dstChangeWillOccur}">
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

const dstAtStart = computed(() => props.timeZone.startTimeForCurrentTimeZone.isInDST);

const dstAtEnd = computed(() => props.timeZone.startTimeForCurrentTimeZone.plus({hours: 23}).isInDST);

const dstChangeWillOccur = computed(() => dstAtStart.value !== dstAtEnd.value);

const offsetInformation = computed(() => {
  const startTimeForCurrentTimeZone = props.timeZone.startTimeForCurrentTimeZone;

  const dstIndicator = dstChangeWillOccur.value ? " &starf;!" : dstAtStart.value ? " &starf;" : "";
  // console.log('startTimeForCurrentTimeZone', props.timeZone.prettyId, startTimeForCurrentTimeZone);
  const offsetString = startTimeForCurrentTimeZone.zoneName === "UTC" ? "Z" : startTimeForCurrentTimeZone.toISO().slice(-6);

  // return `UTC${offsetString}${dstIndicator}`;
  return `${offsetString}${dstIndicator}`;
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

.warning {
  animation-duration: 1s;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /*animation-timing-function: ease-in;*/
}

@keyframes blink {
  from {
    color: red;
  }

  80% {
    color: red;
  }

  to {
    color: transparent;
  }
}

</style>