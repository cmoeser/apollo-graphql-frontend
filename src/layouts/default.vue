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

    <!-- Main Content -->
    <main-view role="main" />
    <!-- End Main Content -->
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
    GQSubHeader
  }
})
export default class TvAdvancedSearchPanel extends Vue {}
</script>

<style lang="postcss">
@import url('~/assets/css/styles.css');
</style>
