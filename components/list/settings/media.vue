<template>
  <div>
    <v-card-text>
      <h4>UPLOAD AUDIO FILE</h4>
    	<p><small>*hanya menerima file ekstensi .mp3, .jpg, .jpeg, .png</small></p>
      <input type="file" name="file" v-on:change="fileChange($event.target.files)" />
    </v-card-text>
    <div class="clearfix">&nbsp;</div>
    <div class="clearfix">&nbsp;</div>
    <ol>
      <li v-for="dd in data" :key="dd.ETag">
	    	<h3>Nama File : {{dd.Key}} </h3>
	    	<p>Size : {{dd.Size}} Bytes <br/>
	    	Last Modified : {{ dd.LastModified }} <br/>
	    	Share Url : https://FLYBIRD-space.sgp1.digitaloceanspaces.com/{{dd.Key}}
	    	<v-btn small color="primary" style="min-width:44px !important; min-height:36px !important" v-clipboard:copy='"https://FLYBIRD-space.sgp1.digitaloceanspaces.com/"+dd.Key' @click="copyLink(dd.Key)">COPY</v-btn>
	    	<v-btn small color="primary" style="min-width:44px !important; min-height:36px !important" @click="deleteFile(dd.Key)">DELETE</v-btn>
	    	</p>
	    </li>
    </ol>
  </div>
</template>

<script>
  import AWS from 'aws-sdk'
  export default {
    middleware: ['auth', 'session_lifetime'],
    props: {
      record: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        data: [{}]
      }
    },
    mounted () {
      this.data = this.record
    },
    methods: {
      copyLink (key) {
        this.$toasted.show(key + ' copied').goAway(1200)
      },
      deleteFile (key) {
        let vm = this
        const spacesEndpoint = new AWS.Endpoint(process.env.do_spaces['spacesEndpoint'])
        const s3 = new AWS.S3({
          endpoint: spacesEndpoint,
          accessKeyId: process.env.do_spaces['accessKeyId'],
          secretAccessKey: process.env.do_spaces['secretAccessKey']
        })
        var params = {Bucket: process.env.do_spaces['Bucket'], Key: key}

        s3.deleteObject(params, function (err, exemel) {
          if (err) vm.$toasted.show(err).goAway(1200)
          else {
            vm.$toasted.show(key + ' deleted').goAway(1200)
            window.location.reload(true)
          }
        })
      },
      fileChange (file) {
        var ext = file[0].name.split('.')[1]
        if (ext === 'mp3' || ext === 'jpg' || ext === 'png' || ext === 'jpeg') {
          const spacesEndpoint = new AWS.Endpoint(process.env.do_spaces['spacesEndpoint'])
          const s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: process.env.do_spaces['accessKeyId'],
            secretAccessKey: process.env.do_spaces['secretAccessKey']
          })

          var params = {Bucket: process.env.do_spaces['Bucket'], Key: file[0].name, Body: file[0], ACL: 'public-read'}

          s3.putObject(params, function (err, data) {
            if (err) this.$toasted.show(err).goAway(1200)
            else window.location.reload(true)
          })
        } else {
          this.$toasted.show('tidak menerima selain file .mp3').goAway(1200)
        }
      }
    }
  }
</script>