<template>
  <div>
    <!-- b-row v-for="(price, index) in defaultHarga" align-v="center">
      <b-col cols="12" md="12">
        <span>Harga {{ index + 1 }}</span>
        <b-link class="text-danger float-right" @click="removePrice(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
        <hr class="mt-1 mb-2"/>
      </b-col>
      <b-col cols="12" md="11">
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Harga">
              <money v-model="price.harga" class="text-right form-control" data-vv-name="Harga" v-validate="'required'" :state="errors.has('Harga')"></money>
              <b-form-invalid-feedback :force-show="errors.has('Harga')">{{ errors.first('Harga') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Mulai">
              <b-form-input data-vv-name="Mulai" v-validate="'required'" v-model="price.mulai" :state="errors.has('Mulai')" type="tel" v-mask="'####/##/## ##:##:##'" masked="true"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Mulai')">{{ errors.first('Mulai') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="3">
            <b-form-group label="Satuan">
              <b-form-input data-vv-name="Satuan" v-validate="'required'" v-model="price.penetapan.satuan" :state="errors.has('Satuan')"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Satuan')">{{ errors.first('Satuan') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Bundle">
              <b-form-input type="number" data-vv-name="Bundle" v-validate="'required'" v-model="price.penetapan.bundle" :state="errors.has('Bundle')" :min="0"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Berlaku">
              <v-select v-model="price.berlaku" :options="['BALINDINOYO','KORAKA']" multiple></v-select>
              <b-form-invalid-feedback :force-show="errors.has('Berlaku')">{{ errors.first('Berlaku') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
      <div class="clearfix">&nbsp;</div>
      <div class="clearfix">&nbsp;</div>
    </b-row> -->

    <!-- <table class="table">
      <thead>
        <tr>
          <th>Nominal</th>
          <th>Mulai - Hingga</th>
          <th>Penetepan <br/>(jumlah/satuan)</th>
          <th>Berlaku</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(price, index) in defaultHarga">
          <td><b-form-input type="text" placeholder="" ></b-form-input></td>
          <td>
            <b-form-input type="text" placeholder="" ></b-form-input> -
            <b-form-input type="text" placeholder="" ></b-form-input>
          </td>
          <td>
            <b-form-input type="text" placeholder="" ></b-form-input> /
            <b-form-input type="text" placeholder="" ></b-form-input>
          </td>
          <td>
            <v-select v-model="price.berlaku" :options="['BALINDINOYO','KORAKA']" multiple></v-select>
            <b-form-invalid-feedback :force-show="errors.has('Berlaku')">{{ errors.first('Berlaku') }}</b-form-invalid-feedback>
          </td>
          <td>
            <b-link class="text-danger float-right" @click="removeOpsi(index)"><i class="fa fa-times-circle"></i> Hapus</b-link>
          </td>
        </tr>
      </tbody>
    </table> -->
    <!-- <b-modal id="modalHarga" title="Tambah Harga Baru" no-close-on-backdrop no-close-on-esc body-class="px-0" ok-title="Simpan" @ok="addHarga" @show="onShow"> -->
      <b-container class="px-4">
        <b-row>
          <b-col cols="12" md="4">
            <b-form-group label="Currency">
              <b-form-input data-vv-name="Currency" v-validate="'required|min:3'" :state="errors.has('Currency')" v-model="hargaTemp.harga.currency"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="8">
            <b-form-group label="Nominal">
              <b-form-input data-vv-name="Nominal" v-validate="'required|min:3'" :state="errors.has('Nominal')" v-model="hargaTemp.harga.nominal"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6">
            <b-form-group label="Mulai">
              <b-form-input data-vv-name="Mulai" v-model="hargaTemp.mulai"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Mulai')">{{ errors.first('Mulai') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-group label="Hingga">
              <b-form-input data-vv-name="Hingga" v-model="hargaTemp.hingga"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Hingga')">{{ errors.first('Hingga') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="7">
            <b-form-group label="Satuan">
              <b-form-input v-model="hargaTemp.penetapan.satuan"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Satuan')">{{ errors.first('Satuan') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="5">
            <b-form-group label="Bundle">
              <b-form-input v-model="hargaTemp.penetapan.bundle"></b-form-input>
              <b-form-invalid-feedback :force-show="errors.has('Bundle')">{{ errors.first('Bundle') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="12">
            <b-form-group label="Berlaku di toko/cabang">
              <v-select v-model="hargaTemp.berlaku" :options="['BALINDINOYO','KORAKA']" multiple></v-select>
              <b-form-invalid-feedback :force-show="errors.has('Berlaku')">{{ errors.first('Berlaku') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    <!-- </b-modal> -->
    <div class="clearfix">&nbsp;</div>
    <div slot="modal-footer" class="modal-footer">
        <b-btn variant="link" @click="hideModal">Cancel</b-btn>
        <b-btn variant="primary" @click="addHarga">Save Changes</b-btn>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    defaultHarga: {
      type: Array,
      default: function () {
        return []
      }
    },
    showModal: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      hargaTemp: {
        harga: {
          nominal: '30000',
          currency: 'IDR'
        },
        mulai: '22/11/2018',
        hingga: '29/11/2018',
        penetapan: {
          satuan: 'set',
          bundle: '1'
        },
        berlaku: []
      },
      harga: []
    }
  },
  computed: {
  },
  methods: {
    hideModal () {
      this.$emit('HIDE', true)
    },
    onShow (evt) {
      // this.clearHarga()
    },
    addHarga (evt) {
      if (!this.hargaTemp.harga) {
      } else {
        this.harga.push(this.hargaTemp)
        console.log(this.harga)
        this.$emit('HARGA', this.hargaTemp)
      }
    },
    removePrice (index) {
      this.hargaTemp.splice((index - 1), 1)
    },
    clearHarga () {
      this.hargaTemp.harga.nominal = ''
      this.hargaTemp.harga.currency = ''
      this.hargaTemp.mulai = ''
      this.hargaTemp.hingga = ''
      this.hargaTemp.penetapan.satuan = ''
      this.hargaTemp.penetapan.bundle = ''
      this.hargaTemp.berlaku = []
    }
  },
  beforeMount () {
    console.log('yes sblm mount')
  }
}
</script>
