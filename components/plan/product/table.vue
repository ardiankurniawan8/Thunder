<template>
  <div>
    <b-table hover 
      :fields="computedHeaders"
      :items="dataTable"
      @row-clicked="rowClicked"
      empty-text="Tidak ada data">
    </b-table>
  </div>
</template>
<script>

import PlanQuery from '~/apollo/queries/query_plan'

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
          { key: 'upc', label: 'Kode', sortable: true },
          { key: 'nama', label: 'Nama', sortable: true }
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
          query: PlanQuery,
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
    }
    // rowClicked (record, index) {
    //   let vm = this
    //   // console.log(vm.dataFilter)
    //   vm.$nuxt.$router.replace({path: '/plan/product/' + record.upc, query: vm.dataFilter})
    // }
  }
}
</script>