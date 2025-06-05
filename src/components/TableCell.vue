<template>
  <td class="table-cell"
      :class="['column-' + column, {hovering: hovering}]">

    <div class="table-cell-content">

      <template v-if="dateInfo">

        <div class="table-cell-date">
          {{ dateInfo.dayOfWeek }}
        </div>

        <div class="table-cell-date">
          {{ dateInfo.date }}
        </div>

      </template>

      <div class="table-cell-hour"
           :class="[getConvenienceIndicator(hourOfDayInTimeZoneDateTime), {'start-of-day': hourOfDayInTimeZoneDateTime.hour === 0, 'end-of-day': hourOfDayInTimeZoneDateTime.hour === 23}]">

        {{ hourOfDayInTimeZoneDateTime.hour }}

        <sup v-if="diffMinutePart !== 0" class="offset-special">
          {{ diffMinutePart }}
        </sup>
      </div>

    </div>

  </td>
</template>

<script setup>

import {computed} from "vue";
import {getConvenienceIndicator} from "../util";
import {DateTime} from "luxon";

const props = defineProps({
  timeZone: Object,
  column: Number,
  hovering: Boolean,
  startTime: DateTime,
});

// console.log('props', props);

const showDateInfo = (column, hourOfDayInTimeZone) =>
    column === 0 || column === 23 || hourOfDayInTimeZone === 0 || hourOfDayInTimeZone === 23;


const hourOfDayInTimeZoneDateTime = computed(() => props.timeZone.startTimeForCurrentTimeZone.plus({hour: props.column}));

const dateInfo = computed(() => {
  return showDateInfo(props.column, hourOfDayInTimeZoneDateTime.value.hour) ?
      {
        dayOfWeek: hourOfDayInTimeZoneDateTime.value.weekdayShort,
        date: hourOfDayInTimeZoneDateTime.value.toFormat("d MMM")
      } :
      null;
});

const diffMinutePart = computed(() => {

  // Yes, this is complex, thanks to the areas using 30 and 45 minutes offsets.

  const localTimeZoneOffset = props.startTime.offset;
  const localTimeZoneOffsetMinutePart = localTimeZoneOffset % 60;
  // const localTimeZoneHasComplexOffset = localTimeZoneOffsetMinutePart !== 0;

  const cellTimeZoneOffsetMinutePart = hourOfDayInTimeZoneDateTime.value.offset % 60;

  const diffForMinuteParts = localTimeZoneOffsetMinutePart - cellTimeZoneOffsetMinutePart;

  const diffMinutePart = (60 - diffForMinuteParts) % 60;

  // const diffMinutePart = localTimeZoneHasComplexOffset && diffForMinuteParts !== 0 ?
  //     (60 - diffForMinuteParts) % 60 :
  //     diffForMinuteParts;

  // const offset = props.timeZone.id === "UTC" ?
  //     "+00:00" :
  //     hourOfDayInTimeZoneDateTime.value.toISO().slice(-6);

  // const offsetMinutePart = offset.slice(-2);
  // const offsetMinutePart = offset;
  return diffMinutePart;
});

</script>

<style scoped>

.table-cell {
}

.table-cell-content {
  height: 5.2em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.table-cell-date {
  white-space: nowrap;
  font-size: 0.75em;
  color: green;
}

.table-cell-hour {
  padding: 0.7em;
}

.table-cell-hour, .table-cell-date {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.offset-special {
  color: #333;
  font-size: 0.7em;
}

.in-the-past.table-cell-hour {
  color: gray;
}

.start-of-day {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}

.end-of-day {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

.hovering  :deep(.table-cell-hour) {
  /*font-weight: bold;*/
  color: blueviolet;
}

</style>