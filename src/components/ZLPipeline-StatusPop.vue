<template>
    <div ref="blackCover" v-show="popVisible" @click="closePop" class="ZLPipeline-BlackCover"></div>
    <div ref="popContainer" v-show="popVisible" class="ZLPipeline-Pop-Container">
        <div class="ZLPipeline-popControls" @click="closePop"><el-icon><CloseBold /></el-icon></div>
        <div class="ZLPipeline-Pop-Bar">
            <div class="ZLPipeline-Pop-Bar-Title"><el-icon style="margin-right: 10px;"><Operation /></el-icon>{{ popMeta.title }} 的执行结果</div>
        </div>
        <div class="ZLPipeline-Pop-Content">
            <el-collapse style="padding-bottom: 50px;" v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="data in popStatusList" :title="data.title" :name="data.title">
                    <div style="white-space: pre">{{ data.text }}</div>
                </el-collapse-item>
                <el-collapse-item v-show="popStatusList.length == 0" title="无返回结果" name="1">
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
    CloseBold,
    Operation
} from '@element-plus/icons-vue';

const activeNames = ref([])
const popContainer = ref<any>()
const blackCover = ref<any>()
const handleChange = (val: string[]) => {
  console.log(val)
}

interface popArr {
    title: String
}

const props = defineProps({
    popVisible: {
        type: Boolean,
        default: false
    },
    popMeta: {
        type: Object,
        default: {
            title: 'ZL Popover'
        }
    },
    popStatusList: {
        type: Object,
        default: [
            {
                title: '无返回结果',
                text: ''
            }
        ]
    }
})

const emit = defineEmits(['onClose'])

function closePop() {
    blackCover.value.style.opacity = 0;
    popContainer.value.style.opacity = 0;
    popContainer.value.style.transform = "translate(-50%, -50%) scale(0.95)";
    activeNames.value = []
    setTimeout(() => {
        blackCover.value.style.opacity = 1;
        popContainer.value.style.opacity = 1;
        popContainer.value.style.transform = "";
        emit('onClose')
    }, 500)
}
</script>

<style lang="less" scoped>
@keyframes blackIn {
    0% {
        background-color: rgba(50, 50, 50, 0);
        // backdrop-filter: blur(0px);
        // -webkit-backdrop-filter: blur(0px);
    }
    100% {
        background-color: rgba(50, 50, 50, 0.8);
        // backdrop-filter: blur(20px);
        // -webkit-backdrop-filter: blur(20px);
    }
}

@keyframes boxIn {
    0% {
        transform: translate(-50%, -50%) scale(0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        backdrop-filter: blur(0px);
        -webkit-backdrop-filter: blur(0px);
    }
}

@keyframes contentIn {
    0% {
        transform: scale(0.95);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.ZLPipeline-Pop-Container {
    animation: boxIn 0.3s;
    max-width: 1200px;
    max-height: 600px;
    width: 75%;
    height: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(250, 250, 250);
    z-index: 1200;
    border-radius: 20px;
    overflow: hidden;
    transition-duration: 0.5s;
}

.ZLPipeline-popControls,
.ZLPipeline-Pop-Bar-Title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ZLPipeline-BlackCover {
    animation: blackIn 0.3s;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 1100;
    background-color: rgba(50, 50, 50, 0.8);
    top: 0;
    left: 0;
    // backdrop-filter: blur(20px);
    // -webkit-backdrop-filter: blur(20px);
    transition-duration: 0.5s;
}

.ZLPipeline-popControls {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 100px;
}

.ZLPipeline-popControls:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.ZLPipeline-Pop-Bar {
    height: 50px;
    background-color: rgba(0, 0, 0, 0.055);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 8px;
}

.ZLPipeline-Pop-Content {
    animation: contentIn 0.45s;
    box-sizing: border-box;
    max-height: 100%;
    padding: 20px;
    overflow-y: auto;
}

.ZLPipeline-Pop-Bar-Title {
    height: 100%;
    justify-content: start;
    margin-left: 20px;
    font-size: 1.1rem;
}

:deep(.el-collapse-item__header) {
    background-color: #00000010;
    border-radius: 10px;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 10px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
}

:deep(.el-collapse-item__wrap) {
    background-color: #00000000;
}

:deep(.el-collapse-item__content) {
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
}

:deep(.el-collapse-item__header:hover) {
    background-color: #00000020;
}

:deep(.el-collapse-item__header:active) {
    background-color: #00000025;
}
</style>