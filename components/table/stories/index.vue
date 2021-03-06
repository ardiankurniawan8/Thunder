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
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }} 
          </th>
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- END TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr @click="rowClicked(props.item.id)" style="cursor:pointer">
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <td>
            {{ ((table.pagination.page - 1) * table.pagination.rowsPerPage) + props.index + 1 }}
          </td>
          <template v-for="x in computedHeaders">
            <td v-if="x.text === 'mulai'">{{ props.item.active_since | toDate }}</td>
            <td v-else-if="x.text === 'akhir'">{{ props.item.active_until | toDate }}</td>
            <td v-else-if="x.text === 'jabatan'">{{ props.item.role }}</td>
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
  import QueryData from '~/apollo/queries/query_employee'

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
      },
      // -----------------------------------------------------------------------------------------------------------------------
      // TO MODIFY
      // -----------------------------------------------------------------------------------------------------------------------
      organizationId: {
        type: String,
        required: true
      },
      employeeId: {
        type: String,
        required: true
      }
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
            { text: 'mulai', align: 'left', value: 'active_since', sortable: true },
            { text: 'akhir', align: 'left', value: 'active_until', sortable: true },
            { text: 'jabatan', align: 'left', value: 'role', sortable: true }
          ]
          // -----------------------------------------------------------------------------------------------------------------------
          // END TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
        }
      }
    },
    mounted () {
      this.reload()
    },
    methods: {
      reload () {
        if (this.defaultData === undefined) {
          this.fetch()
        } else {
          this.table.data = this.defaultData
        }
      },
      fetch () {
        let vm = this
        vm.table.data = []
        vm.table.isLoading = true
        // -----------------------------------------------------------------------------------------------------------------------
        // TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------
        let queryVar = {
          organization_id: this.organizationId,
          skip: (vm.table.pagination.page - 1) * vm.table.pagination.rowsPerPage,
          take: vm.table.pagination.rowsPerPage,
          orderby: [
            { field: this.table.pagination.sortBy, mode: this.table.pagination.descending ? -1 : 1 }
          ]
        }

        for (var key in this.dataFilter) {
          if (this.dataFilter.hasOwnProperty(key)) {
            queryVar[key] = this.dataFilter[key]
          }
        }

        this.$apollo.query(
          {
            query: QueryData,
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
          vm.table.data = result.data.Employee[0].employments
          vm.table.data_count = result.data.Employee[0].employments.length
          // -----------------------------------------------------------------------------------------------------------------------
          // END TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
          vm.table.isLoading = false
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