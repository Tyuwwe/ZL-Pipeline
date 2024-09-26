import type { App } from "vue";
import ZLPipeline from "./ZLPipeline.vue";
import ZLPipelineManege from "./ZLPipelineManege.vue";
import ZLPipelineNodePop from "./ZLPipeline-NodePop.vue";
import ZLPipelineStatusPop from "./ZLPipeline-StatusPop.vue";

export default {
    install(app: App) {
        app.component("ZLPipeline", ZLPipeline)
        app.component("ZLPipelineManege", ZLPipelineManege)
        app.component("ZLPipelineNodePop", ZLPipelineNodePop)
        app.component("ZLPipelineStatusPop", ZLPipelineStatusPop)
    }
}

export {
    ZLPipeline, 
    ZLPipelineManege, 
    ZLPipelineNodePop, 
    ZLPipelineStatusPop
}

declare module 'vue' {
    export interface GlobalComponents {
        ZLPipeline: typeof ZLPipeline
        ZLPipelineManege: typeof ZLPipelineManege
        ZLPipelineNodePop: typeof ZLPipelineNodePop
        ZLPipelineStatusPop: typeof ZLPipelineStatusPop
    }
}