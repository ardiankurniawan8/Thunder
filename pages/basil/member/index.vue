<template>
  <div class="container-fluid">
    <b-row align-h="end">
    </b-row>
    <b-row align-h="between">
      <b-col>
        <b-button variant="primary mb-3 px-3" :to="'/basil/member/add'">Tambah Baru</b-button>
      </b-col>
    </b-row>
    
    <b-card title="Member">
      <div class='card-text pt-4'>
        <TableProduct 
          ref="TableProduct" 
          :headers="['upc', 'thumbnail', 'nama']"
          :dataFilter="{
            owner: 'BALIN'
          }">
        </TableProduct>
      </div>
    </b-card>
  </div>
</template>

<script>
import TableProduct from '~/components/catalog/product/table'

export default {
  components: { TableProduct
  }
}
</script>