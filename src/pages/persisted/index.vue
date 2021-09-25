<template>
  <div>persisted</div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

/**
 *  @name - GQPersistedPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 *  Sat Sep 25 13:58:43 EDT 2021
 */
@Component({})
export default class GQPersistedPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Persisted Queries'
}
</script>
