<template>
  <v-layout class="my-4" justify-space-around>
    <v-flex xs12 justify-center>
      <v-card flat class='b-1'>
        <v-card-title class='headline mb-2' v-if="show === 'form'">Daftar</v-card-title>
        <v-card-title class='headline mb-2' v-else>Pendaftaran Berhasil</v-card-title>

        <v-card-text v-if="show === 'form'">
          <FormRegister 
            ref="FormRegister" 
            @SUBMIT_SUCCESS="SUBMIT_SUCCESS" 
            @SUBMIT_FAIL="SUBMIT_FAIL" 
            @SUBMIT_ERROR="SUBMIT_ERROR" 
          >
          </FormRegister>
      </v-card-text>

      <v-card-text v-else>
        <p>Selamat! Akun anda telah berhasil didaftarkan</p>
        <div class='text-xs-center'><v-icon class='green--text display-3 my-4'>check_circle</v-icon></div>
        <p>Kami akan mengirimkan link untuk memverifikasi akun anda. Silahkan ikuti instruksi dalam email tersebut untuk memverifikasi akun anda</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <v-layout wrap>
          <v-flex xs6>Sudah memiliki akun ? <nuxt-link to="/">Login</nuxt-link></v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
      

    </v-flex>
  </v-layout>
</template>

<script>
import FormRegister from '~/components/auth/register/form'

export default {
  layout: 'auth',
  components: { FormRegister },
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
      this.$store.dispatch('ui/alert', {error: 'Email yang anda masukkan belum terdaftar'})
    },
    SUBMIT_ERROR (data) {
      alert('Connection error')
    }
  }
}
</script>