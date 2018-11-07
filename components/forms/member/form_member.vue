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
    <v-form >
      <v-layout wrap>

        <!-- NAME -->
        <v-flex xs12>
          <v-text-field 
            type="text" 
            name="name" 
            label="name" 
            v-model="formData['name']"
            :error="errorMessages['name'] && errorMessages['name'].length > 0" 
            :error-messages="this.translate(errorMessages['name'])" 
            placeholder=" " 
            v-validate="'required'">
          </v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field 
            type="text" 
            name="username" 
            label="email" 
            v-model="formData['username']"
            :error="errorMessages['username'] && errorMessages['username'].length > 0" 
            :error-messages="this.translate(errorMessages['username'])" 
            placeholder=" " 
            v-validate="'required'">
          </v-text-field>
        </v-flex>

      </v-layout>
    </v-form>
    <!-- __________________________________________________  END MODIFY HERE __________________________________________________ -->

    <!-- SAVE -->
    <v-layout row wrap>
      <v-flex xs12 class='text-xs-right mt-4'>
        <slot name='action' v-if="!isSubmitting"></slot>
        <slot name='submit'>
          <v-btn flat class='primary' @click="submit" v-if="!isSubmitting">Simpan</v-btn>
          <span v-else><v-progress-circular indeterminate color="primary" size='20'></v-progress-circular> Mengirimkan data...</span>
        </slot>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
import AddMember from '~/apollo/mutations/AddMember'

export default {
  middleware: ['auth', 'session_lifetime'],
  apollo: {
    $client: 'customer'
  },
  data () {
    return {
      errorMessages: {},
      isSubmitting: false,
      formData: {},
      transformedData: {}
      // ------------------------------ MODIFY HERE ----------------------------------
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
          vm.errorMessages = {}
          vm.errorMessages = vm.$validator.errors.collect()
        } else {
          vm.$emit('SUBMITTING')
          vm.isSubmitting = true
          vm.errorMessages = {}

          // ------------------------------ MODIFY HERE ----------------------------------
          // Transform data
          vm.transformedData = {
            input: {name: vm.formData['name'], username: vm.formData['username'], password: 'eedefault'}
          }

          // ------------------------------ END MODIFY HERE ----------------------------------

          vm.$apollo.mutate({
            // ------------------------------ MODIFY HERE ----------------------------------
            mutation: AddMember,
            // ------------------------------ END MODIFY HERE ------------------------------
            variables: vm.transformedData
          }).then(function (result) {
            vm.$emit('SUBMIT_SUCCESS', result.data.AddMember)
            vm.isSubmitting = false
            vm.$nuxt._router.replace('/member/all')
          }).catch(e => {
            if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
              e.graphQLErrors.forEach(function (error) {
                switch (error.code) {
                  case 401:
                    vm.$nuxt.$router.replace({ path: '/' })
                    break
                  case 400:
                    Object.keys(error.input).forEach(function (item, index) {
                      var tidx = ''
                      var econt = ''
                      var i = 0
                      var j = 0

                      switch (item) {
                        // ------------------------------ MODIFY HERE ----------------------------------
                        case 'input.name':
                          for (i = 0; i < error.input['input.name'].length; i++) {
                            tidx = error.input['input.name'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'name')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['name'] = econt
                          break

                        case 'username':
                          for (i = 0; i < error.input['username'].length; i++) {
                            tidx = error.input['username'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'email')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['username'] = econt
                          break
                          // ------------------------------ END MODIFY HERE ------------------------------
                      }
                    })
                    vm.$forceUpdate()
                    break

                  default:
                    vm.$emit('SUBMIT_FAIL', error.code)
                    vm.isSubmitting = false
                    break
                }
              })
            } else if (e.networkError.message) {
              vm.$emit('SUBMIT_ERROR', 'Fail to connect to server')
              vm.isSubmitting = false
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