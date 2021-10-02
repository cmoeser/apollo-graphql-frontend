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
  name: 'missionControlState',
})
export default class MissionControlModule extends VuexModule {
  /*
   * @name -  setresponseSize
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
   * @name -  requestStart
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setRequestStart(requestStart) {
    console.log('SET START: ', requestStart)
    this.requestStart = requestStart
  }

  /*
   * @name -   requestFinish
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setRequestFinish(requestFinish) {
    console.log('SET FINISH: ', requestFinish)
    this.requestFinish = requestFinish
  }

  /*
   * @name -  requestTotal
   * @descrition -
   * @decorator - @Mutation
   * @type - Mutation<T>
   * @arguments - people - The array of people objects
   */
  @Mutation
  setRequestTotal(requestTotal) {
    this.requestTotal = requestTotal
  }

  /*
   * @name - responseSize
   * @descrition -
   */
  responseSize = ''

  /*
   * @name - requestStart
   * @descrition -
   */
  requestStart = ''

  /*
   * @name - requestFinish
   * @descrition -
   */
  requestFinish = ''

  /*
   * @name - requestTotal
   * @descrition -
   */
  requestTotal = ''
}
