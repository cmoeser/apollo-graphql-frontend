<template>
  <div>
    <!-- Top Bar -->
    <g-q-top-bar />
    <!-- End Top Bar -->

    <!-- Sub Header -->
    <g-q-sub-header />
    <!-- End Sub Header -->

    <!-- Nav Drawer -->
    <g-q-nav-drawer />
    <!-- Nav Drawer -->
    <div class="gq-content-wrapper">
      <!-- Main Content -->
      <main-view role="main" />
      <!-- End Main Content -->

      <!-- Mission Control -->
      <g-q-mission-control />
      <!-- Mission Control -->
    </div>
  </div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Componnents
import MainView from './MainView'
import GQNavDrawer from '@/components/layout/GQNavDrawer'
import GQTopBar from '@/components/layout/GQTopBar'
import GQSubHeader from '@/components/layout/GQSubHeader'
import GQMissionControl from '@/components/mission-control/GQMissionControl'

/**
 *  @name - TvAdvancedSearchPanel
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({
  components: {
    MainView,
    GQNavDrawer,
    GQTopBar,
    GQSubHeader,
    GQMissionControl
  }
})
export default class TvAdvancedSearchPanel extends Vue {}
</script>

<style lang="postcss">
@import url('~/assets/css/styles.css');

.gq-content-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  margin: 0 var(--space-xxl);
}
</style>
