<template>
  <h1 style="color: red">home</h1>
  <h2 style="color: red">{{ t('home-title') }}</h2>
  <van-button type="primary" @click="buttonShowOverlayClick">
    开启遮罩
  </van-button>
  <van-overlay :show="showOverlay" @click="showOverlay = false">
    <h1 style="color: red">home</h1>
    <h2 style="color: red">{{ t('home-title') }}</h2>
  </van-overlay>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const showOverlay = ref(false);
const buttonShowOverlayClick = () => {
  showOverlay.value = true;
};
</script>
