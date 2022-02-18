<template>
  <div>
    <v-tabs v-model="tab" centered slider-size="6">
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class="info-box">
              <div class="info-text">
                <p class="info-text-title">Scenario:</p>

                <p class="info-text-p">
                  <span>Manager:&nbsp;</span>
                  I would like you to create a list of People
                </p>
              </div>
              <div class="info-text middle">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  title @cacheControl(maxAge: 30)<br />
                  field_firstname @cacheControl(maxAge: 300)<br />
                  field_lastname @cacheControl(maxAge: 300)
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />
                <div v-if="peopleWCache.length > 0">
                  <div
                    v-for="(value, key) in peopleWCache[0]"
                    :key="key"
                    class="column"
                  >
                    <div v-if="key !== '__typename'">
                      <div class="key-div">{{ key }}</div>
                      <div class="value-div">{{ value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <v-btn @click="getpeopleWithCache()">Get Listings</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
// Core
import Component, { mixins } from 'vue-class-component'

// Grpahql
import { gql } from 'graphql-tag'
// import listingsGQL from '@/apollo/queries/listings.gql'
import graphqlClient from '@/apollo/clients/default'

// Extends
import GQBasePage from '@/mixins/GQBasePage'

// Components
import GQResponseSize from '@/components/response/GQResponseSize'

/**
 *  @name - GQOverPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({
  components: {
    GQResponseSize,
  },
})
export default class GQOverPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Caching'

  tab = 0

  items = ['GraphQL']

  peopleWCache = {}

  isOpen = false

  item

  responseSize = 0

  responseData = []

  getpeopleWithCache() {
    const markerNameA = 'example-marker-a'
    const markerNameB = 'example-marker-b'

    // Run some nested timeouts, and create a PerformanceMark for each.
    performance.mark(markerNameA)
    setTimeout(() => {
      performance.mark(markerNameB)
      setTimeout(() => {
        // Create a variety of measurements.
        performance.measure('measure a to b', markerNameA, markerNameB)
        performance.measure('measure a to now', markerNameA)
        performance.measure(
          'measure from navigation start to b',
          undefined,
          markerNameB,
        )
        performance.measure('measure from navigation start to now')

        // Pull out all of the measurements.
        // const newDate = new Date(performance.timing.requestStart * 1000)
        // console.log('New Date :: ', newDate.getSeconds())
        console.log(performance)

        // Finally, clean up the entries.
        performance.clearMarks()
        performance.clearMeasures()
      }, 1000)
    }, 1000)

    this.$store.commit('missionControlState/clearRequestEndpoints')
    this.$store.commit('missionControlState/addRequestEndPoint', '/listings')

    const clientApollo = graphqlClient // this.$apolloProvider.defaultClient

    return new Promise((resolve, reject) => {
      clientApollo
        .query({
          query: gql`
            query {
              peopleWCache {
                title
                field_firstname
                field_lastname
              }
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)

          this.peopleWCache = resp.data.peopleWCache
          this.responseData = resp.data.peopleWCache
          console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }
}
</script>

<style>
.info-row {
  display: flex;
  flex-direction: row;
  padding: var(--space-sm) 0;
  justify-content: flex-end;
  margin-top: var(--space-md);
  border-top: 1px solid var(--extra-light-grey);
}

.info-box {
  display: flex;
  flex-direction: row;
  padding-top: var(--space-sm);
}

.info-text {
  max-height: 400px;
  max-width: 350px;
  overflow-y: auto;
  flex: 1 1 33%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--extra-light-grey);
  border-radius: 16px;
  margin: 0 var(--space-md);
}

.info-text.middle {
  flex: 1 1 44%;
}

.info-text em {
  font-weight: bold;
  color: var(--apollo-pink-dark);
}

.info-text p {
  text-align: left;
  margin-bottom: var(--space-sm);
}

.info-text-p {
  font-size: 1rem;
}

.info-text span {
  font-weight: bold;
  display: block;
  margin-bottom: var(--space-xxs);
  font-size: 1rem;
}

.info-text-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.theme--light.v-tabs > .v-tabs-bar {
  background-color: var(--apollo-blue);
}

.theme--light.v-tabs > .v-tabs-bar,
.theme--light.v-tabs > .v-tabs-bar > .v-icon,
.theme--light.v-tabs > .v-tabs-bar > .v-btn,
.theme--light.v-tabs > .v-tabs-bar .v-tab--disabled,
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  color: var(--white);
}

.listing-wrapper {
  max-height: 500px;
  text-align: left;
  overflow-y: scroll;
  padding: 0 var(--space-lg);
}
</style>
