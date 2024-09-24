<template>
    <div 
        v-show="pipelineVisible" 
        ref="pipelineContainer" 
        class="ZLPipeline-Container"
        @click="closeContextMenu"
        @contextmenu.prevent.stop=""
    >
        <div class="ZLPipeline-Control" @click="closePipelineGraph"><el-icon><CloseBold /></el-icon></div>
        <div class="ZLPipeline-Bar">
            <el-icon class="ZLPipeline-Bar-Icon"><Promotion /></el-icon>
            <div class="ZLPipeline-TitleBox">
                <div class="ZLPipeline-Title">ZL Pipeline Example</div>
                <div class="ZLPipeline-sTitle">A better pipeline.</div>
            </div>
        </div>
        <div style="overflow-x: auto;" class="ZLPipeline-Graph">
            <div ref="nodesContainer" class="ZLPipeline-Nodes">
                <div class="ZLPipeline-Node">
                    <div class="ZLPipeline-Node-Top ZLPipeline-Node-Top-SE">
                        <div class="ZLPipeline-Node-Name">开始 <el-icon><CaretRight /></el-icon></div>
                        <div class="ZLPipeline-Node-Desc">Start</div>
                    </div>w
                </div>
                <div 
                    v-for="node in pipelineData" 
                    :key="node.name" 
                    class="ZLPipeline-Node"
                    @contextmenu.prevent.stop="openContextMenu($event, node)"
                >     
                    <div v-if="bEditingMode" class="ZLPipeline-Node-Top Node-Editing" @click="addNode(node)">
                        <div class="ZLPipeline-Node-Status">编辑中</div>
                        <div v-if="node.name.length <= 7" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else-if="node.name.length <= 9" style="font-size: 1.25rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else style="font-size: 1rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div class="ZLPipeline-Node-Desc">{{ node.description }}</div>

                    </div>
                    <div v-else-if="node.is_enable" :class="nodeClassEnum[node.status]" @click="openPop(node)">
                        <div class="ZLPipeline-Node-Status">{{ nodeStatusEnum[node.status] }}</div>
                        <div v-if="node.name.length <= 7" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else-if="node.name.length <= 9" style="font-size: 1.25rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else style="font-size: 1rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <el-popover
                            placement="top"
                            title="备注"
                            :width="200"
                            trigger="hover"
                            :content="node.description"
                            transition="el-zoom-in-top"
                            popper-style="border-radius: 20px 20px 0px 0px; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC';"
                        >
                            <template #reference>
                                <div class="ZLPipeline-Node-Desc">{{ node.description }}</div>
                            </template>
                        </el-popover>
                    </div>
                    <div v-else class="ZLPipeline-Node-Top Node-Disabled">
                        <div class="ZLPipeline-Node-Status">已禁用</div>
                        <div v-if="node.name.length <= 7" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else-if="node.name.length <= 9" style="font-size: 1.25rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else style="font-size: 1rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <el-popover
                            placement="top"
                            title="备注"
                            :width="200"
                            trigger="hover"
                            :content="node.description"
                            transition="el-zoom-in-top"
                            popper-style="border-radius: 20px 20px 0px 0px; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC';"
                        >
                            <template #reference>
                                <div class="ZLPipeline-Node-Desc">{{ node.description }}</div>
                            </template>
                        </el-popover>
                    </div>
                    <div v-if="bEditingMode" class="ZLPipeline-Node-Bottom">
                        <div 
                            v-for="child in node.child" 
                            class="ZLPipeline-Node-ChildNode"
                        >
                            <div class="ZLPipeline-Node-ChildNode-Name">{{ child.name }}</div>
                        </div>
                        <el-icon class="ZLPipeline-Node-Bottom-Endline" @click="deletePop(node)"><SemiSelect class="ZLPipeline-Node-Bottom-Endline-Left-Editing" /><SemiSelect class="Endline-Editing" /></el-icon>
                    </div>
                    <div v-else-if="node.is_enable" class="ZLPipeline-Node-Bottom">
                        <div 
                            v-for="child in node.child" 
                            :class="nodeChildClassEnum[child.status]"
                        >
                            <div v-if="child.is_enable" class="ZLPipeline-Node-ChildNode-Name">{{ child.name }}</div>
                            <div v-else class="ZLPipeline-Node-ChildNode-Name" style="color: #c1c1c1;">{{ child.name }}</div>
                        </div>
                        <el-icon class="ZLPipeline-Node-Bottom-Endline" @click="openNodePop(node)"><SemiSelect class="ZLPipeline-Node-Bottom-Endline-Left" /><SemiSelect /></el-icon>
                    </div>
                    <div v-else class="ZLPipeline-Node-Bottom Node-Disabled">
                        <div 
                            v-for="child in node.child" 
                            :class="nodeChildClassEnum[child.status]"
                        >
                            <div v-if="child.is_enable" class="ZLPipeline-Node-ChildNode-Name">{{ child.name }}</div>
                            <div v-else class="ZLPipeline-Node-ChildNode-Name" style="color: #c1c1c1;">{{ child.name }}</div>
                        </div>
                        <el-icon class="ZLPipeline-Node-Bottom-Endline" @click="openNodePop(node)"><SemiSelect class="ZLPipeline-Node-Bottom-Endline-Left" /><SemiSelect /></el-icon>
                    </div>
                </div>
                <div class="ZLPipeline-Node">
                    <div class="ZLPipeline-Node-Top ZLPipeline-Node-Top-SE">
                        <div class="ZLPipeline-Node-Name"><el-icon><CaretLeft /></el-icon> 结束</div>
                        <div class="ZLPipeline-Node-Desc">End</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ZLPipeline-Display">
            <el-icon @click="scaleGraph(1)" class="ZLPipeline-Zoom-Icons"><ZoomIn /></el-icon>
            放大倍率：{{ scaleSize.toFixed(2) }}x
            <el-icon @click="scaleGraph(-1)" class="ZLPipeline-Zoom-Icons"><ZoomOut /></el-icon>
        </div>
        <div class="ZLPipeline-Tips">使用 <span class="ZLPipeline-Key">Shift</span> + <img class="hintIcon" :src="mouseScroll" alt="scroll-svg" /> 横向滚动</div>
        <div v-show="contextVis" ref="contextMenu" class="ZLPipeline-ContextMenu">
            <div class="ZLPipeline-ContextMenu-Title">
                <div class="ZLPipeline-ContextMenu-Title-Text">当前节点</div>
                <div class="ZLPipeline-ContextMenu-Title-Node">{{ contextMenuTarget.name }}</div>
            </div>
            <div class="ZLPipeline-ContextMenu-Item" @click="openNodePop"><el-icon class="ContextIcon"><Setting /></el-icon>节点设置</div>
            <div v-show="contextMenuTarget.is_enable" @click="openPop" class="ZLPipeline-ContextMenu-Item"><el-icon class="ContextIcon"><MessageBox /></el-icon>执行结果</div>
            <div v-show="contextMenuTarget.is_enable" @click="disableNode" class="ZLPipeline-ContextMenu-Item"><el-icon class="ContextIcon"><CircleClose /></el-icon>禁用此节点</div>
            <div v-show="!contextMenuTarget.is_enable" @click="enableNode" class="ZLPipeline-ContextMenu-Item"><el-icon class="ContextIcon"><CircleCheck /></el-icon>启用此节点</div>
        </div>
        <div @click="switchEditingMode" ref="editingControl" class="ZLPipeline-EditingControl">
            <div class="EditingControlText" v-if="bEditingMode" style="color: white;" >退出编辑模式</div>
            <div class="EditingControlText" v-else >进入编辑模式</div>
            <el-icon class="EditingControlIcon">
                <CircleClose class="iconSwitchAnim" v-if="bEditingMode" />
                <EditPen class="iconSwitchAnim" v-else />
            </el-icon>
        </div>
        <ZLPipelineStatusPop :popMeta="popMeta" :popStatusList="popStatusList" :pop-visible="popVis" @close="closePop" />
        <ZLPipelineNodePop :popMeta="contextMenuTarget" :pop-visible="popNodeVis" @close="closeNodePop" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ZLPipelineStatusPop from './ZLPipeline-StatusPop.vue';
