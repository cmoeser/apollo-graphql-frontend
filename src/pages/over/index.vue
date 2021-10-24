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
                  <em>titles &amp; summary's</em>. It will be displayed on our
                  home page.
                </p>
                <p class="info-text-p">
                  <span>API Developer:&nbsp;</span>
                  We don't have the bandwith for a new endpoint, you'll have to
                  use the existing listings API endpoint we use for all other
                  listings requirements at /listings.
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  field_listing_title<br />
                  field_listing_desc_1
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />
                <div v-if="responseData.length > 0">{{ responseData[0] }}</div>
              </div>
            </div>
            <div class="info-row">
              <v-btn @click="getListings()">Get Listings</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text v-if="listings">
            <div class="listing-wrapper">gfdgf</div>
          </v-card-text>
          <v-btn @click="getListing('746')">Get Listings</v-btn>
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

  listings = {}

  isOpen = false

  item

  responseSize = 0

  responseData = []

  getListings() {
    /*
    const timeStartLink = new ApolloLink((operation, forward) => {
      operation.setContext({ start: performance.now() })
      return forward(operation)
    })

    const logTimeLink = new ApolloLink((operation, forward) =>
      forward(operation).map((data) => {
        // data from a previous link
        const time = performance.now() - operation.getContext().start
        console.log(
          `operation ${operation.operationName} took ${time} to complete`,
        )
        return data
      }),
    )

    const link = timeStartLink.concat(logTimeLink)
    console.log('LINK:: ', link)
    */

    const clientApollo = graphqlClient // this.$apolloProvider.defaultClient

    return new Promise((resolve, reject) => {
      clientApollo
        .query({
          query: gql`
            query {
              listings {
                id
                field_listing_title
                field_listing_desc
                field_listing_desc_1
                listing_additional_info
                listing_dates
              }
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)
          console.log('TIME:: ', resp.timing)

          this.listings = resp.data.listings
          this.responseData = resp.data.listings
          console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  getListing(nid) {
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
  overflow-y: auto;
  flex: 1 1 33%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--extra-light-grey);
  border-radius: 16px;
  margin: 0 var(--space-md);
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
