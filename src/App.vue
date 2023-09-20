<!--
 * @Author: fcli
 * @Date: 2023-09-04 10:32:44
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-20 11:21:05
 * @FilePath: /my_module/vue-grid-waterfall/src/App.vue
 * @Description: 
-->

<template>
  <div class="content">
    <vue-grid-waterfall :data-list="dataList" :columns="3" @getMoreData="getMoreData" :loading="isLoading">
      <template #slot-scope="{ slotProps }">
        <div class="item" :style="{ height: slotProps.data.height, background: slotProps.data.color }">{{ slotProps.data.color
        }}</div>
      </template>
    </vue-grid-waterfall>
  </div>
</template>

<script setup lang="ts">
import vueGridWaterfall from './plugin/index.vue';
import { ref, onMounted } from 'vue'
component: {
  vueGridWaterfall
}

const dataList = ref<any>([]);
//获取随机颜色
const getRandomColor = () => {
  const getColor: any = (color: any) => {
    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : getColor(color);
  };
  return '#' + getColor('')
}

const getMoreData = () => {
  isLoading.value = true;
  getData()
}
const isLoading = ref(true);
const getData = () => {
  for (let i = 0; i < 100; i++) {
    dataList.value.push({ height: 50 + Math.random() * 50 + 'px', color: getRandomColor() })
  }
  setTimeout(()=>{
      isLoading.value = false;
  })
}

onMounted(() => {
  getData()
})
</script>

<style scoped>
.content {
  background: #fff;
  overflow: hidden;

  .li {
    height: 32px;
    line-height: 32px;
    color: #000;
    font-size: 14px;
  }
}
</style>
