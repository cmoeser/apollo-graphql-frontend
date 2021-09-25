import Vue from 'vue'
import Component from 'vue-class-component'

/**
 *  @name - GQPageBase
 *
 *  @desc - Sets the current page in routeState
 *
 *  @author Chip Moeser
 *
 *  Tue Apr 6 10:56:03 EDT 2021
 */

@Component({})
export default class GQPageBase extends Vue {
  /*
   * @name -  name
   * @descrition -
   */
  name = ''

  /*
   * @name -  mounted
   * @descrition - Set current page
   */
  beforeMount() {
    this.$store.commit('headerState/setSubHeaderText', this.name)
  }
}
