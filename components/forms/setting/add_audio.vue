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
            Audio {{ (input.id*1 +1) }}
            <v-text-field  @input="inputOccurred" 
              type="text" 
              name="url" 
              label="Audio Url" 
              v-model="input.url"
              :error="errorMessages['url' + input.id] && errorMessages['url' + input.id].length > 0" 
              :error-messages="errorMessages['url' + input.id]" 
              >
            </v-text-field>
          </v-card-text>
        </v-flex>

        <v-card-text>
          <a @click="addInput">Add Audio</a>
        </v-card-text>
      </v-layout>
    </v-form>
  </div>
</template>

<script>

export default {
  apollo: {
    $client: 'customer'
  },
  props: {
    // ------------------------------ MODIFY HERE ----------------------------------
    defaultInput: {
      type: Array,
      default: function () { return [{id: 0, url: ''}] }
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
  methods: {
    reset () {
      var i
      // ------------------------------ MODIFY HERE ----------------------------------
      for (i = 0; i < this.defaultInput.length; i++) {
        this.inputs.push({id: i, url: this.defaultInput[i]['url']})
      }
      this.counter = this.inputs.length - 1
      // ------------------------------ END MODIFY HERE ------------------------------
    },
    addInput () {
      this.inputs.push({id: `${++this.counter}`, url: ''})
    },
    inputOccurred (e) {
      // set the model
      var counti = 0
      var countj = 0
      var newA = []
      for (countj = 0; countj < this.inputs.length; countj++) {
        if (this.inputs[countj]['url'] === '') {
        } else {
          newA[counti] = this.inputs[countj]['url']
          counti++
        }
      }

      this.$emit('audio-change', newA)
    }
  }
}
</script>