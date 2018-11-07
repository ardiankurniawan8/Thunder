<template>
  <v-layout class="my-4" justify-space-around>
    <v-flex xs12 justify-center>
      <v-card flat class='b-1'>
        <v-card-title class='headline mb-2'>Lupa Password</v-card-title>

        <v-card-text v-if="show === 'form'">
          <p>Silahkan masukkan email anda di bawah ini dan kami akan mengirimkan link untuk mengubah password ke email anda</p>
          <FormRequestResetPassword 
            ref="FormRequestResetPassword" 
            @SUBMIT_SUCCESS="SUBMIT_SUCCESS" 
            @SUBMIT_FAIL="SUBMIT_FAIL" 
            @SUBMIT_ERROR="SUBMIT_ERROR" 
          >
          </FormRequestResetPassword>
      </v-card-text>

      <v-card-text v-else>
        <p>Permintaan reset password telah kami terima</p>
        <div class='text-xs-center'><v-icon class='green--text display-3 my-4'>check_circle</v-icon></div>
        <p>Kami akan mengirimkan link untuk mengganti password anda ke email tersebut</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout wrap>
          <v-flex xs6><nuxt-link to="/">Login</nuxt-link></v-flex>
          <!-- <v-flex xs6 text-xs-right><nuxt-link to="/register">Daftar</nuxt-link></v-flex> -->
        </v-layout>
      </v-card-text>
    </v-card>
      

    </v-flex>
  </v-layout>
</template>

<script>
import FormRequestResetPassword from '~/components/auth/lupa_pasword/form'

export default {
  layout: 'auth',
  components: { FormRequestResetPassword },
  data () {
    return {
      show: 'form'
    }
  },
  asyncData ({store}) {
    store.dispatch('authentication/logout')
  },
  methods: {
    SUBMIT_SUCCESS (data) {
      this.show = 'message'
      this.$store.dispatch('ui/alert', {})
    },
    SUBMIT_FAIL (data) {
      switch (data) {
        case 404:
          this.$store.dispatch('ui/alert', {error: 'Email yang anda masukkan belum terdaftar'})
          break
      }
    },
    SUBMIT_ERROR (data) {
      alert('Connection error')
    }
  }
}
</script>