<template>
  <v-layout class="my-4" justify-space-around>
    <v-flex xs12 justify-center>
      <v-card flat class='b-1'>
        <v-card-title class='headline mb-2'>Ubah Password</v-card-title>

        <!-- Without -->
        <v-card-text v-if="(!$route.query.username || !$route.query.token) || show === 'error'">
          <div class='text-xs-center'><v-icon class='red--text display-3 my-4'>error</v-icon></div>
          <p>Link yang anda akses tidak valid. Untuk mendapatkan link mengubah password anda silahkan klik <nuxt-link to="/forget-password">di sini</nuxt-link></p>
        </v-card-text>

        <v-card-text v-else-if="show === 'form'">
          <p>Silahkan masukkan password baru anda ke dalam isian di bawah ini untuk mengganti password</p>
          <FormResetPasswordWithToken 
            ref="FormResetPasswordWithToken" 
            :username="$route.query.username"
            :token="$route.query.token"
            @SUBMIT_SUCCESS="SUBMIT_SUCCESS" 
            @SUBMIT_FAIL="SUBMIT_FAIL" 
            @SUBMIT_ERROR="SUBMIT_ERROR" 
          >
          </FormResetPasswordWithToken>
      </v-card-text>

      <v-card-text v-else>
        <p>Password anda telah berhasil diubah</p>
        <div class='text-xs-center'><v-icon class='green--text display-3 my-4'>check_circle</v-icon></div>
        <p>Untuk masuk ke dalam aplikasi ini silahkan login <nuxt-link to="/">di sini</nuxt-link></p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout wrap>
          <v-flex xs6><nuxt-link to="/">Login</nuxt-link></v-flex>
          <v-flex xs6 text-xs-right><nuxt-link to="/register">Daftar</nuxt-link></v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
      

    </v-flex>
  </v-layout>
</template>

<script>
import FormResetPasswordWithToken from '~/components/auth/form/reset_password_with_token'

export default {
  layout: 'auth',
  components: { FormResetPasswordWithToken },
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
        case 1001:
          this.$store.dispatch('ui/alert', {error: 'Proses pengubahan password gagal'})
          this.show = 'error'
          break
      }
    },
    SUBMIT_ERROR (data) {
      alert('Connection error')
    }
  }
}
</script>