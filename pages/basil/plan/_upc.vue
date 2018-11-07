<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/catalog/product'">Kembali</b-button>
      </b-col>
      <b-col cols="12" md="6" class="text-right">
        <b-button variant="primary mb-3 px-3" :to="{path: '/catalog/product/add/', query: $route.query}">Ubah</b-button>
      </b-col>
    </b-row>
    <b-card>
      <b-media>
        <b-img-lazy v-if="table.data.thumbnail"  slot="aside" :src="`${table.data.thumbnail}`" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb"/>
        <b-img v-else blank slot="aside" :alt="table.data.nama" thumbnail fluid  blank-color="#bbb" width="230"/>
        <div class="p-3">
          <h4>{{ table.data.nama }} - {{ table.data.upc }}</h4>
          <p class="font-weight-light">
            <span v-if="table.data.harga">{{ table.data.harga.currency }} {{ table.data.harga.nominal | toCurrency }}</span>
          </p>
          <p class="mb-1"><strong>Kategori</strong></p>
          <div v-if="table.data.list_grup">
            <b-badge class="mr-1" variant="primary" v-for="grup in table.data.list_grup">
              {{grup.keyword.substring(grup.keyword.lastIndexOf(",") + 1)}}
            </b-badge>
          </div>
          <div class="clearfix">&nbsp;</div>

          <!-- varian -->
          <p v-if="table.data.opsi && table.data.opsi.length != 0"><strong>Opsi</strong></p>
          <div v-if="table.data.opsi && table.data.opsi.length != 0" v-for="opsi in table.data.opsi">
            <b-card :header="opsi.judul" header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                :empty-text="'Belum ada ' + opsi.judul"
                class="text-capitalize"
                :fields="[
                {key: 'parameter', label: 'Jenis', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'value', label: 'Nilai', thClass: 'font-weight-bold border-top-0'}, 
                {key: 'sku', label: 'SKU', thClass: 'font-weight-bold border-top-0'}]"
                :items="opsi.varian">
              </b-table>
            </b-card>
            <div class="clearfix">&nbsp;</div>
          </div>
          <div class="clearfix">&nbsp;</div>

          <!-- list harga -->
          <p v-if="table.data.list_harga && table.data.list_harga != 0"><strong>List Harga</strong></p>
          <div v-if="table.data.list_harga && table.data.list_harga != 0" >
            <b-card  header-tag="header" class="w-100">
              <b-table hover small
                show-empty
                empty-text="Belum ada list harga"
                class="text-capitalize"
                :fields="[
                  {key: 'harga', label: 'Harga', thClass: 'font-weight-bold border-top-0'}, 
                  {key: 'mulai', label: 'Berlaku Tgl', thClass: 'font-weight-bold border-top-0'}, 
                  {key: 'penetapan', label: 'Satuan', thClass: 'font-weight-bold border-top-0'}
                ]"
                :items="table.data.list_harga">
                <template slot="harga" slot-scope="data">
                  <span v-if="data.item.harga">{{ data.item.harga.currency }} {{ data.item.harga.nominal | toCurrency }}</span>
                </template>

                <template slot="mulai" slot-scope="data">
                  <span v-if="data.item.mulai">{{ data.item.mulai.date | toDateTime }}</span>
                </template>

                <template slot="penetapan" slot-scope="data">
                  <span v-if="data.item.penetapan" class="text-uppercase">{{ data.item.penetapan.satuan }}</span>
                </template>
              </b-table>
            </b-card>
          </div>
        </div>
        <div class="clearfix">&nbsp;</div>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import CatalogQuery from '~/apollo/queries/query_catalog'

export default {
  props: {
    dataFilter: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  apollo: {
    // -----------------------------------------------------------------------------------------------------------------------
    // TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
    $client: 'customer'
    // -----------------------------------------------------------------------------------------------------------------------
    // END TO MODIFY
    // -----------------------------------------------------------------------------------------------------------------------
  },
  data () {
    return {
      table: {
        data: [],
        filter: {}
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    fetch () {
      let vm = this
      vm.table.data = []
      let queryVar = {}

      queryVar.upc = this.$route.params.upc
      queryVar.owner = this.$route.query.owner

      this.$apollo.query(
        {
          query: CatalogQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.pengaturanBarang[0]
      }).catch(e => {
        if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
          e.graphQLErrors.forEach(function (error) {
            switch (error.code) {
              case 401:
                vm.$nuxt.$router.replace({ path: '/' })
                break

              default:
                vm.$emit('SUBMIT_FAIL', error.code)
                break
            }
          })
        } else if (e.networkError.message) {
          vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
        }
      })
    }
  }
}
</script>