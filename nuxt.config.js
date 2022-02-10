const prodCSS =
  process.env.NODE_ENV === 'production' ? ['~/assets/css/styles.css'] : []

export default {
  ssr: false,
  srcDir: 'src/',
  ssr: false,
  components: false,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || 'What APpolo Can Do',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
    'nuxt-material-design-icons',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/apollo'],
  /*
   ** Apollo
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
      },
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    // customVariables: prodCSS, // Vuetify overrides
    icons: {
      iconfont: 'mdiSvg',
    },
    defaultAssets: false,
    theme: {
      themes: {
        light: {
          primary: '#333399',
          secondary: '#e10198',
          accent: '#ff5722',
          error: '#f44336',
          warning: '#ffc107',
          info: '#3f51b5',
          success: '#4caf50',
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    terser: {
      parallel: true,
      cache: false,
      sourceMap: false,
      extractComments: {
        filename: 'LICENSES',
      },
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
        },
        output: {
          comments: /^\**!|@preserve|@license|@cc_on/,
        },
      },
    },
    buildDir: 'dist',
    cssSourceMap: true,
    optimizeCSS: false,
    extractCSS: {
      ignoreOrder: true,
    },
    postcss: {
      plugins: {
        'postcss-preset-env': { stage: 1 },
        'postcss-media-minmax': {},
        'postcss-custom-media': {
          importFrom: 'src/assets/css/grid_settings.css',
        },
        'postcss-import': {},
        'postcss-apply': {},
        'postcss-functions': {},
        'postcss-custom-properties': {
          importFrom: [
            './src/assets/css/colors.css',
            './src/assets/css/spacing.css',
          ],
          preserve: false,
        },
        'postcss-mixins': {},
        'postcss-nested': {},
        'postcss-strip-inline-comments': {},
        'postcss-clean': {},
        'postcss-flexbugs-fixes': {},
        autoprefixer: {},
        cssnano: {},
      },
      order: [
        'postcss-preset-env',
        'postcss-media-minmax',
        'postcss-custom-media',
        'postcss-import',
        'postcss-apply',
        'postcss-functions',
        'postcss-custom-properties',
        'postcss-mixins',
        'postcss-nested',
        'postcss-strip-inline-comments',
        'postcss-clean',
        'postcss-flexbugs-fixes',
        'autoprefixer',
        'cssnano',
      ],
      preset: {
        stage: 1,
        autoprefixer: {
          flexbox: true,
        },
      },
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
