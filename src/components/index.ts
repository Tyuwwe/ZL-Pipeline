import type { App } from "vue";
import ZLPipeline from "./ZLPipeline.vue";
import ZLPipelineManage from "./ZLPipelineManage.vue";
import ZLPipelineNodePop from "./ZLPipeline-NodePop.vue";
import ZLPipelineStatusPop from "./ZLPipeline-StatusPop.vue";

export default {
    install(app: App) {
        app.component("ZLPipeline", ZLPipeline)
        app.component("ZLPipelineManage", ZLPipelineManage)
        app.component("ZLPipelineNodePop", ZLPipelineNodePop)
        app.component("ZLPipelineStatusPop", ZLPipelineStatusPop)
    }
}

export {
    ZLPipeline, 
    ZLPipelineManage, 
    ZLPipelineNodePop, 
    ZLPipelineStatusPop,
}

declare module 'vue' {
    export interface GlobalComponents {
        ZLPipeline: typeof ZLPipeline
        ZLPipelineManage: typeof ZLPipelineManage
        ZLPipelineNodePop: typeof ZLPipelineNodePop
        ZLPipelineStatusPop: typeof ZLPipelineStatusPop
    }
}