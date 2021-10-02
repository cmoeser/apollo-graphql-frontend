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
  name: 'appState',
})
export default class AppModule extends VuexModule {
  /*
   * @name - setMeetingPeople
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setloading(isLoading) {
    this.loading = isLoading
  }

  /*
   * @name - setMeetingPeople
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setMenuMini(isMini) {
    this.menuMini = isMini
  }

  /*
   * @name - loading
   * @descrition - Something is loading
   */
  loading = false

  /*
   * @name - menuMini
   * @descrition - Menu open
   */
  menuMini = true
}
