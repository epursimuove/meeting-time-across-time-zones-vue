<template>
  <MeetingTimeAcrossTimeZones />
</template>

<script setup>
import MeetingTimeAcrossTimeZones from "./components/MeetingTimeAcrossTimeZones.vue";

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

* {
  margin: 0;
  padding: 0;
}

body {
  margin: 0 0.4em;
}

table {
  border-collapse: collapse;
}

h1, h2, h3 {
  margin-top: 1.5em;
  /*margin-bottom: 1em;*/
}

h1 {
  font-size: 1.2em;
}

h2 {
  font-size: 1.1em;
}

h3 {
  font-size: 1.0em;
}

p, ul {
  margin: 1em 0;
}

li {
  margin: 0.5em 2em;
}

option, select {
  padding: 0.3em;
}

code {
  overflow-wrap: break-word;
}

a {
  color: blue;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.utc-time-zone {
  /*background-color: rgba(154, 205, 50, 0.2);*/
  /*background-color: rgba(250, 50, 250, 0.2);*/
  /*background-color: rgba(139, 69, 19, 0.2);*/
  background-color: rgba(50, 250, 50, 0.2);
  /*background-color: yellowgreen;*/
}

.current-local-time-zone {
  /*background-color: rgba(154, 205, 50, 0.2);*/
  background-color: rgba(50, 50, 250, 0.2);
  /*background-color: yellowgreen;*/
}

.in-the-past {
  background-color: rgba(200, 200, 200, 0.5);
}

.really-bad {
  background-color: rgba(255, 0, 0, 0.5);
}

.bad {
  background-color: rgba(255, 200, 0, 0.5);
}

.okay {
  background-color: rgba(255, 255, 0, 0.5);
}

.good {
  background-color: rgba(0, 200, 0, 0.5);
}

.hovering {
  /*border-left: 1px solid black;*/
  /*border-right: 1px solid black;*/
  background-color: rgba(0, 0, 255, 0.1);
  /*background-color: rgba(139, 69, 19, 0.3);*/
  cursor: default;
}

.note {
  color: #888;
  font-size: 0.9em;
}

@media screen and (min-width: 700px) {
  body {
    margin: 0 1em;
    max-width: 1400px;
  }

  p, ul {
    max-width: 800px;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.6em;
  }

  h3 {
    font-size: 1.2em;
  }

}

</style>
