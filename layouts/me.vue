<template>
	<v-app>
    <!-- MESSAGE -->
    <v-snackbar top vertical color="success" v-model="show_alert">
      {{ this.$store.state.ui.alerts.success.join('<br>') }}
      <v-btn flat color="pink" @click.native="$store.dispatch('ui/clearAlert')">Close</v-btn>
    </v-snackbar>

    <!-- CONTAINER -->
    <v-container class="py-5" grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
          <nuxt-link to='/'><img src="/l.png"></nuxt-link>
        </v-flex>
      </v-layout>
      <nuxt/>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        show_alert: false
      }
    }
  }
</script>