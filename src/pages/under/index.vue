<template>
  <div>Under</div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

/**
 *  @name - GQUnderPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 *  Sat Sep 25 13:52:37 EDT 2021
 */
@Component({})
export default class GQUnderPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Under Fetching'
}
</script>
