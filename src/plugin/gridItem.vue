<!--
 * @Author: fcli
 * @Date: 2023-09-19 17:08:39
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-20 10:21:51
 * @FilePath: /my_module/vue-grid-waterfall/src/plugin/gridItem.vue
 * @Description: 
-->

<template>
    <div class="grid-item" :style="itemStyle">
        <div ref="gridItem">
            <slot name="slot-scope" :data="data"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const gridItem = ref<any>(null);
const itemStyle = ref({})

onMounted(() => {
    itemStyle.value = { 'grid-row-end': `span ${gridItem.value.clientHeight - 1}` }
})

</script>
<style scoped> 
.grid-item {
    grid-row-end: span 100;
}
</style>