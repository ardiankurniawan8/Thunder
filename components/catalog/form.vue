<template>
  <b-form @submit="onSubmit" validated>

    <div class="row">
      <div class="col-12 col-md-5">
        <b-form-group label="UPC">
          <b-form-input data-vv-name="UPC" v-validate="'required|min:3'" v-model="form.upc" :state="errors.has('UPC')" placeholder="Upc"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('UPC')">{{ errors.first('UPC') }}</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-12 col-md-7">
        <b-form-group label="Nama">
          <b-form-input data-vv-name="Nama" v-validate="'required|min:3'" v-model="form.nama" :state="errors.has('Nama')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Nama')">{{ errors.first('Nama') }}</b-form-invalid-feedback>
        </b-form-group>
      </div>
    </div>

    <b-row>
      <b-col cols="12" md="12">
        <b-form-group label="Thumbnail">
          <b-form-input data-vv-name="Thumbnail" v-validate="'required'" v-model="form.thumbnail" :state="errors.has('Thumbnail')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('Thumbnail')">{{ errors.first('Thumbnail') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- <b-form-group label="Thumbnail">
      <b-form-file v-model="form.thumbnail" :state="Boolean(form.thumbnail)" placeholder="Pilih gambar"></b-form-file>
      <b-form-invalid-feedback :force-show="errors.has('Thumbnail')">{{ errors.first('Thumbnail') }}</b-form-invalid-feedback>
    </b-form-group> -->

    <b-row>
      <b-col cols="12" md="12">
        <b-form-group label="Owner">
          <b-form-input data-vv-name="KodeOwner" v-validate="'required'" v-model="form.kode_owner" :state="errors.has('KodeOwner')"></b-form-input>
          <b-form-invalid-feedback :force-show="errors.has('KodeOwner')">{{ errors.first('KodeOwner') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>

    <div class="row">
      <div class="col-12 col-md-5">
        <b-form-group label="Kategori">
          <v-select multiple v-model="category" :options="listCategory" label="slug">
            <template slot="option" slot-scope="option">
              {{ option.slug.substring(option.slug.lastIndexOf(",") + 1) }}
            </template>
          </v-select>
          <b-form-invalid-feedback :force-show="errors.has('Kategori')">{{ errors.first('Kategori') }}</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="col-12 col-md-7">
        <b-form-group label="Samakan harga dengan toko lainnya ">
          <toggle-button :value="false"
            name="phone"
            class="mb-0"
            :labels="{checked: '&nbsp;&nbsp;Ya', unchecked: 'Tidak&nbsp;&nbsp;'}"
            :color="{checked: '#7DCE94', unchecked: '#6c757d'}"
            :width="80"
            :height="35" />
          <b-form-invalid-feedback :force-show="errors.has('Harga')">{{ errors.first('Harga') }}</b-form-invalid-feedback>
        </b-form-group>
      </div>
    </div>

    <div class="clearfix">&nbsp;</div>

    <p class="mb-0"><u><strong>Lain-lain</strong></u></p>
    <b-form-group label="Opsi">
      <b-form-input data-vv-name="Varian" v-validate="'required|min:3'" v-model="form.varian" :state="errors.has('Varian')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Varian')">{{ errors.first('Varian') }}</b-form-invalid-feedback>
    </b-form-group>

    <!-- <div class="clearfix">&nbsp;</div>

    <b-form-group label="Toko">
      <b-form-input data-vv-name="Toko" v-validate="'required|min:3'" v-model="form.toko" :state="errors.has('Toko')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Toko')">{{ errors.first('Toko') }}</b-form-invalid-feedback>
    </b-form-group>

    <div class="clearfix">&nbsp;</div>

    <b-form-group label="Promo">
      <b-form-input data-vv-name="Promo" v-validate="'required|min:3'" v-model="form.promo" :state="errors.has('Promo')"></b-form-input>
      <b-form-invalid-feedback :force-show="errors.has('Promo')">{{ errors.first('Promo') }}</b-form-invalid-feedback>
    </b-form-group> -->

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
</template>

<script>
import GrupQuery from '~/apollo/queries/query_group'
import AddCatalog from '~/apollo/mutations/AddCatalog'

export default {
  props: {
    defaultData: {
      type: Array,
      default: function () {
        return []
      }
    },
    ownerID: {
      type: String,
      required: true
    },
    productUPC: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      form: {
        upc: '',
        thumbnail: '',
        nama: '',
        kode_owner: ''
      },
      category: [],
      listCategory: [],
      isLoading: false
    }
  },
  mounted () {
    this.loadCategory()
  },
  computed: {
    transformInput: function () {
      return {
        input: {
          upc: this.formData.upc
        }
      }
    }
  },
  methods: {
    loadCategory () {
      let vm = this
      vm.listCategory = []
      this.$apollo.query(
        {
          query: GrupQuery,
          variables: {
            owner: vm.ownerID
          },
          fetchPolicy: 'no-cache'
        }
      ).then(function (result) {
        var newListCategory = []
        result.data.pengaturanGrup.forEach(function (i, k) {
          newListCategory[k] = {slug: i.slug, berlaku: ['BALINDINOYO']}
        })
        vm.listCategory = newListCategory
      })
    },
    onSubmit (e) {
      let vm = this

      e.preventDefault()

      vm.isLoading = true
      vm.$validator.validateAll()
      // console.log(vm.category)
      if (vm.errors.count() === 0) {
        vm.$apollo.mutate({
          mutation: AddCatalog,
          variables: {
            input: vm.form,
            tambahGrup: vm.category
          }
        }).then(function (res) {
          console.log(res)
          if (res.data.updateBarang) {
            vm.$emit('SUCCESS', res)
          } else {
            vm.$emit('FAIL', res)
          }
          vm.isLoading = false
        }).catch(function (e) {
          console.log(e)
          vm.$emit('FAIL', e)
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>