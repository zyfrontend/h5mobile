# Vue3 vite vant 项目模板

### 集成工具

- vite
- axios(网络请求)
- pinia(vuex替代)
- vant(ui库)
- vue-i18n(国际化)
- vue-router(路由)
- web3
- eslint(语法检查)
- prettier(格式化)
- sass
- postcss-pxtorem(移动端rem)

### axios封装

![image-20220521112632904](http://image.zyfullstack.top/image-20220521112632904.png)

1. 基于`vantui`增加`loading`动画
2. 基于`vantui`增加`message`提示
3. 请求拦截添加`x-token`
4. 响应拦截处理错误码

- 个性化配置

```js
// 自定义配置
  let custom_options = Object.assign(
    {
      loading: false, // 是否开启loading层效果, 默认为false
      message: false // 是否使用后端返回 message, 默认为false
    },
    customOptions
  );
```

- 使用方式

```js
import http from './http';

// 登录api
export async function userLogin(data) {
  try {
    const res = await http(
      {
        url: '/api/common/login',
        method: 'post',
        data: data
      },
      {
        // 自定义配置
        loading: false
      }
    );
    window.localStorage.setItem('token', res.data['x-token']);
  } catch (error) {
    console.log(error);
  }
}

// 获取配置信息 api
export async function getInformation(data) {
  try {
    return await http({
      url: '/api/common/config',
      method: 'get',
      data: data
    });
  } catch (error) {
    console.log(error);
  }
}

```

### pinia状态管理

![image-20220521112622228](http://image.zyfullstack.top/image-20220521112622228.png)

- Public 模块

```js
// Public 模块
import { defineStore } from 'pinia';
// 唯一 id Public
export const PublicStore = defineStore('Public', {
  state: () => {
    return {
      userMsg: 1
    };
  },
  getters: {
    getUserMsg(state) {
      return state.userMsg;
    }
  },
  actions: {
    setUserMsg() {
      this.userMsg++;
    }
  }
});

```

- 使用方式

```vue
<template>
<!--   调用   -->
{{ publicStore.getUserMsg }}
</template>

<script setup>
// 导入相关模块
import { storeToRefs } from 'pinia'
import { PublicStore } from '~/store/Public';
const publicStore = PublicStore();

// 事件中调用
const changeLanguageClick = () => {
  publicStore.setUserMsg();
};
  
// 保持响应式使用storeToRefs
const { getUserMsg, userMsg } = storeToRefs(PublicStore()) 
</script>
```

#### vantui

![image-20220521114202809](http://image.zyfullstack.top/image-20220521114202809.png)

```js
// vant/web3.js
// 引入需要的组件
import { Button, Image as VanImage, ImagePreview } from 'vant';

// use
export function vant(app) {
  app.use(ImagePreview);
  app.use(VanImage);
  app.use(Button);
}
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  }
};

```

```js
// main.js
...
import 'vant/lib/index.css';
import { vant } from '~/vant';
...

const app = createApp(App);
...
vant(app);
...
app.mount('#app');
```

- 配置vite

```js
// vite.config.js

import styleImport, { VantResolve } from 'vite-plugin-style-import';
plugins: [
    styleImport({
      resolves: [VantResolve()]
    }),
  ],
```



#### vue-i18n

> 推荐搭配`vscode`的`i18n-all`插件使用，实现自动翻译替换,安装插件会自动识别`language/web3.js`文件

```js
// src/language/web3.js
import { createI18n } from 'vue-i18n';
// 语言包
import zh from './zh.json';
import en from './en.json';

const messages = {
  en: {
    ...en
  },
  zh: {
    ...zh
  }
};

const i18n = createI18n({
  // vue3 Composition API 需要 legacy
  legacy: false,
  locale: localStorage.getItem('language') || 'zh',
  fallbackLocale: 'en',
  messages
});

export default i18n;

```

- 使用

```vue
<template>
  <view class="index-container">
    <h1>index-container</h1>
    {{ t('ce-shi') }}
    <div>
      {{ t('text1') }}
    </div>
    <div>{{ t('text2') }}</div>
  </view>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

// i18n
const { t, locale } = useI18n();

// 切换语言事件
const changeLanguageClick = () => {
  locale.value === 'en' ? (locale.value = 'zh') : (locale.value = 'en');
};
</script>

```

#### vue-router(路由)

```js
// src/router/web3.js

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('~/views/home/index.vue')
  },
  {
    path: '/about',
    component: () => import('~/views/about/index.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

// 导出 main.js注册
export default router;

```

#### rem移动端适配

- postcss

```js
// postcss.config.js
// 基于设计稿 750 的 vant ui 适配 75
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*']
    }
  }
};


// postcss.config.js
// 基于设计稿 350 的 vant ui 适配 37.5
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

- vite.config.js

```js
// vite.config.js
import postCssPxToRem from 'postcss-pxtorem';
export default defineConfig({
plugins: [],
...
css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          // 750 设计稿 基准 rootValue 75
          // 350 设计稿 基准 rootValue 37.5
          rootValue: 75,
          propList: ['*']
        })
      ]
    }
  },
...
})
```

#### 跨域配置

```js
// vite.config.js

server: {
  // 项目运行端口
    port: 8888,
    // 监听向 /api 发起的请求进行跨域处理
    proxy: {
      '/api': {
        target: 'https://hash.tianyantu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
```

#### 生产环境禁用打印输出

```js
// vite.config.js
esbuild: {
    pure: ['console.log'],
    drop: ['debugger']
  },
```

#### 路径别名

```js
// vite.config.js
const path = require('path');

resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },
```

#### web3

> 默认vite+vue3，无法正常导入web3，以及全局window的使用

```html
<!--  index.html  -->
<script>
  window.global = window;
</script>
<script type="module">
  import process from 'process';
  import { Buffer } from 'buffer';
  import EventEmitter from 'events';

  window.Buffer = Buffer;
  window.process = process;
  window.EventEmitter = EventEmitter;
</script>
```

```js
// vite.config.js
const path = require('path');
resolve: {
    alias: {
      web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js')
    }
  },
```

