<!-- 
  v1.0
  SLOT: 
    - action

  EVENT:
    - SUBMITTING (submitted data)
    - SUBMIT_FAIL (JSEND from API / Error Message)
    - SUBMIT_SUCCESS (JSEND)
    - SUBMIT_ERROR (JSEND)
    - NO_RESPONSE (JSEND)
 -->
<template>
  <div>
    <!-- __________________________________________________  MODIFY HERE __________________________________________________ -->
    <v-layout @keyup.enter="submit" wrap>
      <v-flex xs12 class='mb-2'>
        <v-text-field 
          type="password" 
          name="password" 
          append-icon="lock" 
          label="password baru"
          v-model="formData['password']" 
          :error-messages="transformedErrors['password']" 
          autocomplete="new-password"
          v-validate="'required'">
        </v-text-field>
      </v-flex>

      <v-flex xs12 class='mb-2'>
        <v-text-field 
          type="password" 
          name="password_confirmation" 
          append-icon="lock" 
          label="konfirmasi password"
          v-model="formData['password_confirmation']" 
          :error-messages="transformedErrors['password_confirmation']" 
          autocomplete="new-password"
          v-validate="'required|confirmed:password'">
        </v-text-field>
      </v-flex>
    </v-layout>
    <!-- __________________________________________________  END MODIFY HERE __________________________________________________ -->

    <!-- SAVE -->
    <v-layout row wrap>
      <v-flex xs12 class='mb-2'>
        <!-- __________________________________________________  MODIFY HERE __________________________________________________ -->
        <v-btn flat block class='primary' @click="submit" v-if="!isSubmitting">Perbarui Password</v-btn>
        <v-btn flat block class='grey lighten-2' v-else disabled><v-progress-circular indeterminate size='20' class='mr-3'></v-progress-circular> Mengirimkan data...</v-btn>
        <!-- __________________________________________________  END MODIFY HERE __________________________________________________ -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// ------------------------------ MODIFY HERE ----------------------------------
import GQL from '~/apollo/mutations/auth/ResetPasswordWithToken'
// ------------------------------ END MODIFY HERE ------------------------------

export default {
  apollo: {
    // ------------------------------ MODIFY HERE ----------------------------------
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  props: {
    token: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
    // ------------------------------ MODIFY HERE ----------------------------------
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  data () {
    return {
      errorMessages: {},
      isSubmitting: false,
      formData: {},
      // ------------------------------ MODIFY HERE ----------------------------------
      GQL: {
        data: 'ResetPasswordWithToken'
      }
      // ------------------------------ END MODIFY HERE ------------------------------
    }
  },
  mounted () {
    this.reset()
    // ------------------------------ MODIFY HERE ----------------------------------
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  computed: {
    // ------------------------------ MODIFY HERE ----------------------------------
    transformedInput: function () {
      return {
        input: {
          token: this.token,
          username: this.username,
          password: this.formData.password
        }
      }
    },
    transformedErrors: function () {
      let errors = {
        password: this.translate(this.errorMessages.password, {password: 'password baru'}),
        password_confirmation: this.translate(this.errorMessages.password_confirmation, {password_confirmation: 'konfirmasi password'})
      }
      return errors
    }
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  watch: {
    // ------------------------------ MODIFY HERE ----------------------------------
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  methods: {
    reset () {
      this.formData = {}
      this.errorMessages = {}
      // ------------------------------ MODIFY HERE ----------------------------------
      // ------------------------------ END MODIFY HERE ------------------------------
    },
    submit (e) {
      let vm = this

      if (vm.isSubmitting) {
        return false
      }

      vm.$validator.validateAll().then(function (isValid) {
        if (!isValid) {
          // Populate error messages
          vm.errorMessages = vm.$validator.errors.collect()
        } else {
          vm.$emit('SUBMITTING')
          vm.isSubmitting = true

          vm.$apollo.mutate({
            mutation: GQL,
            variables: vm.transformedInput
          }).then(function (result) {
            vm.$emit('SUBMIT_SUCCESS', result.data[vm.GQL.data])
            vm.isSubmitting = true
          }).catch(e => {
            if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
              e.graphQLErrors.forEach(function (error) {
                switch (error.message) {
                  case 'validation':
                    vm.errorMessages = error.validation
                    vm.$forceUpdate()
                    break

                  default:
                    vm.$emit('SUBMIT_FAIL', error.code)
                    break
                }
              })
            } else if (e.networkError.message) {
              vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
            }
            vm.isSubmitting = false
          })
        }
        e.preventDefault()
      })
    }
  }
}
</script>