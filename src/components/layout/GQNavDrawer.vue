<template>
  <v-navigation-drawer
    permanent
    :mini-variant="menuMini"
    :width="260"
    style="top: 72px"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-tooltip :disabled="!menuMini" right>
          <template #activator="{ on }">
            <div
              class="v-avatar v-list-item__avatar"
              @click.stop="toggleSearchPanel()"
              v-on="on"
            >
              <img
                id="toggle-menu"
                src="/images/2048px-GraphQL_Logo.svg.png"
                class="search-icon"
                role="img"
                alt="Toggle Menu"
              />
            </div>
          </template>
          <span>Advanced Search</span>
        </v-tooltip>

        <v-list-item-title></v-list-item-title>

        <v-btn
          id="toggle-advanced-search-chevron"
          icon
          aria-label="open advanced search"
          @click.stop="toggleSearchPanel()"
        >
          <i class="material-icons" role="img">chevron_left</i>
        </v-btn>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/over" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">O</div>

          <div class="nav-text">Over Fetching</div>
        </nuxt-link>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/under" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">U</div>

          <div class="nav-text">Under Fetching</div>
        </nuxt-link>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/directives" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">D</div>

          <div class="nav-text">Directives</div>
        </nuxt-link>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/caching" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">C</div>

          <div class="nav-text">Caching&nbsp;&nbsp;&nbsp;</div>
        </nuxt-link>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/persisted" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">P</div>

          <div class="nav-text">Persisted&nbsp;</div>
        </nuxt-link>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/subscriptions" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">S</div>

          <div class="nav-text">Subscriptions</div>
        </nuxt-link>
      </v-list-item>

      <v-list-item link class="gq-menu-item">
        <nuxt-link to="/multiple" class="nuxt-link">
          <div class="nav-icon-bg" />
          <div class="nav-icon">M</div>

          <div class="nav-text">Multiple Data Sources</div>
        </nuxt-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Core
import Vue from 'vue'
import Component from 'vue-class-component'

// Vuex
import { State } from 'vuex-class'

/**
 *  @name -
 *
 *  @desc -
 *
 *  @author Chip Moeser
 *
 *  Sat Sep 25 12:12:26 EDT 2021
 */
@Component({})
export default class GQNavDrawer extends Vue {
  /*
   * @name -
   * @descrition -
   * @decorator - @State
   * @type - Sate<T>
   * @param - namespace: string -
   */
  @State('menuMini', { namespace: 'appState' })
  menuMini

  /*
   * @name - toggleSearchPanel
   * @descrition - Toggles the open/closed
   * state of the search panel on the side
   */
  toggleSearchPanel() {
    console.log('toggle')
    this.$store.commit('appState/setMenuMini', !this.menuMini)
  }
}
</script>

<style>
.v-list,
.v-list-item {
  padding: 0;
  min-height: 0;
}

.v-avatar.v-list-item__avatar {
  display: flex;
  justify-content: center;
  flex: 1 1 auto;
  cursor: pointer;
  height: 60px;
  width: 60px;
  min-height: 60px;
  min-width: 60px;
}

.v-avatar.v-list-item__avatar img {
  padding: var(--space-sm);
}

.gq-menu-item {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
}

.nav-text {
  display: flex;
  flex: 1 1 60%;
  padding-left: var(--space-sm);
  background-color: var(--white);
  align-items: center;
  border-bottom: 1px solid var(--apollo-pink-transparent);
}

.nuxt-link {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  flex: 1 0 auto;
  text-decoration: none;
  align-items: center;
  background-color: var(--apollo-pink-dark);
  align-items: stretch;
}

.nav-icon {
  height: 40px;
  max-width: 56px;
  width: 56px;
  display: flex;
  flex: 0 0 40%;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 3;
  color: var(--white);
  font-weight: bold;
  font-size: 1.6rem;
  border-bottom: 1px solid var(--white);
}

.nuxt-link.nuxt-link-exact-active.nuxt-link-active .nav-icon {
  color: var(--node-green-dark);
}

.nav-icon-bg-temp {
  height: 34px;
  left: 11px;
  top: 2px;
  width: 34px;
  margin-bottom: 3px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  background-color: var(--white-transparent);
  position: absolute;
  border: 1px solid var(--white);
}

.nuxt-link.nuxt-link-exact-active.nuxt-link-active .nav-icon-bg {
  height: 34px;
  left: 11px;
  top: 2px;
  width: 34px;
  margin-bottom: 3px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  border: 1px solid var(--white-transparent-six);
  background-color: var(--white-transparent-six);
}
</style>
