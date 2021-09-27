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
  name: 'requestState'
})
export default class RequestModule extends VuexModule {
  /*
   * @name - setResponseSize
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setResponseSize(responseSize) {
    this.responseSize = responseSize
  }

  /*
   * @name - requestTime
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setRequestTime(requestTime) {
    this.requestTime = requestTime
  }

  /*
   * @name - requestTime
   * @descrition - Menu open
   */
  requestTime = ''

  /*
   * @name - menuMini
   * @descrition - Menu open
   */
  responseSize = ''
}
