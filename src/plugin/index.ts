/*
 * @Author: fcli
 * @Date: 2023-09-04 10:34:52
 * @LastEditors: fcli
 * @LastEditTime: 2023-09-19 16:50:44
 * @FilePath: /my_module/vue-grid-waterfall/src/plugin/index.ts
 * @Description: 
 */
import vueGridWaterfall from './index.vue';

const VueGridWaterfall = {
    install(app:any){
        app.component('VueGridWaterfall',vueGridWaterfall);
    }
}
export default VueGridWaterfall;
