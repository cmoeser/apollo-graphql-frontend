<template>
  <div class="gq-mission-control"></div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

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
export default class GQMissionControl extends Vue {}
</script>

<style>
.gq-mission-control {
  display: flex;
  flex: 1 1 12%;
  height: 400px;
  border: 1px solid var(--white-transparent);
  background-color: var(--node-green-dark);
  margin: 130px var(--space-md) 0 0;
}
</style>
