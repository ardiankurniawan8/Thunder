<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/basil/plan'">Kembali</b-button>
      </b-col>
    </b-row>
    <b-card title="Tambah Plan">
      <div class='card-text pt-4 box-shadow'>
        <b-form validated> <!-- @submit="onSubmit" --> 

          <div class="row">
            <p>{{this.table.data.upc}}</p>
            <div class="col-5 col-md-5">
              <b-form-group label="Kode">
                <b-form-input data-vv-name="kode" v-validate="'required|min:3'" v-model="form.kode" :state="errors.has('kode')" placeholder="Kode"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('kode')">{{ errors.first('kode') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-7">
              <b-form-group label="Nama">
                <b-form-input data-vv-name="Nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('Nama')" placeholder="Nama Plan"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('Nama')">{{ errors.first('Nama') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-5">
              <b-form-group prepend="IDR" label="Harga">
                <b-form-input min="0" step="1000" data-vv-name="harga" v-validate="'required|min:3'" v-model="form.harga" :state="errors.has('harga')" placeholder="Harga Plan" type="number"></b-form-input>
                <b-form-invalid-feedback :force-show="errors.has('harga')">{{ errors.first('harga') }}</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <b-row>
            <b-col cols="12">
              <slot name='action'></slot>
              <b-button type="submit" variant="primary" block :disabled="isLoading">
                <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Simpan</span>
                <span v-else>Simpan</span>
              </b-button>
            </b-col>
          </b-row>
          
        </b-form>
      </div>
    </b-card>

  </div>
</template>

<script>
import PlanQuery from '~/apollo/queries/query_plan'

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
      },
      form: {
        kode: '',
        nama: '',
        harga: ''
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
          query: PlanQuery,
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