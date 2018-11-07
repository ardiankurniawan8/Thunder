import Vue from 'vue'
import VeeValidate from 'vee-validate'
import moment from 'moment'
import 'moment/locale/id'

Vue.use(VeeValidate, {
  inject: true,
  locale: 'id',
  fieldsBagName: 'veeFields',
  dictionary: {
    id: {
      messages: {
        confirmed: (a) => 'Konfirmasi ' + (a ? a.replace(/_/g, ' ') : '') + ' tidak cocok.',
        email: (a) => 'Isian ' + (a ? a.replace(/_/g, ' ') : '') + ' harus berupa alamat surel yang valid.',
        url: (a) => 'Isian ' + (a ? a.replace(/_/g, ' ') : '') + ' harus berupa alamat web yang valid.',
        min: (a, n) => 'Isian ' + (a ? a.replace(/_/g, ' ') : '') + ' harus minimal ' + n[0] + ' karakter',
        max: (a, n) => 'Isian ' + (a ? a.replace(/_/g, ' ') : '') + ' harus maksimal ' + n[0] + ' karakter',
        required: (a) => 'Isian ' + (a ? a.replace(/_/g, ' ') : '') + ' wajib diisi'
      }
    }
  }
})

export default () => {
  moment.locale('id')
}

/*
FILTERS
 */
Vue.filter('toCurrency', function (value, prefix = '', suffix = '') {
  if (typeof value !== 'number') {
    if (isNaN(value)) {
      return value
    } else {
      value = value * 1
    }
  }
  var parts = value.toString().split(',')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return prefix + parts.join(',') + suffix
})

Vue.filter('capitalize', function (value) {
  if (typeof value === 'number') {
    value = value.toString()
  }

  if (!value) {
    return ''
  }

  return value.toUpperCase()
})

Vue.filter('toDateTime', function (value) {
  if (value) {
    return moment(value).format('DD-MMM-YYYY HH:mm:ss')
  } else {
    return ''
  }
})

Vue.filter('toDate', function (value) {
  if (value) {
    return moment(value).format('DD-MMM-YYYY')
  } else {
    return ''
  }
})
