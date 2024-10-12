<template>
    <div class="center">
        <el-icon class="ZLPipeline-Title-Icon">
            <Promotion />
        </el-icon>
        <div class="ZLPipeline-Title">ZL Pipeline Component</div>
        <div>
            <el-button size="large" type="primary" @click="pipelineVis = true" :icon="StarFilled" round>
                Preview ZL Pipeline
            </el-button>
            <el-button size="large" type="success" @click="manageVis = true" :icon="Management" round>
                Preview ZL Manage
            </el-button>
        </div>
        <div class="ZLPipeline-Buttom">
            Version 1.1.4 (1012)
            <a href="https://github.com/Tyuwwe/ZL-Pipeline">Github</a>
            <a href="https://www.npmjs.com/package/zl-pipeline">NPM</a>
        </div>
    </div>

    <ZLPipeline 
    :pipelineVisible="pipelineVis" 
    :bShowEditModeButton="false" 
    :bAllowEditPopover="false"
    :graphData="pipelineData" 
    :pipelineMeta="pipelineMeta"
    lang="zhCN"
    @onClose="closePipeline" 
    @onClickOpenNode="openNodePop"
    @onClickOpenStatus="openStatusPop"
    />

    <ZLPipelineManage 
    :pipelineVisible="manageVis" 
    :pipelineMeta="pipelineMeta" 
    :graphData="pipelineManageData"
    lang="zhCN"
    @onClose="closeManage" 
    @onClickOpenNode="openNodePop"
    />

    <ZLPipelineNodePop 
    :popMeta="nodeMeta" 
    :popVisible="popNodeVis" 
    :gameTypeOptions="gameTypes"
    :gameChildNodesOptions="gameChild" 
    @onClose="closeNodePop" 
    />
    
    <ZLPipelineStatusPop 
    :popMeta="popMeta" 
    :popStatusList="popStatusList" 
    :popVisible="popVis" 
    lang="zhCN"
    @onClose="closeStatusPop" 
    />

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ZLPipeline from './components/ZLPipeline.vue';
import ZLPipelineManage from './components/ZLPipelineManage.vue';
import {
    Management,
    StarFilled,
    Promotion
} from '@element-plus/icons-vue';

const pipelineVis = ref(false)
const manageVis = ref(false)
const popNodeVis = ref(false)
const popVis = ref(false)
const nodeMeta = ref<pipelineDS>({
    name: 'Name',
    description: 'Desc',
    status: 'None',
    is_enable: true,
    child: [],
    result: []
})
const popMeta = ref({
    title: ''
})
const popStatusList = ref([])

interface pipelineDS {
    name: string,
    description: string,
    status: string,
    is_enable: boolean,
    child: object,
    result: object
}

function closePipeline() {
    pipelineVis.value = false
}

function closeManage() {
    manageVis.value = false
}

function openNodePop(popNode: pipelineDS) {
    nodeMeta.value = popNode
    popNodeVis.value = true
}

function openStatusPop(emitData: any) {
    popMeta.value = emitData.popMeta
    popStatusList.value = emitData.popStatusList
    popVis.value = true
}

function closeNodePop() {
    popNodeVis.value = false
}

function closeStatusPop() {
    popVis.value = false
}

const pipelineMeta = ref({
    title: 'Example Pipeline',
    sTitle: 'Example Pipeline Small Title'
})

