import Vue from 'vue'

Vue.mixin({
  methods: {
    translate: function (msg, fieldsMapping) {
      let result = []
      if (Array.isArray(msg)) {
        result = msg
      } else if (msg) {
        result = [msg]
      } else {
        return []
      }

      for (let i = 0; i < result.length; i++) {
        // Field Mapping
        if (fieldsMapping !== null && typeof fieldsMapping === 'object') {
          Object.keys(fieldsMapping).forEach(function (field) {
            result[i] = result[i].replace(field, fieldsMapping[field])
          })
        }

        // Message translation
        if (new RegExp('the.*is required', 'ig').exec(result[i])) {
          result[i] = result[i].replace('The', 'Isian')
          result[i] = result[i].replace('is required', 'wajib diisi')
        }

        if (new RegExp('the.*must be a valid email address', 'ig').exec(result[i])) {
          result[i] = result[i].replace('The', 'Format isian')
          result[i] = result[i].replace('must be a valid email address', 'harus berupa alamat surel yang valid')
        }

        if (new RegExp('the.*has already been taken.', 'ig').exec(result[i])) {
          result[i] = result[i].replace('The', 'Isian')
          result[i] = result[i].replace('has already been taken', 'telah ada sebelumnya')
        }

        if (new RegExp('the.*may only contain letters, numbers, and dashes', 'ig').exec(result[i])) {
          result[i] = result[i].replace('The', 'Format isian')
          result[i] = result[i].replace('may only contain letters, numbers, and dashes', 'hanya bisa mengandung huruf, angka dan dash')
        }

        if (new RegExp('The selected .*is invalid.', 'ig').exec(result[i])) {
          result[i] = result[i].replace('The', 'Isian')
          result[i] = result[i].replace('tidak dikenali')
        }
      }

      if (Array.isArray(msg)) {
        return result
      } else {
        return result.join(', ')
      }
    }
  }
})
