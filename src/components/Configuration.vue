<template>

  <h1>Configuration</h1>

  <form>

    <div>
      <label for="local-time-zone">Local time zone</label>
      <select id="local-time-zone"
              :value="localTimeZoneIdentifier"
              @input="emit('update:localTimeZoneIdentifier', $event.target.value)"
      >

        <option v-for="{id, prettyId} in allTimeZones"
                :key="id"
                :value="id"
        >
          {{ prettyId }}
        </option>
      </select>
    </div>

    <div>
      <label for="additional-time-zones">Additional time zones</label>
      <select id="additional-time-zones"
              multiple="multiple"
              size="5"
              v-model="additionalTimeZoneIdentifiersWrapper"
      >

        <option v-for="{id, prettyId} in allTimeZonesExceptUtc"
                :key="id"
                :value="id"
        >
          {{ prettyId }}
        </option>
      </select>
    </div>

    <div>
      <label for="local-date">Local date</label>
      <input id="local-date"
             type="date"
             :value="currentLocalDate"
             @input="emitLocalDate"
      />
    </div>

    <div>
      <label for="include-utc">Include UTC</label>
      <input id="include-utc"
             type="checkbox"
             :checked="includeUtc"
             @input="emitIncludeUtc"
      />
    </div>

  </form>


</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  allTimeZones: Array,
  localTimeZoneIdentifier: String,
  additionalTimeZoneIdentifiers: Array,
  currentLocalDate: String,
  includeUtc: Boolean,
})

const emit = defineEmits([
  "update:localTimeZoneIdentifier",
  "update:additionalTimeZoneIdentifiers",
  "update:currentLocalDate",
  "update:includeUtc",
  // "allTimeZones",
]);

const allTimeZonesExceptUtc = computed(() =>
    props.allTimeZones.filter(({id}) => id !== "UTC"));

const additionalTimeZoneIdentifiersWrapper = computed({
  get: () => props.additionalTimeZoneIdentifiers,
  set: value => {
    // console.log('value', value);
    emit("update:additionalTimeZoneIdentifiers", value);
  }
});

const emitLocalDate = (event) => {
  const newLocalDate = event.target.value;

  if (newLocalDate) {
    emit('update:currentLocalDate', newLocalDate);
  }
};

const emitIncludeUtc = (event) => {
  const includeUtc = event.target.checked

  emit('update:includeUtc', includeUtc);
}

// function emitAllTimeZones() {
//   emit("allTimeZones", [{id: "UTC"}]); // TODO TESTAR LITE
// }
//
// onMounted(() => emitAllTimeZones());


// function foo(event) {
//   // console.log('event', event);
//   // console.log('event.target', event.target);
//   // console.log('event.currentTarget', event.currentTarget);
//   // console.log('event.target.value', event.target.value);
//   //
//   // console.log('props.additionalTimeZoneIdentifiers', props.additionalTimeZoneIdentifiers);
//
//   // const newValue = [...props.additionalTimeZoneIdentifiers, event.target.value];
//   const newValue = props.additionalTimeZoneIdentifiers;
//
//   emit('update:additionalTimeZoneIdentifiers', newValue);
// }

</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

form div {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

@media screen and (min-width: 700px) {
  form {
    flex-direction: row;
    gap: 3em;
  }
}

</style>