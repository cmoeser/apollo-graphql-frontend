<template>
  <v-subheader class="gq-sub-header">
    <div class="gq-sub-header__text">
      {{ subHeaderText }}
    </div>
  </v-subheader>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Vuex
import { State } from 'vuex-class'

/**
 *  @name - GQSubHeader
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({})
export default class GQSubHeader extends Vue {
  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('subHeaderText', { namespace: 'headerState' })
  subHeaderText
}
</script>

<style lang="postcss">
.gq-sub-header {
  position: absolute;
  top: 72px;
  width: 100%;
  text-align: center;
  background-color: var(--apollo-pink-dark);
  text-align: center;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  z-index: 10;
}

.gq-sub-header__text {
  color: var(--white);
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: var(--space-xxg);
  margin: 0 auto;
}
</style>
