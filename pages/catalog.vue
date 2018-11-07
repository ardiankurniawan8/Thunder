<template>
  <div>
    <!-- <b-navbar toggleable="md" type="light" class='border-bottom p-0 p-md-1' variant="white"> -->
      <!-- BRAND -->
      <!-- <b-navbar-brand href="/dashboard" class='pl-3 pr-1 mr-5'>Sales Katalog <i class="material-icons float-right">arrow_forward_ios</i></b-navbar-brand> -->

      <!-- <b-navbar-toggle target="nav_page_menu_collapse" class='border-0'></b-navbar-toggle> -->
      <!-- MENU -->
      <!-- <b-collapse is-nav id="nav_page_menu_collapse"> -->
        <!-- Left -->
        <!-- <b-navbar-nav class='px-3'>
          <b-nav-item href='/dashboard'>Tambah Baru</b-nav-item>  
        </b-navbar-nav>
      </b-collapse>
    </b-navbar> -->

    <b-container fluid class=''>
      <b-row>
        <b-col cols="12" md="3" xl="2" class="bg-white border-right border-bottom" style="height: 100vh">
          <b-nav vertical class="py-4">
            <b-nav-item :to="{ name: 'catalog-product' }" >Overview</b-nav-item>
            <b-nav-item :to="{ name: 'catalog-product' }" ><i class="fas fa-box  mr-2"></i> Produk</b-nav-item>
            <b-nav-item :to="{ name: 'catalog-promo' }" ><i class='fas fa-ribbon mr-2'></i> Promo</b-nav-item>
            <b-nav-item ><i class='fas fa-cog mr-2'></i> Settings</b-nav-item>
            <b-nav-item >
              <i class='fas fa-file mr-2'></i> Report
            </b-nav-item>
          </b-nav>
        </b-col>
        <b-col>
          <div class="clearfix">&nbsp;</div>
          <nuxt-child/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      selectedStore: {label: 'BALIN DINOYO', value: 'BALINDINOYO'},
      options: [
        {label: 'PHD SUHAT', value: 'PHDSUHAT'}, // manufaktur
        {label: 'PHD BLIMBING', value: 'PHDBLIMBING'}, // manufaktur
        {label: 'PHD MATOS', value: 'PHDMATOS'}, // manufaktur
        {label: 'BALIN DINOYO', value: 'BALINDINOYO'}, // retail
        {label: 'KORAKA DINOYO', value: 'KORAKADINOYO'}, // retail
        {label: 'TOKOPEDIA', value: 'TOKPED'}, // retail
        {label: 'PLUIT VILLAGE', value: 'PLUITVILLAGE'},
        {label: 'PLAZA INDONESIA', value: 'PLAZAINDONESIA'},
        {label: 'LIPPO BOGOR', value: 'LIPPOBOGOR'}
      ]
    }
  }
}
</script>