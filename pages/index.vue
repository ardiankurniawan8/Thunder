<template>
  <div>
    <h1 class='text-uppercase'>
      Login
    </h1>
    
    <p>Silakan masukkan email dan password anda</p>
    
    <LoginForm class='m-t-lg' @success="onLoginSuccess" @fail="onLoginFail"></LoginForm>
    
    <p class='mt-2'>
      <nuxt-link to="/register">Register</nuxt-link> &nbsp;·&nbsp;
      <nuxt-link to="/forget-password">Lupa Password</nuxt-link>
    </p>
  </div>
</template>

<script>
import LoginForm from '~/components/auth/login/form'
export default {
  components: { LoginForm },
  methods: {
    onLoginSuccess (data) {
      this.$store.dispatch('authentication/login', {user: data.user, token: data.token})
    },
    onLoginFail (data) {
      this.$router.replace('/register')
    }
  }
}
</script>