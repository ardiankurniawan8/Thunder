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
          <v-select v-if=options
            name="attendee" 
            label="attendee" 
            :items="options"
            v-model="formData['attendee']"
            :error="errorMessages['attendee'] && errorMessages['attendee'].length > 0" 
            :error-messages="this.translate(errorMessages['attendee'])" 
            placeholder=" " 
            v-validate="'required'">
          </v-select>

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
import MemberQuery from '~/apollo/queries/query_member'

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
      transformedData: {},
      options: [{}]
      // ------------------------------ MODIFY HERE ----------------------------------
      // ------------------------------ END MODIFY HERE ------------------------------
    }
  },
  mounted () {
    // ------------------------------ MODIFY HERE ----------------------------------
    this.fetch()
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
    fetch () {
      let vm = this

      // -----------------------------------------------------------------------------------------------------------------------
      // TO MODIFY
      // -----------------------------------------------------------------------------------------------------------------------

      this.$apollo.query(
        {
          query: MemberQuery,
          fetchPolicy: 'no-cache'
        }
        // -----------------------------------------------------------------------------------------------------------------------
        // END TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------
      ).then(function (result) {
        // -----------------------------------------------------------------------------------------------------------------------
        // TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------
        var isi = result.data.Member
        var opsi = []
        var i = 0
        for (i = 0; i < isi.length; i++) {
          opsi[i] = {id: isi[i]['username'], text: isi[i]['name']}
        }
        vm.options = opsi
        // -----------------------------------------------------------------------------------------------------------------------
        // END TO MODIFY
        // -----------------------------------------------------------------------------------------------------------------------
        vm.table.isLoading = false
      }).catch(e => {
        if (e.graphQLErrors && Array.isArray(e.graphQLErrors) && e.graphQLErrors.length) {
          e.graphQLErrors.forEach(function (error) {
            switch (error.code) {
              case 401:
                vm.$nuxt.$router.replace({ path: '/' })
                break
            }
            vm.$nuxt.$router.replace({ path: '/' })
          })
        }
      })
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
            addAttendance: [{user_id: vm.formData['attendee']}]
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
                        case 'addAttendance.0.user_id':
                          for (i = 0; i < error.input['addAttendance.0.user_id'].length; i++) {
                            tidx = error.input['addAttendance.0.user_id'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'attendee')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['attendee'] = econt
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