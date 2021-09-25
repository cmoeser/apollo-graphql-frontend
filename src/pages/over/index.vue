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
            {{ listings }}
            <button>Get Listings</button>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Titles
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

/**
 *  @name - GQOverPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 * Wed May 26 10:36:05 EDT 2021
 */
@Component({})
export default class GQOverPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Over Fetching'

  tree = [
    {
      id: 0,
      field_listing_title: 'Returned Query'
    }
  ]

  tab = 0

  items = ['REST API', 'Titles', 'Descriptions', 'Details']

  listings = []

  mounted() {
    const clientApollo = this.$apolloProvider.defaultClient
    console.log('Mounted :: ', clientApollo)

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
          console.log('THIS LISTINGS:: ', this.listings)
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
