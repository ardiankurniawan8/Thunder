<template>
  <div>
    <!-- Content -->
    <v-form>
      <v-layout>
        <v-flex xs8>
          <v-card-text>
            <h3>{{ 'Setting About:' | capitalize }}</h3>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="ee_history" 
              label="history" 
              textarea
              auto-grow
              counter=20000
              cols="15"
              v-model="formData['ee_history']"
              :error="errorMessages['ee_history'] && errorMessages['ee_history'].length > 0" 
              :error-messages="this.translate(errorMessages['ee_history'])" 
              placeholder=" " 
              v-validate="'required'">
            </v-text-field>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="FLYBIRD_why" 
              label="why" 
              textarea
              auto-grow
              counter=20000
              cols="15"
              v-model="formData['FLYBIRD_why']"
              :error="errorMessages['FLYBIRD_why'] && errorMessages['FLYBIRD_why'].length > 0" 
              :error-messages="this.translate(errorMessages['FLYBIRD_why'])" 
              placeholder=" " 
              v-validate="'required'">
            </v-text-field>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="FLYBIRD_about" 
              label="about" 
              textarea
              auto-grow
              counter=20000
              cols="15"
              v-model="formData['FLYBIRD_about']"
              :error="errorMessages['FLYBIRD_about'] && errorMessages['FLYBIRD_about'].length > 0" 
              :error-messages="this.translate(errorMessages['FLYBIRD_about'])" 
              placeholder=" " 
              v-validate="'required'">
            </v-text-field>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="contact_us" 
              label="contact" 
              textarea
              auto-grow
              counter=20000
              cols="15"
              v-model="formData['contact_us']"
              :error="errorMessages['contact_us'] && errorMessages['contact_us'].length > 0" 
              :error-messages="this.translate(errorMessages['contact_us'])" 
              placeholder=" " 
              v-validate="'required'">
            </v-text-field>
          </v-card-text>

          <v-card-text style="text-align:right">
            <slot name='action' v-if="!isSubmitting"></slot>
            <slot name='submit'>
              <v-btn flat class='primary' @click="submit" v-if="!isSubmitting">Simpan</v-btn>
              <span v-else><v-progress-circular indeterminate color="primary" size='20'></v-progress-circular> Mengirimkan data...</span>
            </slot>
          </v-card-text>
        </v-flex xs8>
      </v-layout >
    </v-form >
  </div>
</template>


<script>
// ------------------------------ MODIFY HERE ----------------------------------
import GQL from '~/apollo/mutations/StoreAbout'
// ------------------------------ END MODIFY HERE ------------------------------

export default {
  middleware: ['auth', 'session_lifetime'],
  apollo: {
    // ------------------------------ MODIFY HERE ----------------------------------
    $client: 'customer'
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  props: {
    // ------------------------------ MODIFY HERE ----------------------------------
    record: {
      type: Object,
      default: {ee_history: 'ee_history', FLYBIRD_why: 'FLYBIRD_why', FLYBIRD_about: 'FLYBIRD_about', contact_us: 'contact_us'}
    },
    min_publish: {
      type: String,
      default: new Date().toISOString().split('T')[0]
    }
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  data () {
    return {
      errorMessages: {},
      isSubmitting: false,
      formData: {ee_history: this.record.ee_history, FLYBIRD_why: this.record.FLYBIRD_why, FLYBIRD_about: this.record.FLYBIRD_about, contact_us: this.record.contact_us},
      // ------------------------------ MODIFY HERE ----------------------------------
      GQL: {
        data: 'UpdateAbout'
      }
      // ------------------------------ END MODIFY HERE ------------------------------
    }
  },
  mounted () {
    // ------------------------------ MODIFY HERE ----------------------------------
    this.reset()
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  computed: {
    // ------------------------------ MODIFY HERE ----------------------------------
    transformedInput: function () {
      return {
        input: {
          ee_history: this.formData.ee_history,
          FLYBIRD_why: this.formData.FLYBIRD_why,
          FLYBIRD_about: this.formData.FLYBIRD_about,
          contact_us: this.formData.contact_us
        }
      }
    },
    transformedErrors: function () {
      let errors = {
        ee_history: this.translate(this.errorMessages.ee_history, {ee_history: 'ee_history'}),
        FLYBIRD_why: this.translate(this.errorMessages.FLYBIRD_why, {FLYBIRD_why: 'FLYBIRD_why'}),
        FLYBIRD_about: this.translate(this.errorMessages.FLYBIRD_about, {FLYBIRD_about: 'FLYBIRD_about'}),
        contact_us: this.translate(this.errorMessages.contact_us, {contact_us: 'contact_us'})
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
      this.formData = {ee_history: this.record.ee_history, FLYBIRD_why: this.record.FLYBIRD_why, FLYBIRD_about: this.record.FLYBIRD_about, contact_us: this.record.contact_us}
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
            window.location.reload(true)
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
                        case 'input.ee_history':
                          for (i = 0; i < error.input['input.ee_history'].length; i++) {
                            tidx = error.input['input.ee_history'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'history')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['ee_history'] = econt
                          break

                        case 'input.FLYBIRD_why':
                          for (i = 0; i < error.input['input.FLYBIRD_why'].length; i++) {
                            tidx = error.input['input.FLYBIRD_why'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'why')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['FLYBIRD_why'] = econt
                          break

                        case 'input.FLYBIRD_about':
                          for (i = 0; i < error.input['input.FLYBIRD_about'].length; i++) {
                            tidx = error.input['input.FLYBIRD_about'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'about')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['FLYBIRD_about'] = econt
                          break

                        case 'input.contact_us':
                          for (i = 0; i < error.input['input.contact_us'].length; i++) {
                            tidx = error.input['input.contact_us'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'about')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['contact_us'] = econt
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