<template>

  <h1>Documentation</h1>

  <p>
    Deciding meeting time across time zones can be a <a href="https://anders.nemonisimors.com/timeZones">challenging task</a>, and it may be hard to understand how it affects the different participants.
  </p>

  <p>
    This colorful tool will help you understand and visualize many of these uncertainties.
  </p>

  <p>
    The <em>decision table</em> shows 24 slots with offset hours relative to the selected local time zone. When hovering over the cells in the decision table, the corresponding column is marked and the values in the summary table are updated accordingly.
  </p>

  <p>
    The <em>summary table</em> displays the decided time slot in a compact format. The most valuable information and the value that should be communicated is probably the "ISO string as Zulu (UTC)".
  </p>
  
  <p>
    The <em>information bar</em> will help you to understand how "good" your current selection is.
  </p>

  <p>
    There are a total of {{ timeZoneAreaLocationIdentifiers.length }} time zone identifiers that you can choose from.
  </p>

  <p>
    In the tables, the time zones are sorted on offset values.
  </p>

  <p>
    As always, the <a href="https://anders.nemonisimors.com/currentTime">UTC</a> row will never be hidden, since it is so important and valuable.
  </p>

  <p>
    The default is to show the local date for <em>tomorrow</em> in <em>your</em> local time zone.
  </p>


  <h2>Colors</h2>

  <p>
    Different background colors are used to indicate the different (local) time slots:
  </p>

  <ul>
    <li>
      <span class="really-bad convenience-indicator">&nbsp;</span>
      Really bad
    </li>
    <li>
      <span class="bad convenience-indicator">&nbsp;</span>
      Bad
    </li>
    <li>
      <span class="okay convenience-indicator">&nbsp;</span>
      Okay
    </li>
    <li>
      <span class="good convenience-indicator">&nbsp;</span>
      Good
    </li>
    <li>
      <span class="in-the-past convenience-indicator">&nbsp;</span>
      In the past
    </li>
  </ul>

  <p>
    There are also some other background colors used:
  </p>

  <ul>
    <li>
      <span class="current-local-time-zone convenience-indicator">&nbsp;</span>
      The currently selected local time zone
    </li>
    <li>
      <span class="utc-time-zone convenience-indicator">&nbsp;</span>
      The almighty <a href="https://anders.nemonisimors.com/currentTime">UTC</a> time zone
    </li>
    <li>
      <span class="hovering convenience-indicator">&nbsp;</span>
      Hovered column in decision table
    </li>
  </ul>


  <h2>Daylight saving time</h2>

  <p>
    When <em>daylight saving time</em> (DST) is currently used for a time zone, it is indicated with a "&starf;" symbol.
  </p>


  <h3>DST switches</h3>

  <p>
    If the date displayed contains an actual DST transition, a blinking "&starf;!" is used as warning. The local time slots will probably look strange, either they miss a value, at "spring forward", or they will contain duplicates, at "fall back". The offset will of course also change at some (random) point during this date.
  </p>

  <p class="note">
    Note: If you have an eye for details, you will also notice that you will not be able to select hour 23 under some circumstances, but I will leave that problem as an exercise for you to think about and as a reminder of the <a href="https://anders.nemonisimors.com/timeZones#daylight-saving-time">DST craziness</a>.
  </p>



  <h2>Convenience link</h2>

  <p>
    The current configuration creates a dynamic link for your convenience. You can bookmark this link for easy access to the values for time zones that you most often use.
  </p>

  <h3>URL parameters</h3>

  <dl>
    <dt>tzLocal</dt>
    <dd>The local time zone identifier.</dd>

    <dt>tz</dt>
    <dd>A list of additional time zone identifiers.</dd>
  </dl>

  <h3>Examples</h3>

  <p>
    The following shows Perth, London and Los Angeles, with Perth as selected local time zone:
  </p>

  <a href="https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=Australia/Perth&tz=Europe/London&tz=America/Los_Angeles&tz=Australia/Perth">
    <code>
      https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=Australia/Perth&tz=Europe/London&tz=America/Los_Angeles&tz=Australia/Perth
    </code>
  </a>

  <p>
    The following shows London, Stockholm and Helsinki, with UTC as selected local time zone:
  </p>

  <a href="https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=UTC&tz=Europe/London&tz=Europe/Stockholm&tz=Europe/Helsinki">
    <code>
      https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=UTC&tz=Europe/London&tz=Europe/Stockholm&tz=Europe/Helsinki
    </code>
  </a>

  <p>
    The following shows Los Angeles and Sydney, with UTC as selected local time zone:
  </p>

  <a href="https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=UTC&tz=America/Los_Angeles&tz=Australia/Sydney">
    <code>
        https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=UTC&tz=America/Los_Angeles&tz=Australia/Sydney
    </code>
  </a>

  <p>
    The following shows Stockholm and Denver, with Stockholm as selected local time zone:
  </p>

  <a href="https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=Europe/Stockholm&tz=America/Denver&tz=Europe/Stockholm">
    <code>
      https://anders.nemonisimors.com/projects/meetingTime/?tzLocal=Europe/Stockholm&tz=America/Denver&tz=Europe/Stockholm
    </code>
  </a>


  <h2>About</h2>

  <p>
    The <em>NNM Meeting time across time zones</em> tool was originally created in July 2021.
  </p>

  <p>
    Ideas came from the upcoming <a href="https://tc39.es/proposal-temporal/docs/">Temporal</a> proposal and especially the section <a href="https://tc39.es/proposal-temporal/docs/cookbook.html#book-a-meeting-across-time-zones">Book a meeting across time zones</a>. Since <em>Temporal</em> was not released in July 2021, <a href="https://moment.github.io/luxon">Luxon</a> (currently version <var>3.5.0</var>) is used instead to handle the otherwise error-prone datetime calculations. When Temporal is released, the underlying code may be refactored.
  </p>

  <p>
    <a href="https://vuejs.org">Vue</a> (version <var>{{ version }}</var>) is used.
  </p>

  <h3>Changelog</h3>

  <ul>
    <li>
      Version <var>1.2.7</var>, released 2025-02-07.
    </li>
    <li>
      Version <var>1.2.6</var>, released 2024-10-05.
    </li>
    <li>
      Version <var>1.2.5</var>, released 2024-07-07.
    </li>
    <li>
      Version <var>1.2.4</var>, released 2024-06-16.
    </li>
    <li>
      Version <var>1.2.3</var>, released 2024-03-17.
    </li>
    <li>
      Version <var>1.2.2</var>, released 2023-07-22.
    </li>
    <li>
      Version <var>1.2.1</var>, released 2023-01-24.
    </li>
    <li>
      Version <var>1.2.0</var>, released 2022-06-19.
    </li>
