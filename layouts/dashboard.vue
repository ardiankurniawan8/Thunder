<template>
  <div>
    <!-- NAVBAR -->
    <b-navbar toggleable="md" type="light" class='border-bottom p-0 p-md-1' variant="white">

      <!-- BRAND -->
      <b-navbar-brand :to="'/dashboard'">
        <img src="/l.png" height="40" class='pl-3'>
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" class='border-0'></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <!-- Left -->
        <b-navbar-nav class='px-3 mt-3 mt-md-0'>
          <b-nav-item :to="'/dashboard'">Dashboard</b-nav-item>
          <b-nav-item :to="'/basil'">Basil</b-nav-item>
         <!--  <b-nav-item :to="'/catalog'">Sales Katalog</b-nav-item>
          <b-nav-item :to="'/transaction'">Sales Transaksi</b-nav-item>
          <b-nav-item :to="'/inventory'">Inventory</b-nav-item>  
          <b-nav-item :to="'/manajemen'">Manajemen</b-nav-item>  
          <b-nav-item :to="'/audit'">Audit</b-nav-item>   -->
        </b-navbar-nav>

        <!-- Right -->
        <b-navbar-nav class='ml-auto px-3'>
          <b-nav-item><i class="material-icons">apps</i> </b-nav-item>
          <b-nav-item-dropdown right text="My Account">
            <b-dropdown-item :to="'dashboard/my-account/update-profile'">Update Profile</b-dropdown-item>
            <b-dropdown-item :to="'dashboard/my-account/update-password'">Update Password</b-dropdown-item>
            <b-dropdown-item :to="'/'">Logout</b-dropdown-item>
          </b-nav-item-dropdown>  
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- NUXT -->
    <nuxt/>
  </div>
</template>

<style>
body {
  border-top:2px solid #28bc83;
}
</style>