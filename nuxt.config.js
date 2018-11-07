const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Thunderlab - #YOLO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'DAZZBOR' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Quicksand:400,700|Material+Icons' },
      { rel: 'stylesheet', integrity: "sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ", crossorigin: "anonymous", href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css' },
      { rel: 'stylesheet', href: '/css/app.css' }
      
    ]
  },
  env: {
    appName: 'Thunderlab - #YOLO',
    locale: 'id',
    api: {
      url: 'https://api.dazzbor.org/'
    },
    lang: {
      id: {
        login: {
          pre: "Silahkan masukkan email dan password anda untuk mengatur sekolah anda",
          register_now_link: "Daftar Akun",
          forget_password_link: "Lupa Password"
        },
        register: {
          title: "Daftar Akun",
          pre: "Silahkan isi formulir berikut untuk melanjutkan proses pendaftaran",
          register_now_link: "Daftar Akun",
          forget_password_link: "Lupa Password",
          login_link: "Login",
          register_success_message: "Akun anda telah berhasil terregisterasi"
        },
        request_reset_password: {
          title: "Reset Password",
          pre: "Silahkan masukkan email anda untuk mengirimkan permintaan perubahan password",
          register_now_link: "Daftar Akun",
          forget_password_link: "Lupa Password",
          login_link: "Login",
          success_message: "Permintaan reset password telah kami terima. Kami akan mengirimkan email berisikan link untuk mengganti password anda"
        }
      }
    },
    errors_lib: {
      50061: ':attribute sudah terdaftar sebelumnya',
      50041: ':attribute minimal :variable1 karakter',
      50035: ':attribute maksimal tanggal :variable1',
      50047: ':attribute tidak boleh kosong'
    },
    do_spaces: {
      accessKeyId: 'NFMPT4P5HNJOGY6FNCYB',
      secretAccessKey: 'hPjSpPYRoMCo5X80QoxtqB43OLF2yJiXTWp2A9PdM3k',
      spacesEndpoint: 'sgp1.digitaloceanspaces.com',
      Bucket: 'DAZZBOR'
    }
  },
  mode: 'spa',
  plugins: [
    // '~/plugins/vuetify.js',
    {src: '~/plugins/client-side-plugins.js', ssr: false},
    // {src: '~/plugins/laravel-validation-trans.js', ssr: false}
    '~/plugins/vue-select.js',
    '~/plugins/vue-js-toggle.js'
    // '~/plugins/feather-icon.js'
  ],
  router: {
    // linkActiveClass: null
  },
  css: [
    // '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#f00' },
  loadingIndicator: {
    name: 'pulse',
    color: 'f00',
    background: '000'
  },
  /*
  ** Modules
   */
  modules: [
    // 'bootstrap-vue/nuxt',
    ['bootstrap-vue/nuxt', { css: false }],
    '@nuxtjs/apollo',
    '@nuxtjs/proxy'
  ],
  apollo: {
    clientConfigs: {
      default: '~/apollo/clientConfigs/default.js',
      customer: '~/apollo/clientConfigs/customer.js'
    },
    includeNodeModules: true
  },
  proxy: [
    'https://api.dazzbor.org/graphql'
  ],
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [],
    // extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
