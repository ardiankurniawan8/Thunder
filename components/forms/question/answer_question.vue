<template>
  <div>
    <!-- Content -->
    <v-form>
      <v-layout>
        <v-flex xs8>
          <v-card-text>
            <h3>{{ 'From:' | capitalize }}</h3>
            <span v-if="record.user">{{ record.user.name }}</span>
            <span v-else>-</span>
          </v-card-text>

          <v-card-text>
            <h5>{{ 'Question:' | capitalize }}</h5>
            <span v-if="record.question">{{ record.question }}</span>
            <span v-else>-</span>
          </v-card-text>

          <v-card-text>
            <h5>{{ 'Description:' | capitalize }}</h5>
            <span v-if="record.description">{{ record.description }}</span>
            <span v-else>-</span>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="category" 
              label="category" 
              v-model="formData['category']"
              :error="errorMessages['category'] && errorMessages['category'].length > 0" 
              :error-messages="this.translate(errorMessages['category'])"
              v-validate="'required'">
            </v-text-field>
          </v-card-text>

          <v-card-text>
            <v-text-field 
              type="text" 
              name="answer" 
              label="answer" 
              textarea
              auto-grow
              counter=5000
              cols="15"
              v-model="formData['answer']"
              :error="errorMessages['answer'] && errorMessages['answer'].length > 0" 
              :error-messages="this.translate(errorMessages['answer'])"
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
          <v-card-text>
          </v-card-text>
        </v-flex xs4>
      </v-layout >
    </v-form >
  </div>
</template>


<script>
// ------------------------------ MODIFY HERE ----------------------------------
import GQL from '~/apollo/mutations/AnswerQuestion'
// ------------------------------ END MODIFY HERE ------------------------------

export default {
  apollo: {
    // ------------------------------ MODIFY HERE ----------------------------------
    $client: 'customer'
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  props: {
    // ------------------------------ MODIFY HERE ----------------------------------
    record: {
      type: Object,
      default: {answer: 'answer'}
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
      formData: {answer: this.record.answer, category: this.record.category},
      // ------------------------------ MODIFY HERE ----------------------------------
      GQL: {
        data: 'AnswerQuestion'
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
        id: this.$route.query.questionsId,
        input: {
          answer: this.formData.answer,
          category: this.formData.category,
          published_at: this.formData.published_at
        }
      }
    },
    transformedErrors: function () {
      let errors = {
        answer: this.translate(this.errorMessages.answer, {answer: 'answer'}),
        category: this.translate(this.errorMessages.category, {category: 'category'}),
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
      this.formData = {answer: this.record.answer, category: this.record.category}
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
                        case 'input.category':
                          for (i = 0; i < error.input['input.category'].length; i++) {
                            tidx = error.input['input.category'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'category')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['category'] = econt
                          break

                        case 'input.answer':
                          for (i = 0; i < error.input['input.answer'].length; i++) {
                            tidx = error.input['input.answer'][i].split('|')

                            if (process.env.errors_lib[tidx[0]]) {
                              econt = econt + ' ' + process.env.errors_lib[tidx[0]].replace(':attribute', 'answer')

                              for (j = 1; j < tidx.length; j++) {
                                econt = econt.replace(':variable' + j, tidx[j])
                              }

                              econt = econt + ', '
                            }
                          }

                          vm.errorMessages['answer'] = econt
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