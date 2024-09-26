<template>
    <div ref="blackCover" v-show="popVisible" @click="closePop" class="ZLPipeline-BlackCover"></div>
    <div ref="popContainer" v-show="popVisible" class="ZLPipeline-Pop-Container">
        <div class="ZLPipeline-popControls" @click="closePop"><el-icon><CloseBold /></el-icon></div>
        <div class="ZLPipeline-Pop-Bar">
            <div class="ZLPipeline-Pop-Bar-Title"><el-icon style="margin-right: 10px;"><Operation /></el-icon>编辑 {{ popMeta.name }}</div>
        </div>
        <div class="ZLPipeline-Pop-Content">
            <el-form :model="popMeta" label-width="auto" style="width: 90%; margin: auto;">
                <el-form-item label="是否跳过此节点">
                    <el-switch v-model="popMeta.is_enable" />
                </el-form-item>
                <el-form-item label="选择新子节点">
                    <div class="mt-4" style="display: flex; width: 100%;">
                        <el-select style="flex: 1; margin-right: 10px;" v-model="newChildSelection" placeholder="选择新子节点">
                            <el-option label="自定义-ROX-设置官方维护" value="1" />
                            <el-option label="自定义-ROX-设置混服维护" value="2" />
                            <el-option label="自定义-ROX-设置混服维护" value="3" />
                        </el-select>
                        <el-button type="primary">添加新节点</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="popMeta.description" type="textarea" />
                </el-form-item>
                <el-form-item label="子节点列表">
                    <el-table :data="popMeta.child" stripe class="childTable" empty-text="没有子节点">
                        <el-table-column prop="name" label="子节点名" width="140" />
                        <el-table-column prop="order" label="执行优先级" width="140">
                            <template #default="scope">
                                <el-input-number style="width: 100%;" v-model="scope.row.order" :min="1" :max="50" @change="handleChange" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="game_type" label="游戏功能" width="180">
                            <template #default="scope">
                                <el-select
                                v-model="scope.row.game_type"
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                placeholder="选择功能"
                                style="width: 100%"
                                >
                                <el-option
                                    v-for="item in gameTypeOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="80">
                            <template #default="scope">
                                {{ nodeStatusEnum[scope.row.status] }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_enable" label="是否启用" width="80">
                            <template #default="scope">
                                <el-switch
                                    v-model="scope.row.is_enable"
                                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949; margin-right: 5px;"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作" width="120">
                            <template #default="scope">
                                <div class="mb-4">
                                    <el-button type="danger" icon="Delete" style="height: 23px;" @click="deleteNode(scope.row)" round>删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div class="buttonBox">
                <el-button class="nodePopButton" type="primary" round>确定</el-button>
                <el-button class="nodePopButton" @click="closePop" round>取消</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const popContainer = ref<any>()
const blackCover = ref<any>()
const newChildSelection = ref()
const gameTypeOptions = ref(['hfop', 'gfop', 'gs', 'optest', 'qa'])

const props = defineProps({
    popVisible: {
        type: Boolean,
        default: false
    },
    popMeta: {
        type: Object,
        default: {
            name: '同步版本',
            description: '本步骤为标准步骤，包含了：1、服务端资源校验；2、客户端资源校验；3、资料片资源校验；4、同步客户端版本到对象存储，5、同步服务端版本到rsync，6、从rsync服务器同步版本到线上服务器的srcfile目录',
            status: 'finished',
            is_enable: true,
            child: [
                {
                    name: '服务端资源校验',
                    description: 'Sample Desc',
                    status: 'finished',
                    order: 1,
                    is_enable: true,
                    game_type: [],
                }
            ]
        }
    }
})

const emit = defineEmits(['close'])

function closePop() {
    blackCover.value.style.opacity = 0;
    popContainer.value.style.opacity = 0;
    popContainer.value.style.transform = "translate(-50%, -50%) scale(0.95)";

    setTimeout(() => {
        blackCover.value.style.opacity = 1;
        popContainer.value.style.opacity = 1;
        popContainer.value.style.transform = "";
        emit('close')
    }, 500)
}

function handleChange() {

}

function deleteNode(childNode: any) {
    for (let i in props.popMeta.child) {
        if (props.popMeta.child[i] == childNode) {
            props.popMeta.child.splice(i, 1)
        }
    }
}

interface statusEnum {
    [key: string]: string;
    finished: string;
    running: string;
    waiting: string;
    error: string;
}

const nodeStatusEnum: statusEnum = {
    'finished': '已结束',
    'running': '运行中',
    'waiting': '等待中',
    'error': '执行出错',
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

.childTable {
    width: 100%; 
    height: 200px;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
    transition-duration: 0.2s;
}

.childTable:hover {
    border: 1px solid #c4c7ce;
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
.ZLPipeline-Pop-Bar-Title,
.buttonBox {
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
    max-height: calc(100% - 40px);
    padding: 20px;
    overflow-y: auto;
    padding-top: 40px;
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

:deep(.el-tag.is-closable) {
    max-width: 100px !important;
}

.buttonBox {
    width: 100%;
}

.nodePopButton {
    width: 120px;
}
</style>