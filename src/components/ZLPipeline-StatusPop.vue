<template>
    <div ref="blackCover" v-show="popVisible" @click="closePop" class="ZLPipeline-BlackCover"></div>
    <div ref="popContainer" v-show="popVisible" class="ZLPipeline-Pop-Container">
        <div class="ZLPipeline-popControls" @click="closePop"><el-icon><CloseBold /></el-icon></div>
        <div class="ZLPipeline-Pop-Bar">
            <div class="ZLPipeline-Pop-Bar-Title"><el-icon style="margin-right: 10px;"><Operation /></el-icon>{{ popMeta.title }} {{ langPack.sp.exec_result }}</div>
        </div>
        <div class="ZLPipeline-Pop-Content">
            <el-collapse style="padding-bottom: 50px;" v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="data in popStatusList" :name="data.title">    
                    <template #title>
                        <div style="flex: 1; text-align: start; display: flex; align-items: center; justify-content: start;">
                            <el-tag type="success" class="status" v-if="!data.data.impact.length">{{ langPack.sp.success }}</el-tag>
                            <el-tag type="error" class="status" v-else>{{ langPack.sp.failed }}</el-tag>
                            {{ data.title }}
                        </div>
                        <div style="font-size: small;">{{ data.time }}</div>
                    </template>
                    <!-- <div style="white-space: pre">{{ data.data }}</div> -->
                     <div class="collapse-item" v-if="data.data.msg != ''">
                        <div class="collapse-item-title" >{{ langPack.sp.msg }}</div>
                        <div class="collapse-msg" >{{ data.data.msg }}</div>
                     </div>
                     <div class="collapse-impact" v-if="data.data.impact.length">
                        <el-divider />
                        <div class="collapse-item-title" >{{ langPack.sp.impact }}</div>
                        <el-tag class="collapse-impact-item" type="danger" v-for="ipt in data.data.impact">{{ ipt }}</el-tag>
                     </div>
                     <div class="collapse-item" v-if="data.data.advice != ''">
                        <el-divider />
                        <div class="collapse-item-title" >{{ langPack.sp.advice }}</div>
                        <div class="collapse-advice" >{{ data.data.advice }}</div>
                     </div>
                </el-collapse-item>
                <el-collapse-item v-show="popStatusList.length == 0" :title="langPack.sp.no_item" name="1">
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import enUS from '@/locales/enUS';
import zhCN from '@/locales/zhCN';
import { 
    CloseBold,
    Operation
} from '@element-plus/icons-vue';

const activeNames = ref([])
const popContainer = ref<any>()
const blackCover = ref<any>()
const handleChange = (val: string[]) => {
  emit('onChange', val)
  return
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
                title: '',
                time: '',
                data: {
                	"msg": "",
                	"impact": [],
                	"advice": ""
                }
            }
        ]
    },
    lang: {
        type: String,
        default: 'zhCN'
    }
})

console.log(props)
const langPack = ref(zhCN)

let localLangList = ['zhCN', 'enUS']
if (localLangList.includes(props.lang)) {
    langPack.value = (props.lang == 'zhCN')? zhCN : enUS
}
else {
    langPack.value = zhCN
}

const emit = defineEmits(['onClose', 'onChange'])

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

// 添加 Esc 监听事件
onMounted(() => {
    document.addEventListener('keyup', (e) => {
        if (e.keyCode == 27) {
            closePop()
        }
    })
})
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
        opacity: 0;
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
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

.collapse-item {
    width: 100%;
}

.collapse-impact {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
}

.collapse-impact-item {
    margin-right: 5px;
}

.collapse-item-title {
    width: 100%;
    font-size: 1.1rem;
    margin-bottom: 5px;
}

.status {
    margin-right: 10px;
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

:deep(.el-divider--horizontal) {
    margin-top: 10px; 
    margin-bottom: 5px;
}
</style>