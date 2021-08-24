<template>

  <h2>Decision table</h2>

  <div class="meeting-time-across-time-zones">

    <div class="current-local-date-info">
      {{ startTime.toFormat("ccc d MMMM yyyy z ('UTC'ZZ)") }}
<!--      {{currentLocalDate }}-->
<!--      {{ currentLocalTimeZoneIdentifier }}-->
    </div>

    <div class="decision-table">

      <table>
        <tbody>

        <tr v-for="(timeZone, index) in timeZones"
            :key="timeZone.id"
            :class="{'utc-time-zone': timeZone.id === 'UTC', 'current-local-time-zone': timeZone.id === currentLocalTimeZoneIdentifier}">

          <td class="row-number">
            {{ index + 1 }}
          </td>

          <TableHeader :timeZone="timeZone" />

          <!--        <td>{{ timeZone.startTimeForCurrentTimeZone.offset }}</td>-->
          <!--        <td>{{ timeZone.startTimeForCurrentTimeZone.hour }}</td>-->
          <!--        <td>{{ timeZone.startTimeForCurrentTimeZone.day }}</td>-->
          <!--        <td>{{ timeZone.startTimeForCurrentTimeZone.monthLong }}</td>-->

          <template v-for="n in 24" :key="n">

            <TableCell :timeZone="timeZone"
                       :column="n - 1"
                       :hovering="hovering.get(timeZone.id)[n - 1]"
                       :startTime="startTime"
                       @mouseover="handleMouseOver(n - 1)"
                       @mouseout="handleMouseOut(n - 1)"
            />
            <!--      {{ n }}-->
          </template>

        </tr>

        </tbody>
      </table>

    </div>

  </div>
</template>

<script setup>

import {DateTime} from "luxon";
import TableCell from "./TableCell.vue";
import TableHeader from "./TableHeader.vue";
import {computed, ref, watch} from "vue";

const props = defineProps({
  timeZones: Array,
  // now: DateTime,
  // localDate: DateTime,
  startTime: DateTime,
  currentLocalDate: String,
  currentLocalTimeZoneIdentifier: String
});

const emit = defineEmits(["hoveredColumn"]);

const hovering = ref(buildMap(props.timeZones));
// const hovering = computed(() => buildMap(props.timeZones));

watch(() => props.timeZones, (timeZones, previousTimeZones) => {
  hovering.value = buildMap(timeZones);
})

function buildMap(timeZones) {
  const map = new Map();

  timeZones.forEach(({id}) => {
    const columns = Array(24).fill(false);
    map.set(id, columns);
  });

  return map;
}

function handleMouseOut(hoveredColumn, mouseEvent) {
  setHoveringValuesForColumn(hoveredColumn, false);
}

function handleMouseOver(hoveredColumn, mouseEvent) {
  setHoveringValuesForColumn(hoveredColumn, true);
  emit("hoveredColumn", hoveredColumn);
}

const setHoveringValuesForColumn = (column, value) => {
  const mapIterator = hovering.value.values();

  for (const columns of mapIterator) {
    columns[column] = value;
  }
};

</script>

<style scoped>

.meeting-time-across-time-zones {
  font-size: 0.8em;
}

.decision-table {
  overflow-x: auto;
}

.current-local-date-info {
  font-family: Courier, monospace;
  font-size: 1.0em;
}

.row-number {
  color: #aaa;
  font-size: 0.8em;
  padding-left: 1em;
}

@media screen and (min-width: 700px) {
  .meeting-time-across-time-zones {
    font-size: 1.0em;
  }

  .current-local-date-info {
    font-size: 1.2em;
    font-weight: bold;
  }
}

</style>