<template>
  <div class="center">
    <el-icon class="ZLPipeline-Title-Icon"><Promotion /></el-icon>
    <div class="ZLPipeline-Title">ZL Pipeline Component</div>
    <div>
      <el-button 
        size="large" 
        type="primary" 
        @click="pipelineVis=true"
        :icon="StarFilled"
        round
      >
        Preview ZL Pipeline
      </el-button>
      <el-button 
        size="large" 
        type="success" 
        @click="manageVis=true"
        :icon="Management"
        round
      >
        Preview ZL Manage
      </el-button>
    </div>
    <div class="ZLPipeline-Buttom">
      Version 1.0.7 (0927) <a href="https://github.com/Tyuwwe/ZL-Pipeline">Github</a>
    </div>
  </div>

  <ZLPipeline 
    :pipelineVisible="pipelineVis"
    :bShowEditModeButton="false"
    :bAllowEditPopover="false"
    :graphData="pipelineData"
    @onClose="closePipeline"
  />

  <ZLPipelineManage 
    :pipelineVisible="manageVis" 
    :graphData="pipelineManageData"
    @onClose="closeManage"
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

function closePipeline() {
  pipelineVis.value = false
}

function closeManage() {
  manageVis.value = false
}

const pipelineData = ref([
    {
        name: '节点1',
        description: '示例节点描述1，该节点可以进行若干操作',
        status: 'finished',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点2',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点3',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点4',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点5',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点6',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点7',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '结果1',
                text: '[2024-09-13T06:59:57.530Z] 操作1 已完成'
            },
            {
                title: '执行脚本',
                text: '[2024-09-13T06:59:57.789Z] 脚本已执行'
            },
            {
                title: '打印数据',
                text: "[2024-09-13T07:22:34.053Z] 数据已打印"
            },
            {
                title: '读取JSON',
                text: ''
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
                text: '[2024-09-13T07:22:34.093Z] 是否启动'
            },
            {
                title: '测试网络连接',
                text: '[2024-09-13T06:59:57.789Z] 已测试'
            },
            {
                title: '等待输入',
                text: ''
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
                description: '描述',
                status: 'waiting',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点2',
                description: '描述',
                status: 'error',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点3',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            }
        ],
        result: [
            {
                title: '示例结果',
                text: '[2024-09-13T21:10:37.210Z] 展示成功'
            },
            {
                title: '等待输入',
                text: ''
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
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点2',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '节点执行状态',
                text: '[2024-09-13T21:12:01.173Z] 已完成'
            },
        ]
    },
])

const pipelineManageData = ref([
    {
        name: '节点1',
        description: '示例节点描述1，该节点可以进行若干操作',
        status: 'finished',
        is_enable: true,
        child: [
            {
                name: '子节点1',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点2',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点3',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点4',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点5',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点6',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点7',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '结果1',
                text: '[2024-09-13T06:59:57.530Z] 操作1 已完成'
            },
            {
                title: '执行脚本',
                text: '[2024-09-13T06:59:57.789Z] 脚本已执行'
            },
            {
                title: '打印数据',
                text: "[2024-09-13T07:22:34.053Z] 数据已打印"
            },
            {
                title: '读取JSON',
                text: ''
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
                text: '[2024-09-13T07:22:34.093Z] 是否启动'
            },
            {
                title: '测试网络连接',
                text: '[2024-09-13T06:59:57.789Z] 已测试'
            },
            {
                title: '等待输入',
                text: ''
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
                description: '描述',
                status: 'waiting',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点2',
                description: '描述',
                status: 'error',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点3',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            }
        ],
        result: [
            {
                title: '示例结果',
                text: '[2024-09-13T21:10:37.210Z] 展示成功'
            },
            {
                title: '等待输入',
                text: ''
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
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '子节点2',
                description: '描述',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '节点执行状态',
                text: '[2024-09-13T21:12:01.173Z] 已完成'
            },
        ]
    },
])

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
