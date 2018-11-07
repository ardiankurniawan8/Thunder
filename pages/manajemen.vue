<template>
  <div>
    <b-navbar toggleable="md" type="light" class='border-bottom p-0 p-md-1 navbar-second' variant="white">

      <!-- BRAND -->
      <b-navbar-brand to="/catalog" class='pl-3 mr-5'>Manajemen <i class='fas fa-chevron-right'></i></b-navbar-brand>

      <b-navbar-toggle target="nav_page_menu_collapse" class='border-0'></b-navbar-toggle>
      <!-- MENU -->
      <b-collapse is-nav id="nav_page_menu_collapse">
        <!-- Left -->
        <b-navbar-nav class='px-3'>
          <b-nav-item to='/catalog/add'>Toko</b-nav-item>
          <b-nav-item to='/catalog/add'>Admin</b-nav-item>
          <b-nav-item to='/catalog/add'>Barang</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>

    <b-container class='mt-5'>
      <b-row>
        <b-col>
          <nuxt-child/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>