<template>
  <div>directives</div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

/**
 *  @name - GQDirectivesPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({})
export default class GQDirectivesPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Directives'
}
</script>
