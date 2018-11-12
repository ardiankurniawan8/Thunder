<template>
  <div class="container-fluid">
    <b-row align-h="between">
      <b-col cols="12" md="6">
        <b-button variant="primary mb-3 px-3" :to="'/basil/plan'">Kembali</b-button>
      </b-col>
    </b-row>
    <b-card title="Edit Plan">
      <div class='card-text pt-4 box-shadow'>
        <b-form @submit="onSubmit" validated> <!-- @submit="onSubmit" --> 

          <div class="row">
            <!-- <p>{{this.table.data}}</p> -->
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
          </div>
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
          <b-card title="Tambah harga baru">
            <div class="card-text box-shadow">
             <!--  <b-row v-if="listPrices.length > 0">
                <b-col cols="12">
                  <table class="table">
                    <tr>
                      <th class="text-dark border-top-0 border-bottom"><strong>Harga</strong></th>
                      <th class="text-dark border-top-0 border-bottom text-center"><strong>Mulai</strong> - <strong>Berakhir</strong></th>
                      <th class="text-dark border-top-0 border-bottom text-center"><strong>Satuan (Bundle)</strong></th>
                      <th class="text-dark border-top-0 border-bottom"><strong>Berlaku</strong></th>
                      <th class="text-dark border-top-0 border-bottom"></th>
                    </tr>
                    <tr v-for="(field, index) in listPrices" class="border-bottom">
                      <td class="border-0">{{field.harga.currency}} {{field.harga.nominal}}</td>
                      <td class="border-0 text-center">{{field.mulai}} - {{field.hingga}}</td>
                      <td class="border-0 text-center">{{field.penetapan.satuan}} ({{field.penetapan.bundle}})</td>
                      <td class="border-0">
                        <span v-for="(field2, index2) in field.berlaku">{{field2}}, </span>
                      </td>
                      <td class="border-0 text-right" style="width: 15%">
                        <b-button variant="link" size="sm" class="text-info" @click="removePrice(index)" disabled><i class="fa fa-edit"></i></b-button>
                        <b-button variant="link" size="sm" class="text-danger" @click="removePrice(index)"><i class="fa fa-times"></i></b-button>
                      </td>
                    </tr>
                  </table>
                </b-col>

              </b-row> -->
              <b-row class="pt-3">
                <b-col cols="12">
                  <b-link class="text-info" v-b-modal.modalHarga @click="showModalHarga"><i class="fa fa-plus mr-1"></i> Harga Baru</b-link>
                </b-col>
              </b-row>
            </div>
          </b-card>

          <b-row>
            <b-col cols="6">
              <slot name='action'></slot>
              <b-button type="submit" variant="primary" block :disabled="isLoading">
                <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Simpan</span>
                <span v-else>Simpan</span>
              </b-button>
            </b-col>
            <b-col cols="6">
            <slot name='action'></slot>
              <b-button type="button" @click="onDelete" variant="danger" block :disabled="isLoading">
                <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i>Hapus</span>
                <span v-else>Hapus</span>
              </b-button>
            </b-col>
          </b-row>
          
        </b-form>
      </div>
    </b-card>

  </div>
</template>

<script>
import EditPlanQuery from '~/apollo/queries/query_editplan'
import EditPlan from '~/apollo/mutations/EditPlan'

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
        nama: ''
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
          query: EditPlanQuery,
          variables: queryVar,
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        vm.table.data = result.data.pengaturanBarang[0]
        vm.form.kode = result.data.pengaturanBarang[0].upc
        vm.form.nama = result.data.pengaturanBarang[0].nama
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
    onSubmit (e) {
      let vm = this
      e.preventDefault()
      vm.isLoading = true
      if (vm.errors.count() === 0) {
        vm.$apollo.mutate({
          mutation: EditPlan,
          variables: vm.form
        }).then(function (res) {
          vm.$router.replace('/basil/plan')
          vm.isLoading = false
        }).catch(function (e) {
          vm.$emit('fail', e)
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>