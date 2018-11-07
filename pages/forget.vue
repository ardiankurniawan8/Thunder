<template>
  <div>
    <v-layout class="my-4" justify-space-around>
      <v-flex xs12 justify-center>
        <v-card flat class='b-1'>
          <!-- Title & Tabs -->
          <v-toolbar flat tabs color='white'>
            <v-toolbar-title>
              Hi Chelsy,
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon nuxt to="/"><v-icon>exit_to_app</v-icon></v-btn>
            <v-tabs 
              slot="extension"
              v-model="tab"
              color="white"
              class='bb-1'
            >
              <v-tabs-slider color="primary"></v-tabs-slider>
              <v-tab key="1">KATALOG</v-tab>
              <v-tab key="2">PENJUALAN</v-tab>
              <v-tab key="3">ADMIN</v-tab>
            </v-tabs>
          </v-toolbar>

          <!-- Content -->
          <v-card-text>
            <v-tabs-items v-model="tab">
              <!-- Stories -->
              <v-tab-item key="1">
                <v-list>
                  <v-list-tile nuxt to="/katalog/katalog">
                    <v-list-tile-action><v-icon>assignment</v-icon></v-list-tile-action>
                    <v-list-tile-content><small>KATALOG</small></v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile nuxt to="/katalog/pengaturan">
                    <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
                    <v-list-tile-content><small>PENGATURAN</small></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-tab-item>

              <!-- Prayers -->
              <v-tab-item key="2">
                <v-list>
                  <v-list-tile nuxt to="/dashboard">
                    <v-list-tile-action><v-icon>message</v-icon></v-list-tile-action>
                    <v-list-tile-content><small>BILLING</small></v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile nuxt to="/dashboard">
                    <v-list-tile-action><v-icon>message</v-icon></v-list-tile-action>
                    <v-list-tile-content><small>NOTA BAYAR</small></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-tab-item>

              <!-- Schedules -->
              <v-tab-item key="3">
                <v-list>
                  <v-list-tile nuxt to="/dashboard">
                    <v-list-tile-action><v-icon>add</v-icon></v-list-tile-action>
                    <v-list-tile-content><small>ADMIN BARU</small></v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile nuxt to="/dashboard">
                    <v-list-tile-action><v-icon>cloud</v-icon></v-list-tile-action>
                    <v-list-tile-content><small>SEMUA ADMIN</small></v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  layout: 'me',
  apollo: {
    $client: 'customer'
  },
  data () {
    return {
      tab: null
    }
  }
}
</script>