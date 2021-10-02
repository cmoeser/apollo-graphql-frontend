<template>
  <div class="gq-content">
    <v-responsive class="mx-auto overflow-visible">
      <v-container>
        <v-responsive class="overflow-visible" min-height="80vh">
          <v-fade-transition mode="out-in">
            <nuxt />
          </v-fade-transition>
        </v-responsive>
      </v-container>
    </v-responsive>
  </div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

/**
 *  @name - MainView
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({
  components: {}
})
export default class MainView extends Vue {}
</script>
