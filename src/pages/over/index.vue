<template>
  <div>
    <v-tabs v-model="tab" centered>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            REST API
            <div>I want:</div>
            <div>What I get:</div>
            <g-q-response-size :response-data="responseData" />
            <div v-if="listings">{{ listings[0] }}</div>

            <v-btn @click="getListings()">Get Listings</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text v-if="listings">
            <button
              v-for="(listing, index) in listings"
              :key="index"
              @click="setTab(1)"
            >
              {{ listing.field_listing_title }}
            </button>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Descriptions
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Details
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
    GQResponseSize
  }
})
export default class GQOverPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Over Fetching'

  tab = 0

  items = ['REST API', 'Titles', 'Descriptions', 'Details']

  listings = {}

  isOpen = false

  item

  responseSize = 0

  responseData = []

  getListings() {
    const clientApollo = this.$apolloProvider.defaultClient

    return new Promise((resolve, reject) => {
      console.time()
      clientApollo
        .query({
          query: gql`
            query {
              listings {
                id
                field_listing_title
                field_listing_desc
                listing_additional_info
                listing_dates
              }
            }
          `
        })
        .then((resp) => {
          console.timeEnd()
          console.log('Listings', resp.data.listings)
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

  toggle() {
    if (this.isFolder) {
      this.isOpen = !this.isOpen
    }
  }

  makeFolder() {
    if (!this.isFolder) {
      this.$emit('make-folder', this.item)
      this.isOpen = true
    }
  }

  get isFolder() {
    return this.item.children && this.item.children.length
  }
}
</script>

<style>
.v-tabs.theme--light {
  margin-top: 33px;
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
</style>
