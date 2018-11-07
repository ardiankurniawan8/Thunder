<template>
  <div class="container-fluid">
    <b-button variant="primary mb-3 px-3" :to="'/catalog/product'">Kembali</b-button>
    <b-card title="Tambah Katalog">
      <div class='card-text pt-4 box-shadow'>
        <FormCatalog class='m-t-lg'
          ref="FormCatalog"
          :productUPC="$route.query.upc"
          ownerID="BALIN"
          @SUCCESS="onUpdateCatalogSuccess" 
          @FAIL="onUpdateCatalogFail">
        </FormCatalog>
      </div>
    </b-card>
  </div>
</template>

<script>
import FormCatalog from '~/components/catalog/form'

export default {
  components: { FormCatalog },
  methods: {
    onUpdateCatalogSuccess (data) {
      console.log('sukses')
      // $nuxt.$router.replace('/dashboard')
    },
    onUpdateCatalogFail (data) {
      console.log('gagal')
      // $nuxt.$router.replace('/')
    }
  }
}
</script>