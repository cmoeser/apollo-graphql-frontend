<template>
  <div></div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

/**
 *  @name - GQFragmentsPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({})
export default class GQFragmentsPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Fragments'
}
</script>
