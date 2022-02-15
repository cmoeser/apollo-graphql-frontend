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
                  I would like you to create a list of listing
                  <strong><em>titles &amp; summary's</em></strong> It will be
                  displayed on our home page.
                </p>
                <p class="info-text-p">
                  <span>API Developer:&nbsp;</span>
                  We don't have the bandwith for a new endpoint, you'll have to
                  use the existing listings API endpoint we use for all other
                  listings requirements at /listings.
                </p>
              </div>
              <div class="info-text middle">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  id<br />
                  field_listing_title<br />
                  field_listing_desc_1
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />
                <div v-if="listingsREST.length > 0">
                  <div
                    v-for="(value, key) in listingsREST[0]"
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
              <v-btn @click="getListingsREST()">Get Listings</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class="info-box">
              <div class="info-text">
                <p class="info-text-title">Scenario:</p>

                <p class="info-text-p">
                  <span>Manager:&nbsp;</span>
                  I would like you to create a list of listing
                  <strong><em>titles &amp; summary's</em></strong> It will be
                  displayed on our home page.
                </p>
                <p class="info-text-p">
                  <span>API Developer:&nbsp;</span>
                  We don't have the bandwith for a new endpoint, you'll have to
                  use the existing listings API endpoint we use for all other
                  listings requirements at /listings.
                </p>
              </div>
              <div class="info-text middle">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  id<br />
                  field_listing_title<br />
                  field_listing_desc_1
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />
                <div v-if="listingsGQL.length > 0">
                  <div
                    v-for="(value, key) in listingsGQL[0]"
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
              <v-btn @click="getListingsGQL()">Get Listings</v-btn>
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
  name = 'Over Fetching'

  tab = 0

  items = ['REST API', 'GraphQL']

  listingsREST = {}

  listingsGQL = {}

  isOpen = false

  item

  responseSize = 0

  responseData = []

  getListingsREST() {
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
              listings {
                id
                field_listing_title
                field_listing_desc_1
                field_listing_desc
                field_listing_additional_info
                field_listing_dates
                field_image
                field_thumbnail
              }
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)

          this.listingsREST = resp.data.listings
          this.responseData = resp.data.listings
          console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  getListingsGQL() {
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
              listings {
                id
                field_listing_title
                field_listing_desc_1
              }
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)

          this.listingsGQL = resp.data.listings
          this.responseData = resp.data.listings
          console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  getListingWNID(nid) {
    const clientApollo = this.$apolloProvider.defaultClient

    return new Promise((resolve, reject) => {
      console.time()
      clientApollo
        .query({
          query: gql`
            query queryAsociated($nid: ID!) {
              getAssociated(nid: $nid) {
                title
              }
            }
          `,

          variables: { $nid: '746' },
        })
        .then((resp) => {
          console.timeEnd()
          console.log('Listing', resp.data.listings)
          console.log('TIME:: ', this.resp.timing)
          this.listings = resp.data.listings
          this.responseData = resp.data.listings
          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  setTab(index) {
    this.tab = index
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
  flex: 1 1 24%;
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
