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
                  I would like you to create 2 pages of people with their first
                  and last name on both and their titles only on the second
                  page.
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  <v-checkbox
                    v-model="withTitle"
                    label="With Title?"
                  ></v-checkbox>
                </p>
                <p>
                  title<br />
                  field_firstname<br />
                  field_lastname
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />
                <div v-if="responseData.length > 0">
                  <div
                    v-for="(field, key, index) in responseData[0]"
                    :key="index"
                  >
                    <div v-if="key !== '__typename'">
                      <span>{{ key }} </span>{{ field }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-row">
              <v-btn @click="getPeopleWithTitle()">Get People</v-btn>
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
  name = 'Directives'

  tab = 0

  items = ['GraphQL']

  listings = {}

  isOpen = false

  item

  responseSize = 0

  responseData = []

  withTitle = false

  getPeopleWithTitle() {
    this.$store.commit('missionControlState/clearRequestEndpoints')
    this.$store.commit('missionControlState/addRequestEndPoint', '/people')

    const clientApollo = graphqlClient // this.$apolloProvider.defaultClient

    return new Promise((resolve, reject) => {
      clientApollo
        .query({
          query: gql`
            query GetPeopleWithTitle($withTitle: Boolean!) {
              getPeopleWithTitle(withTitle: $withTitle) {
                title @include(if: $withTitle)
                field_firstname
                field_lastname
              }
            }
          `,
          variables: { withTitle: this.withTitle },
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)
          console.log('TIME:: ', resp.timing)

          // this.listings = resp.data.listings
          this.responseData = resp.data.getPeopleWithTitle
          console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          reject(err)
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
