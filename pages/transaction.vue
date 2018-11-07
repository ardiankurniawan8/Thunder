<template>
  <div>
    <b-container fluid class='mt-5'>
      <b-row>
				<b-col cols="12" md="3" xl="2">
          <b-nav vertical>
            <b-nav-item :to="'/transaction/index'">Transaksi</b-nav-item>
            <b-nav-item :to="'/'">Settings</b-nav-item>
            <b-nav-item :to="'/'">Report</b-nav-item>
          </b-nav>
        </b-col>
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