<template>
  <div>
    <slot name="filter"></slot>
    <slot name="filter_list">
    </slot>

    <v-data-table
      :headers="computedHeaders"
      :items="table.data"
      :pagination.sync="table.pagination"
      :total-items="table.data_count"
      :loading="table.isLoading"
      select-all
      item-key="name"
      :rows-per-page-items="[1,25,50,100]"
    >
      <template slot="no-results">
        <span v-if="table.isLoading">Loading...</span>
        <span v-else>Tidak ada data ditemukan</span>
      </template>

      <template slot="no-data">
        <span v-if="defaultData">Loading...</span>
        <span v-else>Tidak ada data ditemukan</span>
      </template>

      <template slot="headers" slot-scope="props">
        <tr>
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <th width="5">#</th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', table.pagination.descending ? 'desc' : 'asc', header.value === table.pagination.sortBy ? 'active' : '', `text-xs-${header.align}`]"
            @click="changeSort(header.value)"
            >
            {{ header.text }} 
            <v-icon small>arrow_upward</v-icon>
          </th>
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- END TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr @click="rowClicked(props.item.username)" style="cursor:pointer">
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <td>
            {{ ((table.pagination.page - 1) * table.pagination.rowsPerPage) + props.index + 1 }}
          </td>
          <template v-for="x in computedHeaders">
            <td v-if="x.text === 'name'">{{ props.item.name }}</td>
            <td v-if="x.text === 'email'">{{ props.item.username }}</td>
            <td v-if="x.text === 'role'">{{ props.item.roles }}</td>
          </template>
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- END TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import MemberQuery from '~/apollo/queries/query_member'

  export default {
    middleware: ['auth', 'session_lifetime'],
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
      // -----------------------------------------------------------------------------------------------------------------------
      // TO MODIFY
      // -----------------------------------------------------------------------------------------------------------------------
      // -----------------------------------------------------------------------------------------------------------------------
      // END TO MODIFY
      // -----------------------------------------------------------------------------------------------------------------------
    },
    watch: {
      'table.pagination.rowsPerPage': function () {
        this.fetch()
      },
      'table.pagination.page': function () {
        this.fetch()
      }
    },
    computed: {
      computedHeaders: function () {
        let vm = this
        let tmp = []
        vm.headers.forEach(function (item) {
          for (let i = 0; i < vm.table.availableHeaders.length; i++) {
            if (vm.table.availableHeaders[i].text === item) {
              tmp.push(vm.table.availableHeaders[i])
            }
          }
        })

        return tmp
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
          isLoading: false,
          data: [],
          data_count: 0,
          // -----------------------------------------------------------------------------------------------------------------------
          // TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
          pagination: {
            sortBy: 'name',
            descending: false,
            page: 1,
            rowsPerPage: 25
          },
          availableHeaders: [
            { text: 'name', align: 'left', value: 'name', sortable: true },
            { text: 'email', align: 'left', value: 'username', sortable: true },
            { text: 'role', align: 'left', value: 'role', sortable: false }
          ]
          // -----------------------------------------------------------------------------------------------------------------------
          // END TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
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
        vm.table.isLoading = true
        let queryVar = {
          skip: (vm.table.pagination.page - 1) * vm.table.pagination.rowsPerPage,
          take: vm.table.pagination.rowsPerPage,
          orderby: [
            { field: this.table.pagination.sortBy, mode: this.table.pagination.descending ? -1 : 1 }
          ]
        }
        // -----------------------------------------------------------------------------------------------------------------------
        // TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------

        this.$apollo.query(
          {
            query: MemberQuery,
            variables: queryVar,
            fetchPolicy: 'no-cache'
          }
          // -----------------------------------------------------------------------------------------------------------------------
          // END TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
        ).then(function (result) {
          // -----------------------------------------------------------------------------------------------------------------------
          // TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
          vm.table.data = result.data.Member
          vm.table.data_count = result.data.MemberCount
          // -----------------------------------------------------------------------------------------------------------------------
          // END TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
          vm.table.isLoading = false
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
      },
      changeSort (field) {
        if (this.table.pagination.sortBy === field) {
          this.table.pagination.descending = !this.table.pagination.descending
        } else {
          this.table.pagination.descending = false
          this.table.pagination.sortBy = field
        }
        this.fetch()
      },
      rowClicked (id) {
        // -----------------------------------------------------------------------------------------------------------------------
        // TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------
        this.$emit('ITEM_CLICKED', id)
        // -----------------------------------------------------------------------------------------------------------------------
        // END TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------
      }
    }
  }
</script>