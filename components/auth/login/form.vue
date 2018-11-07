<template>
  <b-form @submit="onSubmit" validated>

    <b-form-group>
      <b-form-input novalidate type='email' required v-validate placeholder="email" v-model="form.username" name="email"></b-form-input>
    </b-form-group>

    <b-form-group>
      <b-form-input novalidate type='password' required v-validate placeholder="password" v-model="form.password" name="password"></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary" block :disabled="isLoading">
      <span v-if="isLoading"><i class="fas fa-spinner fa-spin"></i> Login</span>
      <span v-else>Login</span>
    </b-button>

  </b-form>
</template>

<script>
import authenticate from '~/apollo/gql/authentication/Authenticate'

export default {
  apollo: {
  },
  mounted () {
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (e) {
      let vm = this
      e.preventDefault()
      vm.isLoading = true
      if (vm.errors.count() === 0) {
        vm.$apollo.mutate({
          mutation: authenticate,
          variables: vm.form
        }).then(function (res) {
          if (res.data.authenticate) {
            vm.$emit('success', res)
          } else {
            vm.$emit('fail', res)
          }
          vm.isLoading = false
        }).catch(function (e) {
          vm.$emit('fail', e)
          vm.isLoading = false
        })
      } else {
        vm.isLoading = false
      }
    }
  }
}
</script>