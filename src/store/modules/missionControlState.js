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
  name: 'appState'
})
export default class AppModule extends VuexModule {
  /*
   * @name -  setRequestSize
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setRequestSize(requestSize) {
    this.requestSize = requestSize
  }

  /*
   * @name - requestSize
   * @descrition -
   */
  requestSize = ''
}
