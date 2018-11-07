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
        <v-flex xs12 class="inputArea" v-for="input in inputs" :key="input.id">
          <v-card-text>
            Slide {{ (input.id*1 +1) }}
            <v-text-field 
              type="text" 
              name="image_url" 
              label="Image Url" 
              v-model="input.image_url"
              :error="errorMessages['image_url' + input.id] && errorMessages['image_url' + input.id].length > 0" 
              :error-messages="errorMessages['image_url' + input.id]" 
              >
            </v-text-field>

            <v-text-field 
              type="text" 
              name="link_url" 
              label="Link Url" 
              v-model="input.link_url"
              :error="errorMessages['link_url' + input.id] && errorMessages['link_url' + input.id].length > 0" 
              :error-messages="errorMessages['link_url' + input.id]" 
              >
            </v-text-field>
          </v-card-text>
        </v-flex>

        <v-card-text>
          <a @click="addInput">Add Slider</a>
        </v-card-text>

        <v-card-text style="text-align:right">
          <slot name='action' v-if="!isSubmitting"></slot>
          <slot name='submit'>
            <v-btn flat class='primary' @click="submit" v-if="!isSubmitting">Simpan</v-btn>
            <span v-else><v-progress-circular indeterminate color="primary" size='20'></v-progress-circular> Mengirimkan data...</span>
          </slot>
        </v-card-text>

      </v-layout>
    </v-form>

  </div>
</template>

<script>
import GQL from '~/apollo/mutations/StoreSlider'

export default {
  apollo: {
    $client: 'customer'
  },
  props: {
    // ------------------------------ MODIFY HERE ----------------------------------
    defaultInput: {
      type: Array,
      default: function () { return [{id: 0, image_url: '', link_url: ''}] }
    }
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  data () {
    return {
      errorMessages: {},
      isSubmitting: false,
      counter: 0,
      inputs: []
      // ------------------------------ MODIFY HERE ----------------------------------
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
      var counti = 0
      var countj = 0
      var newIm = []
      for (countj = 0; countj < this.inputs.length; countj++) {
        if (this.inputs[countj]['image_url'] === '' && this.inputs[countj]['link_url'] === '') {
        } else {
          newIm[counti] = {id: counti, image_url: this.inputs[countj]['image_url'], link_url: this.inputs[countj]['link_url']}
          counti++
        }
      }

      return {
        input: newIm
      }
    },
    transformedErrors: function () {
      let errors = {
        image_url: this.translate(this.errorMessages.image_url, {image_url: 'image_url'}),
        link_url: this.translate(this.errorMessages.link_url, {link_url: 'link_url'})
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
      var i
      // ------------------------------ MODIFY HERE ----------------------------------
      for (i = 0; i < this.defaultInput.length; i++) {
        this.inputs.push({id: i, image_url: this.defaultInput[i]['image_url'], link_url: this.defaultInput[i]['link_url']})
      }
      this.counter = this.inputs.length - 1
      // ------------------------------ END MODIFY HERE ------------------------------
    },
    addInput () {
      this.inputs.push({id: `${++this.counter}`, image_url: '', link_url: ''})
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
                      var idx = 0
                      var i = 0
                      var j = 0

                      for (idx = 0; idx < vm.inputs.length; idx++) {
                        switch (item) {
                          // ------------------------------ MODIFY HERE ----------------------------------
                          case 'input.' + idx + '.image_url':
                            for (i = 0; i < error.input['input.' + idx + '.image_url'].length; i++) {
                              tidx = error.input['input.' + idx + '.image_url'][i].split('|')

                              if (process.env.errors_lib[tidx[0]]) {
                                econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'image url')

                                for (j = 1; j < tidx.length; j++) {
                                  econt = econt.replace(':variable' + j, tidx[j])
                                }

                                econt = econt + ', '
                              }
                            }

                            vm.errorMessages['image_url' + idx] = econt
                            break

                          case 'input.' + idx + '.link_url':
                            for (i = 0; i < error.input['input.' + idx + '.link_url'].length; i++) {
                              tidx = error.input['input.' + idx + '.link_url'][i].split('|')

                              if (process.env.errors_lib[tidx[0]]) {
                                econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'link url')

                                for (j = 1; j < tidx.length; j++) {
                                  econt = econt.replace(':variable' + j, tidx[j])
                                }

                                econt = econt + ', '
                              }
                            }

                            vm.errorMessages['link_url' + idx] = econt
                            break
                            // ------------------------------ END MODIFY HERE ------------------------------
                        }
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