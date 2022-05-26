<template>
  <ContainerBox>
    <Navigation @showSidebarBarClick="showSiderBar = true"></Navigation>
    <router-view></router-view>
  </ContainerBox>
  <van-popup
    v-model:show="showSiderBar"
    overlay-class="popup-class"
    position="left"
    lock-scroll
  >
    <Sidebar></Sidebar>
  </van-popup>
</template>

<script setup>
import { ref } from 'vue';
import Navigation from '~/components/Navigation/index.vue';
import ContainerBox from '~/components/ContainerBox/index.vue';
import Sidebar from '~/components/Sidebar/index.vue';
const showSiderBar = ref(false);
</script>

<style lang="scss" scoped></style>
