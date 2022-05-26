<template>
  <div class="navbar-container">
    <div class="navbar-container-left">
      <div class="menu box" @click="silderBarClick">
        <van-icon size="35" name="setting-o" />
      </div>
      <div class="logo"></div>
    </div>
    <div class="navbar-container-content"></div>
    <div class="navbar-container-right">
      <div class="address box">
        {{ textOmit('0x0171Efd0aF264D81229cF532c9630C1bfB15d680', 4, 8) }}
      </div>
      <div class="language box" @click="switchLanguageClick">
        {{ languageList[currentLanguage] || '简体中文' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStorage } from '@vueuse/core';
import { textOmit } from '~/utils';
import { langs } from '~/mock';

// 国际化
const { locale } = useI18n();
const languageList = ref([]); // 语言列表
const currentLanguage = ref(window.localStorage.getItem('language')); // 当前显示语言
// 语言按钮点击
const switchLanguageClick = () => {
  currentLanguage.value = currentLanguage.value === 'zh-cn' ? 'en-us' : 'zh-cn';
  locale.value = currentLanguage.value;
};
onMounted(() => {
  if (!window.localStorage.getItem('language')) {
    useStorage('language', langs.default);
  }
  useStorage('langs', langs.langs);
  languageList.value = JSON.parse(window.localStorage.getItem('langs'));
});
// 侦听语言切换，设置缓存
watch(
  () => currentLanguage.value,
  (newValue, oldValue) => {
    window.localStorage.setItem('language', newValue);
  }
);
const emit = defineEmits(['showSidebarBarClick']);
const silderBarClick = () => {
  emit('showSidebarBarClick');
};
</script>

<style lang="scss">
.navbar-container {
  width: 100%;
  height: 116px;
  background: #1d1f25;
  border-radius: 20px 20px 20px 20px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .box {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px 20px 20px 20px;
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
  }
  .navbar-container-left {
    display: flex;
    justify-content: center;
    align-items: center;
    .menu {
      width: 84px;
      height: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 16px;
    }
    .logo {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 100px 100px 100px 100px;
      opacity: 1;
      border: 2px solid #faaf3a;
    }
  }
  .navbar-container-content {
    display: flex;
  }
  .navbar-container-right {
    display: flex;
    .address {
      padding: 24px 16px;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .language {
      padding: 26px 12px;
      margin-left: 16px;
      min-width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
