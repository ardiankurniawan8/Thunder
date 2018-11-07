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
            label="At"
            :min=min_publish
            type="date"
            v-model="formData['at']"
            :error="errorMessages['at'] && errorMessages['at'].length > 0" 
            :error-messages="this.translate(errorMessages['at'])" 
            placeholder=" " 
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <div class="clearfix">&nbsp;</div>
        <v-flex xs12>
          <v-text-field 
            type="text" 
            name="content" 
            label="description" 
            textarea
            auto-grow
            counter=20000
            cols="15"
            v-model="formData['description']"
            :error="errorMessages['description'] && errorMessages['description'].length > 0" 
            :error-messages="this.translate(errorMessages['description'])" 
            placeholder=" " 
            v-validate="'required'">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <div class='text-xs-right mt-4'>
            <slot name='action' v-if="!isSubmitting"></slot>
            <slot name='submit'>
              <v-btn flat class='primary' @click="submit" v-if="!isSubmitting">Simpan</v-btn>
              <span v-else><v-progress-circular indeterminate color="primary" size='20'></v-progress-circular> Mengirimkan data...</span>
            </slot>
          </div>
        </v-flex>
      </v-layout>
    </v-form>

  </div>
</template>

<script>
import StoreEvent from '~/apollo/mutations/StoreEvent'

export default {
  apollo: {
    $client: 'customer'
  },
  data () {
    return {
      min_publish: new Date().toISOString().split('T')[0],
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
            id: vm.$route.query.eventsId,
            addSchedule: [{at: vm.formData['at'], description: vm.formData['description']}]
          }

          // ------------------------------ END MODIFY HERE ----------------------------------

          vm.$apollo.mutate({
            // ------------------------------ MODIFY HERE ----------------------------------
            mutation: StoreEvent,
            // ------------------------------ END MODIFY HERE ------------------------------
            variables: vm.transformedData
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
                        case 'addSchedule.0.description':
                          for (i = 0; i < error.input['addSchedule.0.description'].length; i++) {
                            tidx = error.input['addSchedule.0.description'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'description')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['description'] = econt
                          break

                        case 'addSchedule.0.at':
                          for (i = 0; i < error.input['addSchedule.0.at'].length; i++) {
                            tidx = error.input['addSchedule.0.at'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'at')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }
                          vm.errorMessages['at'] = econt
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