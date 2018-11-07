<template>
  <div class="container-fluid">
    <b-button variant="primary mb-3 px-3" :to="'/basil/plan'">Kembali</b-button>
    <b-card title="Tambah Plan">
      <div class='card-text pt-4 box-shadow'>
        <FormPlan class='m-t-lg'
          ref="FormPlan"
          :productUPC="$route.query.upc"
          ownerID="BALIN"
          @SUCCESS="onUpdateCatalogSuccess" 
          @FAIL="onUpdateCatalogFail">
        </FormPlan>
      </div>
    </b-card>
  </div>
</template>

<script>
import FormPlan from '~/components/plan/form'

export default {
  components: { FormPlan }
  // methods: {
  //   onUpdateCatalogSuccess (data) {
  //     console.log('sukses')
  //     // $nuxt.$router.replace('/dashboard')
  //   },
  //   onUpdateCatalogFail (data) {
  //     console.log('gagal')
  //     // $nuxt.$router.replace('/')
  //   }
  // }
}
</script>