<!--    <li>-->
<!--      Version <var>1.1.6</var>, released 2022-02-12.-->
<!--    </li>-->
    <li>
      Version <var>1.1.0</var>, released 2021-08-25.
    </li>
<!--    <li>-->
<!--      Version <var>1.0.3</var>, released 2021-08-21.-->
<!--    </li>-->
<!--    <li>-->
<!--      Version <var>1.0.2</var>, released 2021-08-19.-->
<!--    </li>-->
<!--    <li>-->
<!--      Version <var>1.0.1</var>, released 2021-08-18.-->
<!--    </li>-->
    <li>
      Version <var>1.0.0</var>, released 2021-07-29.
    </li>
  </ul>



  <h2>Feedback</h2>

  <p>
    Feedback is always appreciated. If you have questions, suggestions for improvements, find errors, please see the contact details at <a href="https://anders.nemonisimors.com/information">information</a> page.
  </p>


  <h2>References</h2>

  <ul>
    <li>
      <a href="https://anders.nemonisimors.com/timeZones">Time zones - to be or not to be?</a>, especially the sections:
      <ul>
        <li>
          <a href="https://anders.nemonisimors.com/timeZones#okay-to-call-friend">How can I know if it is okay to call my friend on the other side of the globe?</a>
        </li>
        <li>
          <a href="https://anders.nemonisimors.com/timeZones#schedule-meetings-around-the-globe">How can I schedule meetings with participants around the globe?</a>
        </li>
      </ul>
    </li>

    <li>
      <a href="https://anders.nemonisimors.com/projects/timeZones">NNM Time zones</a>
    </li>

    <li>
      <a href="https://anders.nemonisimors.com/currentTime">Current time</a>
    </li>

    <li>
      <a href="https://anders.nemonisimors.com/projects/constantTime">Constant time</a>
    </li>

    <li>
      <a href="https://anders.nemonisimors.com/projects/temporal">Timestamp magician</a>
    </li>

  </ul>



  <h2>Disclaimer</h2>

  <p>
    Since we are handling (future) times, dates, time zones, daylight saving times, etc, there may be <a href="https://anders.nemonisimors.com/timeZones">confusion and errors</a> involved. In particular, we have the problem that solar noon and noon may be many hours apart in some time zones, the problem with holidays in a particular time zone, local times not fixed to the timeline, areas using offsets of 30 or 45 minutes, the problem with DST switches and other complex edge cases. Therefore, no guarantees are promised and no liabilities for errors.
  </p>

</template>

<script setup>
import {version} from "vue";
import {timeZoneAreaLocationIdentifiers} from "../timeZones";

</script>

<style scoped>

.convenience-indicator {
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  /*vertical-align: text-bottom;*/
}

</style>