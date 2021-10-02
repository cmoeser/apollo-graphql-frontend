<template>
  <div></div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Util
import { roughSizeOfObject } from '@/util/util'

/**
 *  @name - GQResponseSize
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 *  Sun Sep 26 09:58:20 EDT 2021
 */
@Component({
  props: {
    responseData: {
      type: Array,
      required: true,
    },
  },
})
export default class GQResponseSize extends Vue {
  /*
   * @name -  responseChangeWatcher
   * @description -
   */
  responseChangeWatcher

  /*
   * @name - befoureMount
   * @description -
   */
  beforeMount() {
    this.responseChangeWatcherthis = this.$watch(
      'responseData',
      (newVal, oldVal) => {
        if (newVal?.[0]?.id) {
          this.calculateResponseSize()
        }
      },
      {
        deep: true,
        immediate: true,
      },
    )
  }

  /*
   * @name -  calculateResponseSize
   * @description -
   */
  calculateResponseSize() {
    const kiloBytes = this.responseData / 1024
    const megaBytes = kiloBytes / 1024
    this.$store.commit(
      'missionControlState/setResponseSize',
      `${roughSizeOfObject(megaBytes)}MB`,
    )
  }
}
</script>
