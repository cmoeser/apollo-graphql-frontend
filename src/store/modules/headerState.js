// Vuex
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

/**
 *  @desc - State management for the App
 *
 *  @author Chip Moeser
 *
 *  Tue Feb 4 08:50:44 EST 2020
 */
@Module({
  stateFactory: true,
  namespaced: true,
  name: 'headerState'
})
export default class HeaderModule extends VuexModule {
  /*
   * @name - setMeetingPeople
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setSubHeaderText(subHeader) {
    this.subHeaderText = subHeader
  }

  /*
   * @name - headerText
   * @descrition - Sub Header
   */
  subHeaderText = ''
}
