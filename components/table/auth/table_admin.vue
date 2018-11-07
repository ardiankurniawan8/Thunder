<!-- 
Versions:
  - 1.0   : order table
SLOT:
  - filterInfo: filter info
  - pagination

PROPS:
  - defaultFilters
  - defaultData
  - apiUrl

API:
-->

<template>
  <div>
    <Table ref="Table" :allHeaders="headers" :apiUrl='apiUrl' :rowsPerPage="10" :defaultFilters='table.filters' :defaultData='defaultData' @RELOAD_STARTING="loading" @RELOAD_SUCCESS="loaded" @RELOAD_FAIL="loaded">
      <template slot='td' slot-scope="rows">
        <tr>
          <td v-if="$refs.Table.hasField('#') === true" width="5">{{ ($refs.Table.table.query.pagination.page - 1) * $refs.Table.table.query.pagination.rowsPerPage + rows.data.index + 1 }}</td>
          <td v-if="$refs.Table.hasField('name') === true"><nuxt-link :to="'/dashboard/settings/admin/' + rows.data.item.id">{{ rows.data.item.name }}</nuxt-link></td>
          <td v-if="$refs.Table.hasField('username') === true">{{ rows.data.item.username }}</td>
          <td v-if="$refs.Table.hasField('role') === true">
            <div v-for="auth in rows.data.item.authorizations">
              <span v-if="auth.entity_id === 'PULSA' && auth.service === 'dashboard'">
                <v-chip outline color='primary' v-for="x in auth.scopes" :key="x">{{ x }}</v-chip>
              </span>
            </div>
          </td>
        </tr> 
      </template>
    </Table>
  </div>
</template>

<script>
import Table from '~/components/generators/table'

export default {
  components: { Table },
  props: {
    defaultFilters: {
      type: Object,
      default: function () {
        return {}
      }
    },
    defaultData: {
      type: Array,
      default: function () {
        return null
      }
    },
    apiUrl: {
      type: String,
      default: ''
    },
    // ------------------------------------------------------------------------ MODIFY HERE ----------------------------------------------------------------------------
    defaultHeaders: {
      type: Array,
      default: function () {
        return ['#', 'name', 'username', 'role']
      }
    }
    // ------------------------------------------------------------------------ END MODIFY HERE ------------------------------------------------------------------------
  },
  data () {
    return {
      table: {
        filters: this.defaultFilters,
        // ------------------------------------------------------------------------ MODIFY HERE ----------------------------------------------------------------------------
        headers: {
          available: [
            { sortable: false, text: '#' },
            { sortable: true, text: 'name', value: 'name' },
            { sortable: true, text: 'username', value: 'username' },
            { sortable: true, text: 'role', value: 'role' }
          ]
        }
        // ------------------------------------------------------------------------ END MODIFY HERE ------------------------------------------------------------------------
      }
      // ------------------------------------------------------------------------ MODIFY HERE ----------------------------------------------------------------------------
      // ------------------------------------------------------------------------ END MODIFY HERE ------------------------------------------------------------------------
    }
  },
  watch: {
    defaultFilters: function () {
      this.table.filters = this.defaultFilters
    }
    // ------------------------------------------------------------------------ MODIFY HERE ----------------------------------------------------------------------------
    // ------------------------------------------------------------------------ END MODIFY HERE ------------------------------------------------------------------------
  },
  mounted () {
    // ------------------------------------------------------------------------ MODIFY HERE ----------------------------------------------------------------------------
    // ------------------------------------------------------------------------ END MODIFY HERE ------------------------------------------------------------------------
  },
  computed: {
    headers: function () {
      let headers = []

      for (let i = 0; i < this.table.headers.available.length; i++) {
        if (this.defaultHeaders.indexOf(this.table.headers.available[i].text) >= 0) {
          headers.push(this.table.headers.available[i])
        }
      }
      // return headers
      return headers
    }
    // ------------------------------------------------------------------------ MODIFY HERE ----------------------------------------------------------------------------
    // ------------------------------------------------------------------------ END MODIFY HERE ------------------------------------------------------------------------
  },
  methods: {
    reload () {
      this.$refs.Table.reload()
    },
    setFilter (filter) {
      this.table.filters = filter
      this.$nextTick(function () { this.$refs.Table.reload() })
    },
    loading () {
      this.$emit('LOADING')
    },
    loaded () {
      this.$emit('LOADED')
    }
  }
}
</script>