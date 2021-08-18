<template>

  <header>
    NNM Meeting time across time zones
    <small><var>{{ appVersion }}</var></small>
  </header>

  <Configuration v-model:allTimeZones="allTimeZones"
                 v-model:localTimeZoneIdentifier="localTimeZoneIdentifier"
                 v-model:additionalTimeZoneIdentifiers="additionalTimeZoneIdentifiers"
                 v-model:currentLocalDate="localDate"
  />

<!--  {{ now.toISO() }}-->
<!--  {{ startTime.toISO() }}-->

  <h1>Meeting time across {{ actualTimeZones.length }} time zones</h1>

  <Table :timeZones="actualTimeZones"
         :currentLocalDate="localDate"
         :currentLocalTimeZoneIdentifier="localTimeZoneIdentifier"
         :startTime="startTime"
         @hovered-column="handleHoveredColumn"
  />


  <Summary :timeZones="actualTimeZones"
           :currentLocalTimeZoneIdentifier="localTimeZoneIdentifier"
           :startTime="startTime"
           :columnIndex="hoveredColumnIndex"
  />


  <Documentation/>

  <Footer/>

</template>

<script setup>
import Table from "./Table.vue";
import {DateTime} from "luxon";
import {computed, ref, watch} from "vue";
import Footer from "./Footer.vue";
import Summary from "./Summary.vue";
import Documentation from "./Documentation.vue";
import Configuration from "./Configuration.vue";
import {appVersion} from "../util.js";
import {
  timeZoneAreaLocationIdentifiers,
  exampleSubsetOfTimeZoneAreaLocationIdentifiers
} from "../timeZones.js";

const useManyTimeZones = true;

const wrapWithId = id => {
  return {
    id: id
  };
};

const timeZones = useManyTimeZones ?
    timeZoneAreaLocationIdentifiers.map(wrapWithId) :
    exampleSubsetOfTimeZoneAreaLocationIdentifiers.map(wrapWithId);

const startingTimeZones = [
  "UTC",
  "Europe/London",
  "Europe/Helsinki",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Australia/Perth",
];


const now = DateTime.now()
    .plus({days: 1})
// .setZone(localTimeZoneIdentifier.value);
// const startTime = now.startOf("day");

const localTimeZoneIdentifier = ref(now.zoneName);
const additionalTimeZoneIdentifiers = ref([...startingTimeZones, now.zoneName]);
const localDate = ref(now.toISODate());

const startTime = computed(() => DateTime
    .fromISO(localDate.value, {zone: localTimeZoneIdentifier.value})
    .startOf("day"));

const allTimeZones = computed(() => timeZones
    // .filter(({id}) => Math.random() > 0.5 || id === "UTC" || id === localTimeZoneIdentifier.value)
    .map(enhance)
    .sort(compareAlphabetically));

// const allTimeZonesTest = ref([]);

const actualTimeZones = computed(() => allTimeZones.value
    .filter(({id}) => additionalTimeZoneIdentifiers.value.includes(id) || /*localTimeZoneIdentifier.value === id ||*/ id === "UTC")
    .sort(compareOffset)
    .reverse());

// TODO LIGGER I CONFIGURATION TABORT
// const allTimeZonesExceptUtc = computed(() => allTimeZones.value
//     .filter(({id}) => id !== "UTC"));

const hoveredColumnIndex = ref(0);

// function updateAllTimeZones(allTimeZones) {
//   console.log('TESTAR allTimeZones', allTimeZones);
//   const allTimeZonesEnhanced = allTimeZones
//       .map(enhance)
//       .sort(compareAlphabetically);
//
//   allTimeZonesTest.value = allTimeZonesEnhanced;
// }

watch(localTimeZoneIdentifier, (newLocalTimeZoneIdentifier) => {
  if (!additionalTimeZoneIdentifiers.value.includes(newLocalTimeZoneIdentifier)) {
    additionalTimeZoneIdentifiers.value.push(newLocalTimeZoneIdentifier);
  }
});

const prettifyTimeZoneIdentifier = timeZoneIdentifier => {
  if (timeZoneIdentifier.includes("/")) {
    const parts = timeZoneIdentifier.split("/");
    const prettified = parts[parts.length - 1].replaceAll("_", " ");
    return prettified;
  }
  return timeZoneIdentifier;
};


const enhance = ({id}) => {
  return {
    id,
    prettyId: prettifyTimeZoneIdentifier(id),
    startTimeForCurrentTimeZone: startTime.value.setZone(id)
  };
};

const compareOffset = (a, b) => {
  const offsetA = a.startTimeForCurrentTimeZone.offset;
  const offsetB = b.startTimeForCurrentTimeZone.offset;
  return offsetA - offsetB;
};

const compareAlphabetically = (a, b) => {
  const prettyIdA = a.prettyId;
  const prettyIdB = b.prettyId;
  if (prettyIdA < prettyIdB) {
    return -1;
  }
  if (prettyIdA > prettyIdB) {
    return 1;
  }
  return 0;
};

function handleHoveredColumn(columnIndex) {
  hoveredColumnIndex.value = columnIndex;
}


</script>

<style scoped>

header {
  /*background-color: black;*/
  /*color: darkorange;*/
  /*padding: 0.3em;*/
  margin-top: 1rem;
  font-size: 1.2em;
  font-weight: bold;
}

small {
  color: gray;
}

@media screen and (min-width: 800px) {
  header {
    font-size: 2.2em;
  }
}


</style>