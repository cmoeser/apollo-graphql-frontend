<template>
  <div>multiple</div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

/**
 *  @name - GQMultiplePage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({})
export default class GQMultiplePage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Multiple Data Sources'
}
</script>
