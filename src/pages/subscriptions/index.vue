<template>
  <div>subscriptions</div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

/**
 *  @name - GQSubscriptionsPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({})
export default class GQSubscriptionsPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Subscriptions'
}
</script>
