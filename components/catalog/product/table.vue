<template>
  <div>
    <b-table hover 
      :fields="computedHeaders"
      :items="dataTable"
      @row-clicked="rowClicked"
      empty-text="Tidak ada data">
      <template slot="thumbnail" slot-scope="data">
        <b-img-lazy v-if="data.value" :src="data.value" width="75" blank-color="#bbb"/>
        <b-img v-else blank width="75" blank-color="#bbb" tes/>
      </template>
      <template slot="harga" slot-scope="data">
        <span v-if="data.value">{{ data.value.currency }} {{ data.value.nominal | toCurrency }}</span>
      </template>
    </b-table>
  </div>
</template>
<script>

import CatalogQuery from '~/apollo/queries/query_catalog'

export default {
  props: {
    headers: {
      type: Array,
      default: function () {
        return []
      }
    },
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
  computed: {
    computedHeaders: function () {
      let temp = this
      let tmp = []
      temp.headers.forEach(function (item) {
        for (let i = 0; i < temp.table.availableHeaders.length; i++) {
          if (temp.table.availableHeaders[i].key === item) {
            tmp.push(temp.table.availableHeaders[i])
          }
        }
      })

      return tmp
    },
    dataTable: function () {
      let data = this.table.data
      return data
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
        filter: {},
        availableHeaders: [
          { key: 'upc', label: 'UPC', sortable: true },
          { key: 'nama', label: 'Nama', sortable: true },
          { key: 'thumbnail', label: 'Gambar', sortable: false }
        ]
      }
    }
  },
  mounted () {
    if (this.defaultData.length === 0) {
      this.fetch()
    } else {
      this.table.data = this.defaultData
    }
  },
  methods: {
    fetch () {
      let vm = this
      vm.table.data = []
      let queryVar = {}

      for (let key in this.dataFilter) {
        if (this.dataFilter.hasOwnProperty(key)) {
          queryVar[key] = this.dataFilter[key]
        }
      }

      console.log(queryVar)
      this.$apollo.query(
        {
          query: CatalogQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.pengaturanBarang
      }).catch(e => {
        console.log('gagal')
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
    },
    rowClicked (record, index) {
      let vm = this
      // console.log(vm.dataFilter)
      vm.$nuxt.$router.replace({path: '/catalog/product/' + record.upc, query: vm.dataFilter})
    }
  }
}
</script>