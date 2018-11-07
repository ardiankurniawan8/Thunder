<template>
  <div>
    <v-layout justify-space-around>
      <v-flex xs12 justify-center>
        <v-card flat class='b-1'>
          <!-- Title & Tabs -->
          <v-toolbar flat tabs color='white'>
            <v-toolbar-title>
              <small>
                <a href="/dashboard"> HOME </a> > KATALOG
              </small>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon nuxt to="/"><v-icon>exit_to_app</v-icon></v-btn>
          </v-toolbar>

          <!-- Content -->
          <v-card-text>
            <TableKatalog ref="TableKatalog" :headers="['city', 'name', 'description']" @ITEM_CLICKED="BarangClicked" :dataFilter="table.filter"></TableKatalog>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import TableKatalog from '~/components/table/katalog/table_katalog'

export default {
  layout: 'me',
  components: { TableKatalog },
  apollo: {
    $client: 'customer'
  },
  data () {
    return {
      tab: null,
      table: {
        filter: {}
      },
      fab: false
    }
  },
  methods: {
    BarangClicked (barangId) {
      this.$nuxt._router.replace({path: `/katalog/barang?barangId=${barangId}`})
    },
    filterStory () {
      this.$refs.TableKatalog.filter = this.table.filter
      this.$refs.TableKatalog.fetch()
    }
  }
}
</script>
