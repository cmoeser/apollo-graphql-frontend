<template>
  <div class="container">
    <div>
      <h1 class="title">
        listings-app-frontend
      </h1>
      <div v-if="listings">
        {{ listings }}
      </div>
    </div>
  </div>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Grpahql
import { gql } from 'graphql-tag'
// import listingsGQL from '@/apollo/queries/listings.gql'

@Component({})
export default class GQIndexPage extends Vue {
  listings = {}

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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
