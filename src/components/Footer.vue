<template>
  <footer>
    <div>
      <em>NNM Meeting time across time zones</em> <small><var>{{ appVersion }}</var></small>, released {{ releaseDate }}.
    </div>
    <div>
      Copyright &copy; 2021-{{ year }}
      <a href="https://anders.nemonisimors.com">Anders Gustafson</a>.
      All rights reserved.
    </div>
    <div>
      <a href="https://www.nemonisimors.com"><em>Nemo nisi mors</em></a>
    </div>
  </footer>
</template>

<script setup>
import {DateTime} from "luxon";
import {appVersion, releaseDate} from "../util.js";

const year = DateTime.now().year;

</script>

<style scoped>

footer {
  margin-top: 4em;
  color: darkgray;
  font-size: 0.9em;
}

a {
  color: darkgray;
}

</style>