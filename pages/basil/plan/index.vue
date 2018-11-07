<template>
  <div class="container-fluid">
    <b-row align-h="end">
    </b-row>
    <b-row align-h="between">
      <b-col>
        <b-button variant="primary mb-3 px-3" :to="'/basil/plan/add'">Tambah Baru</b-button>
      </b-col>
    </b-row>
    
    <b-card title="Plan">
      <div class='card-text pt-4'>
        <TableProduct 
          ref="TableProduct" 
          :headers="['upc','nama','list_harga']"
          :dataFilter="{
            owner: 'hello@thunderlab.id'
          }">
        </TableProduct>
      </div>
    </b-card>
  </div>
</template>

<script>
import TableProduct from '~/components/plan/product/table'

export default {
  components: { TableProduct },
  computed: {
    storeChoice: function () {
      return this.selectedStore.value
    }
  },
  methods: {
    check (val) {
      this.selectedStore = val

      setTimeout(() => {
        this.$refs.TableProduct.fetch()
      }, 10)
    // },
    // catalogClicked (catalogUPC) {
    //   this.$nuxt.$router.replace({path: '/catalog/product/' + catalogUPC, query: this.dataFilter})
    }
  }
}
</script>