module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  ignorePatterns: ['static/', 'assets/', '*.graphql'],
  // add your custom rules here
  rules: {
    'vue/comment-directive': 0,
    'unicorn/prefer-includes': 0,
    'vue/html-self-closing': 0,
    'standard/computed-property-even-spacing': 'off',
    'one-var': 'never',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'max-len': [
      2,
      180,
      2,
      {
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignorePattern: 'd="([\\s\\S]*?)"'
      }
    ],
    'newline-after-import': 0,
    'no-unused-vars': 1,
    'import/no-dynamic-require': 0,
    semi: [2, 'never'],
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error', { semi: false }],
    'arrow-body-style': 'warn',
    'arrow-parens': ['error', 'always'],
    complexity: 'off',
    'constructor-super': 'warn',
    curly: ['warn', 'multi-line'],
    'dot-notation': 'warn',
    'eol-last': 'warn',
    'guard-for-in': 'off',
    'max-classes-per-file': ['warn', 1],
    'new-parens': 'warn',
    'no-bitwise': 'off',
    'no-caller': 'warn',
    'no-cond-assign': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-multiple-empty-lines': 'warn',
    'no-new-wrappers': 'warn',
    'no-throw-literal': 'warn',
    'no-undef-init': 'warn',
    'no-unsafe-finally': 'warn',
    'no-unused-labels': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'one-var': 'warn',
    'prefer-const': 'warn',
    'quote-props': ['warn', 'consistent-as-needed'],
    radix: 'warn',
    'use-isnan': 'warn',
    'valid-typeof': 'off',
    camelcase: 'off'
  },
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint']
    }
  ]
}
