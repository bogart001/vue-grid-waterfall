<!--
 * @Author: fcli
 * @Date: 2023-09-04 14:12:29
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-20 11:25:33
 * @FilePath: /my_module/vue-grid-waterfall/README.md
 * @Description: 
-->
# vue-grid-waterfall


## VUE3 瀑布流组件，基于Grid布局

```bash
npm install @fcli/vue-grid-waterfall --save-dev 来安装

在项目中使用
import VueGridWaterfall from '@fcli/vue-grid-waterfall';
const app=createApp(App)
app.use(VueGridWaterfall);

```

示例：

```html

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

//获取数据
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

```

| 属性   | 属性名称 | 类型   | 可选值 |
| ------ | -------- | ------ | ------ |
| dataList  | 瀑布流列表数据   | Array | [] |
| columns | 展示的列数   | number | 2 |
| width | 瀑布流宽度   | number | 0 |
| height | 瀑布流高度   | number | 0  |
| bottom | 滚动到底部触发加载数据的距离  | number | 50 |
| loading | 是否加在载数据  | boolean | 加载数据完数据设为false |
| #slot-scope  |  插槽   | object | slotProps.data|

#### slot

例：
```
  <template #slot-scope="{slotProps}">
    <div class="li">{{ slotProps.data.text }}</div>
  </template>
```

