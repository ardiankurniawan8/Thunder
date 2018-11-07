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
        <tr @click="rowClicked(props.item.id)" style="cursor:pointer">
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <!-- TO MODIFY -->
          <!-- ---------------------------------------------------------------------------------------------------------------- -->
          <td>
            {{ ((table.pagination.page - 1) * table.pagination.rowsPerPage) + props.index + 1 }}
          </td>
          <template v-for="x in computedHeaders">
            <td v-if="x.text === 'nama'">{{ props.item.nama }}</td>
            <td v-if="x.text === 'thumbnail'"><img :src="props.item.thumbnail" style="max-width:75px;"></td>
            <td v-if="x.text === 'dijual di'">
              <template v-for="z in props.item.avail_in">
                <br/>
                {{ z.toko }} <br/>
                {{z.harga}} / {{z.min}} piece <br/>
                <h5 v-if=z.period>Hanya {{z.period}}</h5> <br/>
              </template>
            </td>
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
  import json from '~/static/product.json'

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
            { text: 'nama', align: 'left', value: 'nama', sortable: true },
            { text: 'thumbnail', align: 'left', value: 'thumbnail', sortable: true },
            { text: 'dijual di', align: 'left', value: 'dijual di', sortable: true }
          ]
          // -----------------------------------------------------------------------------------------------------------------------
          // END TO MODIFY
          // -----------------------------------------------------------------------------------------------------------------------
        }
      }
    },
    mounted () {
      this.fetch()
    },
    methods: {
      fetch () {
        let vm = this
        vm.table.isLoading = true

        vm.table.data = json
        vm.table.data_count = json.length
      }
    }
  }
</script>