const pipelineData = ref([
    {
        name: '节点1',
        description: '示例节点描述1，该节点可以进行若干操作',
        status: 'success',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                script: 'a_very_very_long_execute_script_name_used_as_an_example.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点2',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点3',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点4',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点5',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点6',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点7',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '结果1',
                time: '2024-09-13T06:59:57.530Z',
                data: {
                	msg: "操作1 已完成",
                	impact: ['192.168.1.1', '1.54.32.4'],
                	advice: "服务器升配"
                }
            },
            {
                title: '执行脚本',
                time: '2024-09-13T06:59:57.789Z',
                data: {
                	msg: "脚本已执行",
                	impact: [],
                	advice: ""
                }
            },
            {
                title: '打印数据',
                time: "2024-09-13T07:22:34.053Z",
                data: {
                	msg: "",
                	impact: [],
                	advice: ""
                }
            },
            {
                title: '读取JSON',
                time: '',
                data: {
                	msg: "",
                	impact: [],
                	advice: ""
                }
            }
        ]
    },
    {
        name: '节点2',
        description: '示例节点描述2，该节点可以进行若干操作',
        status: 'running',
        is_enable: true,
        child: [],
        result: [
            {
                title: '是否启动',
                time: '2024-09-13T07:22:34.093Z',
                data: {
                	msg: "是否启动",
                	impact: [],
                	advice: ""
                }
            },
            {
                title: '测试网络连接',
                time: '2024-09-13T06:59:57.789Z',
                data: {
                	msg: "已测试",
                	impact: [],
                	advice: ""
                }
            },
            {
                title: '等待输入',
                time: '',
                data: {
                	msg: "",
                	impact: [],
                	advice: ""
                }
            }
        ]
    },
    {
        name: '节点3',
        description: '示例节点描述3，该节点可以进行若干操作',
        status: 'error',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                script: 'test.py',
                description: '子节点描述',
                status: 'waiting',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点2',
                script: 'test.py',
                description: '子节点描述',
                status: 'error',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点3',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            }
        ],
        result: [
            {
                title: '示例结果',
                time: '2024-09-13T21:10:37.210Z',
                data: {
                	msg: "展示成功",
                	impact: [],
                	advice: ""
                }
            },
            {
                title: '等待输入',
                time: '',
                data: {
                	msg: "已测试",
                	impact: [],
                	advice: ""
                }
            }
        ]
    },
    {
        name: '节点4',
        description: '示例节点描述4，该节点可以进行若干操作',
        status: 'waiting',
        is_enable: true,
        child: [],
        result: []
    },
    {
        name: '节点5',
        description: '示例节点描述5，该节点可以进行若干操作',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点2',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '节点执行状态',
                time: '2024-09-13T21:12:01.173Z',
                data: {
                	msg: "已完成",
                	impact: [],
                	advice: ""
                }
            },
        ]
    },
])

const pipelineManageData = ref([
    {
        name: '节点1',
        description: '示例节点描述1，该节点可以进行若干操作',
        status: 'success',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点2',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点3',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点4',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点5',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点6',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点7',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
        ],
        result: []
    },
    {
        name: '节点2',
        description: '示例节点描述2，该节点可以进行若干操作',
        status: 'running',
        is_enable: true,
        child: [],
        result: []
    },
    {
        name: '节点3',
        description: '示例节点描述3，该节点可以进行若干操作',
        status: 'error',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                script: 'test.py',
                description: '子节点描述',
                status: 'waiting',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点2',
                script: 'test.py',
                description: '子节点描述',
                status: 'error',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点3',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            }
        ],
        result: []
    },
    {
        name: '节点4',
        description: '示例节点描述4，该节点可以进行若干操作',
        status: 'waiting',
        is_enable: true,
        child: [],
        result: []
    },
    {
        name: '节点5',
        description: '示例节点描述5，该节点可以进行若干操作',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
            {
                name: '子节点2',
                script: 'test.py',
                description: '子节点描述',
                status: 'success',
                order: 1,
                game_type: ['type1', 'type2'],
                is_enable: true,
            },
        ],
        result: []
    },
])

const gameTypes = ['Type1', 'Type2', 'Type3']
const gameChild = [
    {
        label: 'Option1',
        value: 'Option1'
    },
    {
        label: 'Option2',
        value: 'Option2'
    },
    {
        label: 'Option3',
        value: 'Option3'
    },
]

</script>

<style lang="less" scoped>
.center {
    margin: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background-color: aliceblue;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC', sans-serif;
}

.ZLPipeline-Title {
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: bolder;
    color: rgb(83, 103, 114);
}

.ZLPipeline-Title-Icon {
    font-size: 2rem;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgb(207, 216, 227);
    color: rgb(83, 103, 114);
}

.ZLPipeline-Title-Icon:hover {
    background-color: rgb(223, 231, 240);
}

.ZLPipeline-Buttom {
    position: absolute;
    bottom: 10px;
    font-size: 0.8rem;
    color: rgb(161, 175, 188);
}
</style>
