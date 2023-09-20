<!--
 * @Author: fcli
 * @Date: 2023-09-04 10:34:58
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-20 11:23:39
 * @FilePath: /my_module/vue-grid-waterfall/src/plugin/index.vue
 * @Description: 
-->

<template>
    <div class="grid-content" ref="gridContent" :style="gridStyle" @scroll="getMoreData">
        <grid-item v-for="item in showDataList" :key="item.dataIndex" :data="item">
            <template #slot-scope="slotProps">
                <slot name="slot-scope" :slotProps="slotProps"></slot>
            </template>
        </grid-item>
    </div>
</template>
<script lang="ts" setup>
import GridItem from './gridItem.vue';
import { ref, watch } from 'vue';

const props = defineProps({
    dataList: {
        type: Array,
        default: []
    },
    columns: {
        type: Number,
        default: 2
    },
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 400
    },
    bottom:{
        type: Number,
        default: 50
    },
    loading:{
        type: Boolean,
        default: true
    }

})

const emit=defineEmits(['getMoreData']);

const gridStyle = ref({});
const showDataList = ref<any>([])

watch(() => props.dataList, (newValue) => {
    let tempData: any = [];
    newValue.forEach((item: any, index) => {
        tempData.push({ ...item, dataIndex: index })
    })
    showDataList.value = tempData;

    gridStyle.value = {
        'grid-template-columns': `repeat(${props.columns}, 1fr)`,
        width:props.width + 'px',
        height:props.height + 'px'
    }
}, { immediate: true,deep:true })

const isLoading=ref<boolean>(false);
watch(()=>props.loading,(newValue:boolean)=>{
    isLoading.value=newValue;
})

const gridContent=ref<any>(null);
//根据触底数据判断获取最新数据
const getMoreData=()=>{
    const scrollHeight = gridContent.value.scrollHeight || 0;
    const clientHeight = gridContent.value.clientHeight || 0;
    const scrollTop = gridContent.value.scrollTop || 0;
    if(scrollHeight - clientHeight - scrollTop < props.bottom && !isLoading.value){
        isLoading.value=true;
        emit('getMoreData');
    }
}
</script>

<style>
.grid-content {
    display: grid;
    grid-auto-rows: minmax(1px, 1px);
    overflow: auto;
}
</style>