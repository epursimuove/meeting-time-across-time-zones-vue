<template>

  <h2>Summary</h2>

  <div id="summary">

    <p>
      <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO string</a> as <a href="https://anders.nemonisimors.com/currentTime.php">Zulu (UTC)</a>:
      <time id="isoString" :class="{'in-the-past': inThePast}">{{ actualDateTimeZulu }}</time>
    </p>

    <div id="summary-table">

      <table>
        <tbody>

        <tr v-for="timeZone in timeZones"
            :key="timeZone.id"
            :class="{'utc-time-zone': timeZone.id === 'UTC', 'current-local-time-zone': timeZone.id === currentLocalTimeZoneIdentifier}">

          <td :class="getConvenienceIndicator(startTime.plus({hours: columnIndex}).setZone(timeZone.id))">
            &nbsp;
          </td>

          <th>
            {{ timeZone.prettyId }}
          </th>

          <td>
            {{ startTime.plus({hours: columnIndex}).setZone(timeZone.id).toFormat("ccc dd MMM HH:mm [ZZ]") }}
          </td>

          <td :class="getConvenienceIndicator(startTime.plus({hours: columnIndex}).setZone(timeZone.id))">
            &nbsp;
          </td>
        </tr>

        </tbody>
      </table>

    </div>
  </div>


</template>

<script setup>
import {DateTime} from "luxon";
import {computed} from "vue";
import {getConvenienceIndicator} from "../util";

const props = defineProps({
  timeZones: Array,
  currentLocalTimeZoneIdentifier: String,
  startTime: DateTime,
  columnIndex: Number
});

const actualDateTimeZulu = computed(() => props.startTime
    .plus({hours: props.columnIndex})
    .setZone("UTC")
    .toISO({suppressSeconds: true})
);

const inThePast = computed(() => props.startTime
    .plus({hours: props.columnIndex}).diff(DateTime.now()) < 0);

</script>

<style scoped>

#summary {
  font-size: 0.8em;
}

#summary-table {
  overflow-x: auto;
  white-space: nowrap;
}

#summary-table th {
  padding: 0.3em 1em;
  text-align: right;
}

#summary-table td {
  padding: 0.3em 1em;
  /*text-align: right;*/
  font-family: Courier, monospace;
}

#summary-table .utc-time-zone td {
  font-weight: bold;
}

#isoString {
  white-space: nowrap;
  font-weight: bold;
  font-size: 1.5em;
  color: forestgreen;
}

#isoString.in-the-past {
  color: red;
}

@media screen and (min-width: 700px) {
  #summary {
    font-size: 1.0em;
  }
}

</style>