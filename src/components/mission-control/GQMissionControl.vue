<template>
  <div class="gq-mission-control">
    <div class="gq-mission-control-header">Mission Control</div>
    <div class="gq-mission-control-content-wrapper">
      <div class="gq-mission-control-content-item">
        Response Size: <span> {{ responseSize }} </span>
      </div>
      <div class="gq-mission-control-content-item">
        Request End Point(s):<br />
        <span v-for="(endpoint, index) in requestEndPoints" :key="index">
          {{ endpoint }}</span
        >
      </div>
      <div class="gq-mission-control-content-item">
        Cached: <br />
        <span>{{ requestCached }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Vuex
import { State } from 'vuex-class'

/**
 *  @name - GQMissionControl
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 *  Sat Sep 25 20:00:18 EDT 2021
 */
@Component({})
export default class GQMissionControl extends Vue {
  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('requestEndPoints', { namespace: 'missionControlState' })
  requestEndPoints

  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('responseSize', { namespace: 'missionControlState' })
  responseSize

  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('requestTotal', { namespace: 'missionControlState' })
  requestTotal

  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('requestFinish', { namespace: 'missionControlState' })
  requestFinish

  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('requestStart', { namespace: 'missionControlState' })
  requestStart

  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('requestCached', { namespace: 'missionControlState' })
  requestCached
}
</script>

<style>
.gq-mission-control {
  display: flex;
  flex: 1 1 12%;
  height: 400px;
  flex-direction: column;
  border: 1px solid var(--white-transparent);
  background-color: var(--node-green-dark);
  margin: 124px var(--space-md) 0 0;
}

.gq-mission-control-header {
  color: var(--white);
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--white-transparent);
  width: 100%;
  height: 34px;
  text-align: center;
  padding-top: 6px;
}

.gq-mission-control-content-wrapper {
  display: flex;
  flex-direction: column;
  padding: var(--space-sm) var(--space-md);
}

.gq-mission-control-content-item {
  color: var(--white);
  margin-bottom: var(--space-sm);
}

.gq-mission-control-content-item span {
  font-weight: bold;
  display: block;
  margin-top: var(--space-xs);
}
</style>
