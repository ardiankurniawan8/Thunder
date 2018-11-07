<template>
  <div class="container-fluid">
    <b-button variant="primary mb-3 px-3" :to="'/basil/member'">Kembali</b-button>
    <b-card title="Tambah Plan">
      <div class='card-text pt-4 box-shadow'>
        <FormMember class='m-t-lg'
          ref="FormMember"
          :productUPC="$route.query.upc"
          ownerID="BALIN"
          @SUCCESS="onUpdateCatalogSuccess" 
          @FAIL="onUpdateCatalogFail">
        </FormMember>
      </div>
    </b-card>
  </div>
</template>

<script>
import FormMember from '~/components/member/form'

export default {
  components: { FormMember }
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