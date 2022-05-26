<template>
  <LoadingMore
    v-model:data-list="dataList"
    v-model:page-model="pageModel"
    :get-list-api="getList"
  >
    <div class="main">
      <div v-for="(item, index) in dataList" :key="index" class="flex">
        <h1>{{ index }}</h1>
      </div>
    </div>
  </LoadingMore>
</template>
<script setup>
import { ref, reactive } from 'vue';
import LoadingMore from '~/components/LoadingMore/index.vue';
import { getList } from '~/request/api';

/**
 * @param(getList)
 * // 测试下拉加载更多列表信息
 * export async function getList(data) {
 *   try {
 *     const res = await http({
 *       url: '/api/game_invest',
 *       method: 'GET',
 *       data: data
 *     });
 *     console.log(data);
 *     res.data.limit = data.limit ? data.limit : 15;
 *     res.data.page = data.page ? data.page : 1;
 *     res.data.pages = Math.ceil(res.data.total / 15);
 *     return new Promise((resolve) => resolve(res));
 *   } catch (error) {
 *     console.log(error);
 *   }
 * }
 * */

const dataList = ref([]);
const pageModel = reactive({
  page: 1,
  limit: 15,
  total: 0,
  pages: 0
});
</script>
