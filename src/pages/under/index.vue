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
                  <strong
                    ><em
                      >People's titles and first &amp; last names, and ssociated
                      listings
                    </em></strong
                  >
                  It will be displayed on our People page.
                </p>
              </div>
              <div class="info-text middle">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  id<br />
                  title<br />
                  field_firstname<br />
                  field_lastname<br />
                  field_assoc_desc<br />
                  field_assoc_title
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />

                <!--- people output -->
                <div v-if="peopleREST.length > 0">
                  <div
                    v-for="(value, key) in peopleREST[0]"
                    :key="key"
                    class="column"
                  >
                    <div v-if="key !== '__typename'">
                      <div class="key-div">{{ key }}</div>
                      <div class="value-div">{{ value }}</div>
                    </div>
                  </div>
                </div>

                <!--- associated output -->
                <div v-if="associatedREST.length > 0">
                  <div
                    v-for="(value, key) in associatedREST[0]"
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
              <v-btn @click="getPeopleREST()">Get People</v-btn>
            </div>
            <div v-if="showGetAssociated" class="info-row">
              <v-btn @click="getAssociatedREST()">Get Associated</v-btn>
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
                  <strong
                    ><em
                      >People's titles and first &nbsp; last names, and
                      ssociated listings
                    </em></strong
                  >
                  It will be displayed on our People page.
                </p>
              </div>
              <div class="info-text middle">
                <p class="info-text-title">What I want:&nbsp;</p>
                <p>
                  <v-checkbox v-model="selectedID" label="ID"></v-checkbox>
                  <v-checkbox
                    v-model="selectedTitle"
                    label="Title"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="selectedField_firstname"
                    label="field_firstname"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="selectedField_lastname"
                    label="field_lastname"
                  ></v-checkbox>

                  <v-checkbox
                    v-model="selectedField_assoc_desc"
                    label="field_assoc_desc"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="selectedField_assoc_title"
                    label="field_assoc_title"
                  ></v-checkbox>
                </p>
              </div>
              <div class="info-text">
                <p class="info-text-title">What I get:&nbsp;</p>
                <g-q-response-size :response-data="responseData" />
                <div v-if="peopleDynamic.length > 0">
                  <div
                    v-for="(value, key) in peopleDynamic[0]"
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
              <v-btn @click="getPeopleDynamic()">Get GQL</v-btn>
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
 *  @name - GQUnderPage
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 *  Sat Sep 25 13:52:37 EDT 2021
 */
@Component({
  components: {
    GQResponseSize,
  },
})
export default class GQUnderPage extends mixins(GQBasePage) {
  /*
   * @name -  name
   * @descrition -
   */
  name = 'Under Fetching'

  tab = 0

  items = ['REST API', 'GraphQL']

  selectedID = 0
  selectedTitle = 0
  selectedField_firstname = 0
  selectedField_lastname = 0
  selectedField_assoc_desc = 0
  selectedField_assoc_title = 0

  showGetAssociated = false

  peopleREST = {}

  associatedREST = {}

  peopleDynamic = {}

  listingsGQL = {}

  responseSize = 0

  responseData = []

  getPeopleREST() {
    this.$store.commit('missionControlState/clearRequestEndpoints')
    this.$store.commit('missionControlState/addRequestEndPoint', '/people')

    const clientApollo = graphqlClient

    return new Promise((resolve, reject) => {
      clientApollo
        .query({
          query: gql`
            query {
              people {
                title
                field_firstname
                field_lastname
              }
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)

          this.peopleREST = resp.data.people
          this.responseData = resp.data.people
          console.log('DES:: ', this.responseData)
          this.showGetAssociated = true

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  getAssociatedREST() {
    this.$store.commit(
      'missionControlState/addRequestEndPoint',
      '/associated-listings',
    )

    const clientApollo = graphqlClient

    return new Promise((resolve, reject) => {
      clientApollo
        .query({
          query: gql`
            query {
              getAllAssociated {
                nid
                title
                field_assoc_desc
                field_field_assoc_cost
                field_assoc_listings
              }
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp)

          this.associatedREST = resp.data.getAllAssociated
          this.responseData = resp.data.getAllAssociated
          console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  getPeopleDynamic() {
    this.$store.commit(
      'missionControlState/addRequestEndPoint',
      '/people-w-listings',
    )

    const clientApollo = graphqlClient

    console.log('GQ :: ', this.generateQuery())

    return new Promise((resolve, reject) => {
      clientApollo
        .query({
          query: gql`
            query fetchData {
              ${this.generateQuery()}
            }
          `,
        })
        .then((resp) => {
          console.log('RESPONSE:: ', resp.data.peoplewlistings)

          this.peopleDynamic = resp.data.peoplewlistings

          console.log('PD :: ', this.peopleDynamic.slice(0, 5))
          // this.responseData = resp.data.getAllAssociated
          // console.log('DES:: ', this.responseData)

          resolve(resp)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }

  generateQuery() {
    let query = ``

    const selectedID = this.selectedID === true ? 'nid' : ''
    const selectedTitle = this.selectedTitle === true ? 'title' : ''
    const selectedField_firstname =
      this.selectedField_firstname === true ? 'field_firstname' : ''
    const selectedField_lastname =
      this.selectedField_lastname === true ? 'field_lastname' : ''
    const selectedField_assoc_desc =
      this.selectedField_assoc_desc === true ? 'field_assoc_desc' : ''
    const selectedField_assoc_title =
      this.selectedField_assoc_title === true ? 'field_assoc_title' : ''

    query += `
      peoplewlistings  {
        ${selectedID}
        ${selectedTitle}
        ${selectedField_firstname}
        ${selectedField_lastname}
        ${selectedField_assoc_desc}
        ${selectedField_assoc_title}
      }
    `

    return query
  }
}
</script>

<style>
.v-input--selection-controls {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
</style>
