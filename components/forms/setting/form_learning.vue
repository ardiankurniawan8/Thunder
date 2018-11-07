<template :key=idf>
  <div>
    <!-- Content -->
    <v-layout>
      <v-flex xs3 md2>
        <v-card-text>
          <h4><strong>TEXT</strong></h4>
        </v-card-text>
      </v-flex xs3 md2>
      <v-flex xs9 md10>
        <v-card-text>
          <v-text-field  @input="inputOccurred" 
            type="text" 
            :name=idf 
            label='text' 
            textarea
            auto-grow
            counter=20000
            cols="15"
            v-model="formData[idf + '_text']"
            :error="errorMessages[idf + '_text'] && errorMessages[idf + '_text'].length > 0" 
            :error-messages="this.translate(errorMessages[idf + '_text'])" 
            placeholder=" " 
            v-validate="'required'">
          </v-text-field>
        </v-card-text>
      </v-flex xs9 md10>
    </v-layout>
    <v-layout>
      <v-flex xs3 md2>
        <v-card-text>
          <h4><strong>AUDIO</strong></h4>
        </v-card-text>
      </v-flex xs3 md2>
      <v-flex xs9 md10 v-if="audio.length > 0">
        <AddAudio :defaultInput=audio v-on:audio-change="audioChange"></AddAudio>
      </v-flex xs9 md10>
    </v-layout>
    <v-layout>
      <v-flex xs3 md2>
        <v-card-text>
          <h4><strong>VIDEO</strong></h4>
        </v-card-text>
      </v-flex xs3 md2>
      <v-flex xs9 md10 v-if="video.length > 0">
        <AddVideo :defaultInput=video v-on:video-change="VideoChange"></AddVideo>
      </v-flex xs9 md10>
    </v-layout>
  </div>
</template>


<script>
import AddAudio from '~/components/forms/setting/add_audio'
import AddVideo from '~/components/forms/setting/add_video'
// ------------------------------ MODIFY HERE ----------------------------------
// ------------------------------ END MODIFY HERE ------------------------------
export default {
  components: { AddAudio, AddVideo },
  props: {
    // ------------------------------ MODIFY HERE ----------------------------------
    record: {
      type: Object,
      default: function () { return [{text: '', audio: '', video: ''}] }
    },
    errorM: {
      type: Array,
      default: function () { return [{text: '', audio: '', video: ''}] }
    },
    audio: {
      type: Array,
      default: function () { return [] }
    },
    video: {
      type: Array,
      default: function () { return [] }
    },
    idf: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  mounted () {
    // ------------------------------ MODIFY HERE ----------------------------------
    this.reset()
    this.inputOccurred(this.idf)
    // ------------------------------ END MODIFY HERE ------------------------------
  },
  data () {
    return {
      errorMessages: {},
      formData: {},
      audios: [],
      videos: []
      // ------------------------------ MODIFY HERE ----------------------------------
      // ------------------------------ END MODIFY HERE ------------------------------
    }
  },
  methods: {
    reset () {
      this.formData[this.idf + '_text'] = this.record.text
      this.errorMessages[this.idf + '_text'] = this.errorM['text']
      var i = 0
      for (i = 0; i < this.record.audio.length; i++) {
        this.audio.push({id: i, url: this.record.audio[i]})
      }
      if (this.record.audio.length === 0) {
        this.audio.push({id: 0, url: ''})
      }
      for (i = 0; i < this.record.video.length; i++) {
        this.video.push({id: i, url: this.record.video[i]})
      }
      if (this.record.video.length === 0) {
        this.video.push({id: 0, url: ''})
      }
    },
    inputOccurred (e) {
      // set the model
      var newD = []
      newD['text'] = this.formData[this.idf + '_text']
      newD['audio'] = this.record.audio
      newD['video'] = this.record.video
      this.$emit('on-change', this.idf, newD)
    },
    audioChange (value) {
      // set the model
      var newD = []
      newD['text'] = this.formData[this.idf + '_text']
      newD['audio'] = value
      newD['video'] = this.record.video
      this.$emit('on-change', this.idf, newD)
    },
    videoChange (value) {
      // set the model
      var newD = []
      newD['text'] = this.formData[this.idf + '_text']
      newD['audio'] = this.record.audio
      newD['video'] = value
      this.$emit('on-change', this.idf, newD)
    }
  }
}
</script>