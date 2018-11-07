<template>
  <v-app class='grey lighten-3'>
    <!-- TOOLBAR -->
    <v-toolbar color="white" flat app fixed :clipped-left="$vuetify.breakpoint.lgAndUp">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <img src="/v2.png" height='40'>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items >
        <v-btn flat v-for="x in items" :key="x.href" class="hidden-xs-only" nuxt :to="`/dashboard/${$route.params.id}/${x.href}`">
          {{ x.text }}
        </v-btn>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- DRAWER -->
    <v-content>
      <v-container grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    mounted () {
      console.log()
    },
    data: () => ({
      dialog: false,
      drawer: true,
      snackbar: null,
      items: [
        { icon: 'dashboard', text: 'Dashboard', href: ``, scope: '*' },
        { icon: 'people', text: 'Siswa', href: `siswa`, scope: 'manage_customer' },
        { icon: 'money', text: 'Keuangan', href: `finance`, scope: 'manage_order' },
        { icon: 'money', text: 'HRD', href: `hrd`, scope: 'manage_order' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Settings',
          model: true,
          children: [
            { icon: 'developer_board', text: 'Products', href: '/dashboard/settings/products', scope: 'manage_product' },
            { icon: 'airport_shuttle', text: 'Supplier', href: '/dashboard/settings/suppliers', scope: 'manage_supplier' },
            { icon: 'people', text: 'Admin', href: '/dashboard/settings/admin', scope: 'manage_admin' }
          ]
        }
      ]
    })
  }
</script>