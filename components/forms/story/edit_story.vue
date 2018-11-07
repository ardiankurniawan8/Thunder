<template>
  <div>
    <!-- Content -->
    <v-form>
      <v-layout>
        <v-flex xs8>
          <v-card-text>
            <h3>{{ 'By:' | capitalize }}</h3>
            <span v-if="record.user">{{ record.user.name }}</span>
            <span v-else>-</span>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="title" 
              label="title" 
              v-model="formData['title']"
              :error="errorMessages['title'] && errorMessages['title'].length > 0" 
              :error-messages="this.translate(errorMessages['title'])" 
              v-validate="'required'">
            </v-text-field>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="content" 
              label="content" 
              textarea
              auto-grow
              counter=20000
              cols="15"
              v-model="formData['content']"
              :error="errorMessages['content'] && errorMessages['content'].length > 0" 
              :error-messages="this.translate(errorMessages['content'])" 
              placeholder=" " 
              v-validate="'required'">
            </v-text-field>
          </v-card-text>
        </v-flex xs8>

        <v-flex xs4>
          <v-card-text>
            <h4>{{ 'Published At:' | capitalize }}</h4>
            <v-date-picker 
              name="published_at" 
              label="published at" 
              :min=min_publish
              :error="errorMessages['published_at'] && errorMessages['published_at'].length > 0" 
              :error-messages="this.translate(errorMessages['published_at'])" 
              v-model="formData['published_at']">
            </v-date-picker>
          </v-card-text>
          <slot name='action' v-if="!isSubmitting"></slot>
          <slot name='submit'>
            <v-btn flat class='primary' @click="submit" v-if="!isSubmitting">Simpan</v-btn>
            <span v-else><v-progress-circular indeterminate color="primary" size='20'></v-progress-circular> Mengirimkan data...</span>
          </slot>
        </v-flex xs4>
      </v-layout >
    </v-form >
  </div>
</template>


<script>
// ------------------------------ MODIFY HERE ----------------------------------
import GQL from '~/apollo/mutations/ReviewStory'
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
      default: {title: 'title', content: 'content'}
    },
    min_publish: {
      type: String,
      default: new Date().toISOString().split('T')[0]
    }
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  data () {
    var content = 'content'
    if (this.record.editted_content) {
      content = this.record.editted_content
    } else {
      content = this.record.content
    }

    return {
      errorMessages: {},
      isSubmitting: false,
      formData: {title: this.record.title, content: content},
      // ------------------------------ MODIFY HERE ----------------------------------
      GQL: {
        data: 'ReviewStory'
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
        id: this.$route.query.storiesId,
        input: {
          title: this.formData.title,
          editted_content: this.formData.content,
          published_at: this.formData.published_at
        }
      }
    },
    transformedErrors: function () {
      let errors = {
        title: this.translate(this.errorMessages.title, {title: 'title'}),
        content: this.translate(this.errorMessages.content, {content: 'content'}),
        published_at: this.translate(this.errorMessages.published_at, {published_at: 'published_at'})
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
      var content = 'content'
      if (this.record.editted_content) {
        content = this.record.editted_content
      } else {
        content = this.record.content
      }
      this.formData = {title: this.record.title, content: content}
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
                        case 'input.title':
                          for (i = 0; i < error.input['input.title'].length; i++) {
                            tidx = error.input['input.title'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'title')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['title'] = econt
                          break

                        case 'input.editted_content':
                          for (i = 0; i < error.input['input.editted_content'].length; i++) {
                            tidx = error.input['input.editted_content'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'content')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['content'] = econt
                          break

                        case 'input.published_at':
                          for (i = 0; i < error.input['input.published_at'].length; i++) {
                            tidx = error.input['input.published_at'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'published at')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['published_at'] = econt
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