import ZLPipelineNodePop from './ZLPipeline-NodePop.vue';
import { Message, MessageBox } from '@element-plus/icons-vue';
import mouseScroll from '@/assets/icon/mouseScroll.svg'
import type { RefSymbol } from '@vue/reactivity';
import { ElMessage } from 'element-plus';

const props = defineProps({
    pipelineVisible: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['close'])
const pipelineContainer = ref<any>()
const nodesContainer = ref<any>()
const contextMenu = ref<any>()
const editingControl = ref<any>()
const scaleSize = ref(1.0)
const popVis = ref(false)
const popNodeVis = ref(false)
const contextVis = ref(false)
const bEditingMode = ref(false)
const popStatusList = ref([])
const contextMenuTarget = ref<pipelineDS>({
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
const pipelineData = ref([
    {
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
                game_fn: [],
                is_enable: true,
            },
            {
                name: '客户端资源校验',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '客户端资源上传',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '服务端资源同步rsync服务器',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '服务端资源同步服务器srcfiles',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '资料片资源校验',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '资料片资源上传',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '同步版本',
                text: '[2024-09-12T06:59:57.530Z] 同步版本'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-12T06:59:57.789Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_sync_version.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240912145956_5f22a02c05204429828e0e89774c3288'
            },
            {
                title: 'Print Message',
                text: "[2024-09-12T07:22:34.053Z] {'code': 201, 'msg': '更新维护版本同步脚本--同步作业执行完毕', 'data': [{'action': '同步版本到对象存储和Rsync服务器', 'status': 'ok'}, {'action': '同步PC版本到对象存储', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '是否开始更新/维护操作',
        description: '本步骤为交互步骤;控制操作是否执行',
        status: 'running',
        is_enable: true,
        child: [],
        result: [
            {
                title: '是否开始维护',
                text: '[2024-09-12T07:22:34.093Z] 是否开始维护'
            },
            {
                title: 'Perform an HTTP Request and return a response object',
                text: '[2024-09-12T06:59:57.789Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_sync_version.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240912145956_5f22a02c05204429828e0e89774c3288'
            },
            {
                title: '等待交互式输入',
                text: ''
            }
        ]
    },
    {
        name: '关闭监控',
        description: '本步骤为标准步骤，包含了：1、关闭zabbix监控，2、关闭事件中心，3、关闭在线人数，4、关闭Prometheus',
        status: 'error',
        is_enable: true,
        child: [
            {
                name: '关闭BI人数监控',
                description: 'Sample Desc',
                status: 'waiting',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '关闭zabbix监控',
                description: 'Sample Desc',
                status: 'error',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '设置事件中心静默',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            }
        ],
        result: [
            {
                title: '关闭监控',
                text: '[2024-09-11T21:10:37.210Z] 关闭监控'
            },
            {
                title: '等待交互式输入',
                text: ''
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:10:39.865Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_close_monitor.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:12:01.110Z] {'code': 201, 'msg': '更新维护关闭监控脚本--作业执行完毕', 'data': [{'action': '添加zabbix维护周期', 'status': 'ok'}, {'action': '检查zabbix维护周期', 'status': 'ok'}, {'action': '添加海王星维护周期', 'status': 'ok'}, {'action': '关闭bi人数监控', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '是否开始停服',
        description: '本步骤为交互步骤;控制操作是否执行',
        status: 'waiting',
        is_enable: true,
        child: [],
        result: []
    },
    {
        name: '设置维护状态(维护)',
        description: '本步骤为标准步骤，包含了：1、生成维护状态客户端列表，2、推送客户端列表到线上',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '生成维护状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '推送维护状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '设置维护状态',
                text: '[2024-09-11T21:12:01.173Z] 设置维护状态'
            },
            {
                title: '等待交互式输入',
                text: `[2024-09-11T21:12:01.186Z] KRLZGWY-正式服更新维护--是否继续执行
[2024-09-11T21:12:01.186Z] OK or Abort
[2024-09-11T21:19:57.747Z] Approved by admin`
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:19:58.013Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_start_maintain_status.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:20:03.210Z] {'code': 201, 'msg': '更新维护设置维护状态脚本--设置项目维护状态完毕', 'data': [{'action': '设置维护状态', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '停服',
        description: '本步骤为自定义步骤，包含了：1、业务程序关停，2、关停检查',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '停服',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '停服检查',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '停服',
                text: '[2024-09-11T21:20:03.265Z] 停服'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:20:03.529Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_stop_service.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:23:09.786Z] {'code': 201, 'msg': '更新维护停服--停服作业执行完毕', 'data': [{'action': '关闭web储值', 'status': 'ok'}, {'action': '停gate服务', 'status': 'ok'}, {'action': '停dragon服务', 'status': 'ok'}, {'action': '停cross服务', 'status': 'ok'}, {'action': '停roleinfo_proxy服务', 'status': 'ok'}, {'action': '停roleinfo服务', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '数据库备份',
        description: '本步骤为自定义步骤，包含了：1、备份云端数据库，2、备份本地数据库',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '云数据库备份',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '数据库备份',
                text: '[2024-09-11T21:23:09.835Z] 数据库备份'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:23:10.095Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_db_backup.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:24:17.602Z] {'code': 201, 'msg': '更新维护数据库备份--备份作业执行完毕', 'data': [{'action': '备份', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '更新服务端版本',
        description: '本步骤为自定义步骤，包含了：1、服务端版本更新',
        status: 'waiting',
        is_enable: false,
        child: [
            {
                name: '服务端版本更新',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '更新服务端',
                text: '[2024-09-11T21:24:17.653Z] 更新服务端'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:24:17.913Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_server_update_version.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:24:49.841Z] {'code': 201, 'msg': '更新维护同步版本到线上--同步作业执行完毕', 'data': [{'action': '同步服务端版本到线上目录', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '更新客户端版本文件',
        description: '本步骤为标准步骤，包含了：1、生成客户端版本文件,2、更新客户端版本文件',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '生成客户端版本文件',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '推送客户端版本文件',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '更新客户端版本文件',
                text: '[2024-09-11T21:24:49.889Z] 更新客户端版本文件'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:24:50.152Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_client_update_version.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:24:55.349Z] {'code': 201, 'msg': '更新维护同步客户端版本到线上--同步作业执行完毕', 'data': [{'action': '生成客户端版本到zk', 'status': 'ok'}, {'action': '推送客户端版本到线上', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '更新资料片版本文件',
        description: '本步骤为标准步骤，包含了：1、资料片版本文件更新：AutoPatch、GameVersion、InstallVersion、LauncherVersion',
        status: 'waiting',
        is_enable: true,
        child: [],
        result: []
    },
    {
        name: '是否开始启服(对内)',
        description: '本步骤为交互步骤;控制操作是否执行',
        status: 'waiting',
        is_enable: true,
        child: [],
        result: [
            {
                title: '等待交互式输入',
                text: `[2024-09-11T21:24:55.435Z] KRLZGWY-正式服更新维护--是否继续执行
[2024-09-11T21:24:55.435Z] OK or Abort
[2024-09-11T21:24:57.623Z] Approved by admin`
            }
        ]
    },
    {
        name: '启服',
        description: '本步骤为自定义步骤，包含了：1、业务程序启动，2、启动检查',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '启服',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '启服检查',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '启服',
                text: '[2024-09-11T21:24:55.423Z] 启服'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:24:57.889Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_start_service.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:33:19.155Z] {'code': 201, 'msg': '更新维护启服--启服作业执行完毕', 'data': [{'action': 'roleinfo启服', 'status': 'ok'}, {'action': 'roleinfo启服检查', 'status': 'ok'}, {'action': 'roleinfo_proxy启服', 'status': 'ok'}, {'action': 'roleinfo_proxy启服检查', 'status': 'ok'}, {'action': 'cross启服', 'status': 'ok'}, {'action': 'cross启服检查', 'status': 'ok'}, {'action': 'dragon启服', 'status': 'ok'}, {'action': 'dragon启服检查', 'status': 'ok'}, {'action': 'gate启服', 'status': 'ok'}, {'action': 'gate启服检查', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '是否对外',
        description: '本步骤为交互步骤;控制操作是否执行',
        status: 'waiting',
        is_enable: true,
        child: [],
        result: [
            {
                title: '等待交互式输入',
                text: `[2024-09-11T21:58:17.332Z] KRLZGWY-正式服更新维护--是否继续执行
[2024-09-11T21:58:17.332Z] OK or Abort
[2024-09-11T21:58:23.429Z] Approved by admin`
            },
        ]
    },
    {
        name: '关闭维护状态(对外)',
        description: '本步骤为标准步骤，包含了：1、生成对外状态客户端列表，2、推送客户端列表到线上',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '推送开放状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '生成开放状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '对外开放',
                text: '[2024-09-11T21:58:17.320Z] 对外开放'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:58:23.698Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_close_maintain_status.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:58:31.726Z] {'code': 201, 'msg': '更新维护设置维护状态脚本--设置项目维护状态完毕', 'data': [{'action': '设置对外维护状态', 'status': 'ok'}, {'action': '开启web储值', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            }
        ]
    },
    {
        name: '开启监控',
        description: '本步骤为标准步骤，包含了：1、关闭zabbix维护周期，2、关闭事件中心维护周期，3、开启在线人数，4、开启Prometheus',
        status: 'waiting',
        is_enable: true,
        child: [
            {
                name: '开启BI人数监控',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '开启zabbix监控',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '取消事件中心静默',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
            {
                name: '更新工单状态',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_fn: [],
                is_enable: true,
            },
        ],
        result: [
            {
                title: '开启监控',
                text: '[2024-09-11T21:58:31.812Z] 开启监控'
            },
            {
                title: 'Shell Script',
                text: '[2024-09-11T21:58:32.073Z] + /root/.pyenv/versions/env368/bin/python3 /data1/celery_tasks/scripts/maintainserver/steps/script_maintain_start_monitor.py /data1/celery_tasks/scripts/maintainserver/create/KRLZGWY_20240911205203_2bff6b79807e4d8f9413f92f26eea46a'
            },
            {
                title: 'Print Message',
                text: "[2024-09-11T21:58:44.174Z] {'code': 201, 'msg': '更新维护开启监控脚本--同步作业执行完毕', 'data': [{'action': '删除zabbix维护周期', 'status': 'ok'}, {'action': '删除海王星维护周期', 'status': 'ok'}, {'action': '开启BI人数监控', 'status': 'ok'}]}"
            },
            {
                title: 'Read JSON from files in the workspace.',
                text: ''
            },
            {
                title: 'Print Message',
                text: '[2024-09-11T21:58:44.242Z] ========pipeline executed successfully========'
            },
            {
                title: 'Perform an HTTP Request and return a response object',
                text: ''
            }
        ]
    },
])

interface pipelineDS {
    name: string,
    description: string,
    status: string,
    is_enable: boolean,
    child: object,
    result: object
}

const scaleGraph = (scale: number) => {
    if (scale > 0 && scaleSize.value < 1) {
        scaleSize.value += 0.05
        nodesContainer.value.style.scale = scaleSize.value
    }
    else if (scale < 0 && scaleSize.value > 0.05) {
        scaleSize.value -= 0.05
        nodesContainer.value.style.scale = scaleSize.value
    }
}

function openPop(node: any = null) {
    if (bEditingMode.value) {
        console.log(node)
        node.target.style.marginRight = "200px"
        return
    }
    if (node.name) {
        popMeta.value.title = node.name
        popStatusList.value = node.result ? node.result : []
    }
    popVis.value = true
}

function closePop() {
    popVis.value = false
}

function openNodePop(node: any = null) {
    if (bEditingMode.value) {
        ElMessage('当前为编辑模式，无法使用此操作')
        return
    }
    if (node.name) contextMenuTarget.value = node
    popNodeVis.value = true
}

function closeNodePop() {
    popNodeVis.value = false
}

function disableNode() {
    contextMenuTarget.value.is_enable = false;
}

function enableNode() {
    contextMenuTarget.value.is_enable = true;
}

const openContextMenu = (e: MouseEvent, node: any) => {
    if (bEditingMode.value) {
        ElMessage('当前为编辑模式，无法使用此操作')
        return
    }
    popMeta.value.title = node.name
    popStatusList.value = node.result
    contextVis.value = true
    contextMenuTarget.value = node
    contextMenu.value.style.left = e.clientX + 'px'
    contextMenu.value.style.top = e.clientY + 'px'
    contextMenu.value.style.transform = ''
    let viewWidth = e.view?.innerWidth ? e.view?.innerWidth : 1280
    if (150 + e.clientX > viewWidth) {
        contextMenu.value.style.transform = 'translateX(-100%)'
    }
}

function closeContextMenu() {
    contextMenu.value.style.opacity = 0
    contextMenu.value.style.height = "100px"
    setTimeout(() => {
        contextMenu.value.style.opacity = 1
        contextMenu.value.style.height = ""
        contextVis.value = false
    }, 200)
}

function closePipelineGraph() {
    pipelineContainer.value.style.transform = "scale(0.95)"
    pipelineContainer.value.style.opacity = "0"
    setTimeout(() => {
        emit('close')
        pipelineContainer.value.style.transform = ""
        pipelineContainer.value.style.opacity = ""
    }, 300)
}

function switchEditingMode() {
    if (bEditingMode.value) {
        editingControl.value.style.backgroundColor = ""
        ElMessage('已退出编辑模式')
    }
    else {
        editingControl.value.style.backgroundColor = "darkred"
        ElMessage('已进入编辑模式')
    }
    bEditingMode.value = !bEditingMode.value 
}

function addNode(targetNode: any) {
    for (let i = 0; i < pipelineData.value.length; ++i) {
        if (pipelineData.value[i] == targetNode) {
            const newNode = {
                name: '节点' + (Math.random() * 10000).toFixed(0),
                description: '描述',
                status: 'finished',
                is_enable: true,
                child: [],
                result: []
            }
            pipelineData.value.splice(i + 1, 0, newNode)
            return
        }
    }
}

function deletePop(targetNode: any) {
    for (let i = 0; i < pipelineData.value.length; ++i) {
        if (pipelineData.value[i] == targetNode) {
            pipelineData.value.splice(i, 1)
            return
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

const nodeClassEnum: statusEnum = {
    'finished': 'ZLPipeline-Node-Top Node-Finished',
    'running': 'ZLPipeline-Node-Top Node-Running',
    'waiting': 'ZLPipeline-Node-Top Node-Waiting',
    'error': 'ZLPipeline-Node-Top Node-Error',
}

const nodeChildClassEnum: statusEnum = {
    'finished': 'ZLPipeline-Node-ChildNode Child-Node-Finished',
    'running': 'ZLPipeline-Node-ChildNode Child-Node-Running',
    'waiting': 'ZLPipeline-Node-ChildNode Child-Node-Waiting',
    'error': 'ZLPipeline-Node-ChildNode Child-Node-Error',
}

const nodeStatusEnum: statusEnum = {
    'finished': '已结束',
    'running': '运行中',
    'waiting': '等待中',
    'error': '执行出错',
}

</script>

<style lang="less" scoped>
@keyframes showPipeline {
    0% {
        opacity: 0;
        transform: translateY(0vh) scale(0.95);
    }
    100% {
        opacity: 1;
        transform: translateY(0vh) scale(1);
    }
}

@keyframes animNode {
    0% {
        background-position: 0px 0px;
    }
    50% {
        background-position: 100% 0px;
    }
    100% {
        background-position: 0px 0px;
    }
}

@keyframes showContext {
    0% {
        width: 150px;
        height: 0px;
        opacity: 1;
    }
    100% {
        width: 150px;
        height: 200px;
        opacity: 1;
    }
}

.ZLPipeline-Control,
.ZLPipeline-Bar,
.ZLPipeline-TitleBox,
.ZLPipeline-Nodes,
.ZLPipeline-Node-Top,
.ZLPipeline-Node-Top-SE,
.ZLPipeline-Node-Bottom,
.ZLPipeline-Node-ChildNode,
.ZLPipeline-Graph,
.ZLPipeline-Display,
.ZLPipeline-Zoom-Icons,
.ZLPipeline-ContextMenu,
.ZLPipeline-ContextMenu-Item,
.ZLPipeline-ContextMenu-Title,
.ZLPipeline-EditingControl {
    display: flex;
    align-items: center;
    justify-content: center;
}

.ZLPipeline-Container {
    animation: showPipeline 0.3s;
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(225, 231, 235);
    overflow: hidden;
    transition-duration: 0.3s;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC', sans-serif;
}

.ZLPipeline-Container:has(.ZLPipeline-Control:hover) {
    background-color: #dee4e94d;
}

.ZLPipeline-Control {
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 10px;
    width: 20px;
    height: 20px;
    border-radius: 100px;
    font-size: 1.75rem;
    transition-duration: 0.5s;
    cursor: pointer;
}

.ZLPipeline-Control:hover {
    padding: 15px;
    right: 15px;
    top: 15px;
    background-color: rgb(203, 213, 222);
}

.ZLPipeline-Control:active {
    transition-duration: 0s;
    background-color: rgb(167, 176, 184);
}

.ZLPipeline-Bar {
    width: 100vw;
    height: auto;
    box-sizing: border-box;
    background-color: rgb(210, 219, 226);
    justify-content: start;
    padding: 20px;
}

.ZLPipeline-Bar-Icon {
    font-size: 3rem;
    margin: -20px;
    margin-left: 0px;
    color: rgb(190, 201, 210);
}

.ZLPipeline-TitleBox {
    flex-direction: column;
    align-items: start;
    z-index: 999;
}

.ZLPipeline-Title {
    font-size: 1.5rem;
    font-weight: bolder;
}

.ZLPipeline-sTitle {
    font-size: 0.9rem;
    font-weight: lighter;
    color: rgb(90, 99, 106);
}

.ZLPipeline-Graph {
    position: absolute;
    display: flex;
    justify-content: start;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
    height: calc(100vh - 95px);
    max-height: calc(100vh - 95px);
}

.ZLPipeline-Nodes {
    width: auto;
    align-items: start;
    justify-content: end;
}

@keyframes nodeIn {
    0% {
        width: 0px;
    }
    100% {
        width: 200px;
    }
}

.ZLPipeline-Node {
    animation: nodeIn .5s;
    height: auto;
    width: 200px;
    margin: 10px;
    border-radius: 20px;
    background-color: rgb(237, 237, 237);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition-duration: .2s;
}

.ZLPipeline-Node-Top {
    height: 150px;
    width: 200px;
    background: linear-gradient(45deg,#ffffff 0%,#cacaca 100%); 
    flex-direction: column;
    justify-content: end;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    transition-duration: 0.5s;
    border-radius: 20px 20px 0 0;
}

.ZLPipeline-Node-Top:hover {
    filter: brightness(1.1);
    background-size: 200%;
}

.ZLPipeline-Node-Top-SE {
    border-radius: 20px;
}

.ZLPipeline-Node-Name {
    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
}

.ZLPipeline-Node-Desc {
    width: 100%;
    overflow: hidden;
    font-size: 0.75rem;
    text-overflow:ellipsis; 
    white-space: nowrap;
}

.ZLPipeline-Node-Bottom {
    width: 200px;
    flex-direction: column;
    justify-content: start;
}

.ZLPipeline-Node-ChildNode {
    width: 100%;
    height: 40px;
    border-bottom: 2px solid rgb(197, 197, 197);
}

.ZLPipeline-Node-ChildNode:hover {
    background-color: #00000010;
}

.ZLPipeline-Node-ChildNode-Name {
    text-align: center;
    font-size: 0.9rem;
}

.ZLPipeline-Node-Bottom-Endline {
    width: 100%;
    height: 20px;
    transition-duration: 0.5s;
    cursor: pointer;
    color: #818181;
    transition: color 0.2s, background-color 0.5s, transform 0.2s;
}

.Endline-Editing {
    transform: rotate(0deg);
}

.ZLPipeline-Node-Bottom-Endline-Left-Editing {
    margin-right: -16px;
    transition: color 0.2s, background-color 0.5s, transform 0.2s;
}

.ZLPipeline-Node-Bottom-Endline:has(.Endline-Editing):hover {
    background-color: rgba(206, 0, 0, 0.05);
}

.ZLPipeline-Node-Bottom-Endline:hover .Endline-Editing {
    transform: rotate(45deg);
    color: #ce0000;
}

.ZLPipeline-Node-Bottom-Endline:hover .ZLPipeline-Node-Bottom-Endline-Left-Editing {
    transform: rotate(-45deg);
    color: #ce0000;
}

.ZLPipeline-Node-Bottom-Endline-Left {
    margin-right: -16px;
    transition: color 0.2s, background-color 0.5s, transform 0.2s;
}

.ZLPipeline-Node-Bottom-Endline:hover {
    background-color: #e0e0e0;
    color: #000000;
}

.ZLPipeline-Node-Bottom-Endline:active {
    background-color: #d8d8d8;
    transition-duration: 0s;
}

.ZLPipeline-Node-Bottom-Endline:hover .ZLPipeline-Node-Bottom-Endline-Left {
    transform: rotate(90deg);
}

.ZLPipeline-Node-Status {
    flex: 1;
    font-size: 0.95rem;
    font-weight: lighter;
}

.Node-Finished {
    background: linear-gradient(28deg,#abd9bd 0%,#f1ffea 100%);
}

.Node-Running {
    background: linear-gradient(90deg,#F1F1F1 0%,#ecc666 50%,#F1F1F1 100%); 
    background-size: 2000%;
    animation: animNode 3s infinite; 
}

.Node-Waiting {
    background: linear-gradient(90deg,#f4f7ba 0%,#e9d0d0 100%); 
    background-size: 2000%;
    animation: animNode 5s infinite; 
}

.Node-Error  {
    background: linear-gradient(244deg,#c25254 0%,#750303 100%); 
    background-size: 2000%;
    animation: animNode 2s infinite; 
    color: white;
}

.Node-Disabled  {
    opacity: 0.3;
    transition-duration: 0.5s;
}

.Node-Disabled:hover  {
    opacity: 1;
}

.ZLPipeline-Node:has(.Node-Editing:hover) {
    margin-right: 120px;
}

@keyframes hintShow {
    0% { 
        opacity: 0;
    }
    100% { 
        opacity: 0.5;
    }
}

.Node-Editing:hover::after {
    animation: hintShow .4s;
    content: '点击\a即可在这里\a添加新节点';
    position: absolute;
    left: 210px;
    top: 30px;
    white-space: pre;
    opacity: 0.5;
    border: 1px dotted rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 10px;
}

.ZLPipeline-Display {
    position: absolute;
    left: 40px;
    bottom: 40px;
    font-size: 1.25rem;
    border: 2px solid rgb(160, 160, 160);
    color: rgb(100, 100, 100);
    border-radius: 200px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: bold;
    user-select: none;
}

.ZLPipeline-EditingControl {
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 150px;
    font-size: 1.25rem;
    border: 2px solid rgb(160, 160, 160);
    color: rgb(100, 100, 100);
    border-radius: 200px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: bold;
    cursor: pointer;
    transition-duration: .2s;
    overflow: hidden;
}

.ZLPipeline-EditingControl:hover {
    background-color: rgb(100, 100, 100);
}

.EditingControlText {
    padding: 10px;
    transition-duration: .2s;
}

.EditingControlIcon {
    margin-left: -1rem;
    opacity: 0;
    color: white;
    transition-duration: .2s;
}

.ZLPipeline-EditingControl:hover .EditingControlText {
    opacity: 0;
    transform: translateX(-63.5px);
}

.ZLPipeline-EditingControl:hover .EditingControlIcon {
    opacity: 1;
    transform: translateX(-63.5px);
}

@keyframes simpleShow {
    0% { 
        opacity: 0;
    }
    100% { 
        opacity: 1;
    }
}

.iconSwitchAnim {
    animation: simpleShow .2s;
}

.ZLPipeline-Zoom-Icons {
    margin: 5px;
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 100px;
    cursor: pointer;
}

.ZLPipeline-Zoom-Icons:hover {
    background-color: #cacaca;
}

.ZLPipeline-Zoom-Icons:active {
    background-color: #a8a8a8;
}

.ZLPipeline-Tips {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    font-weight: lighter;
    color: black;
    opacity: 0.3;
}

.ZLPipeline-Key {
    padding: 5px;
    border: 2.5px solid black;
    border-radius: 10px;
}

.ZLPipeline-ContextMenu {
    animation: showContext 0.2s;
    position: absolute;
    width: 150px;
    height: 200px;
    z-index: 1100;
    background-color: #e4e4e4;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 20px;
    transition-duration: 0.2s;
    flex-direction: column;
    justify-content: start;
    overflow: hidden; 
}

.ZLPipeline-ContextMenu-Title {
    width: 150px;
    height: 40px;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #00000010;
}

.ZLPipeline-ContextMenu-Title-Text {
    font-weight: bold;
    font-size: 1.05rem;
}

.ZLPipeline-ContextMenu-Title-Node {
    font-size: 0.75rem;
}

.ZLPipeline-ContextMenu-Item {
    width: 150px;
    height: 40px;
    transition-duration: 0.1s;
    cursor: pointer;
}

.ZLPipeline-ContextMenu-Item:hover {
    background-color: #c9c9c9;
}

.ContextIcon {
    margin-right: 5px;
}

.hintIcon {
    height: 2.3rem; 
    transform: translateY(10px);
}

@keyframes warningTextInf {
    0% {
        color: #ce0000;
    }
    50% {
        color: black;
    }
    100% {
        color: #ce0000;
    }
}

.Child-Node-Error {
    transition-duration: 0.2s;
    animation: warningTextInf 1s infinite;
    background-color: #74000010;
}

.Child-Node-Error:hover {
    background-color: #74000020;
}
</style>