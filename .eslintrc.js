module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },
  globals: {
    Promise: 'off'
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['vue', 'html', 'prettier'],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'no-mutating-props': 'off',
    'vue/no-v-html': 'off',
    eqeqeq: 'warn', // 要求使用 === 和 !==
    'no-dupe-args': 'error', // 禁止 function 定义中出现重名参数
    'no-func-assign': 2, //禁止重复的函数声明
    'no-unused-vars': 'error', // 禁止出现未使用过的变量
    camelcase: 'error', // 强制使用骆驼拼写法命名约定
    'no-mixed-spaces-and-tabs': 'error', //禁止混用tab和空格
    'no-template-curly-in-string': 2, //模版字符串检查
    'dot-location': [2, 'property'], //对象访问符的位置，换行的时候在行首
    'no-lone-blocks': 2, //禁止 不必要的块嵌套
    'no-redeclare': 2 //禁止重复声明变量
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
};
