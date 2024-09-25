<template>
  <div class="center">
    <el-icon class="ZLPipeline-Title-Icon"><Promotion /></el-icon>
    <div class="ZLPipeline-Title">ZL Pipeline Component</div>
    <div>
      <el-button 
        size="large" 
        type="primary" 
        @click="pipelineVis=true"
        icon="StarFilled"
        round
      >
        Preview ZL Pipeline
      </el-button>
      <el-button 
        size="large" 
        type="success" 
        @click="manageVis=true"
        icon="Management"
        round
      >
        Preview ZL Manage
      </el-button>
    </div>
    <div class="ZLPipeline-Buttom">
      Version 0925 <a href="https://github.com/Tyuwwe/ZL-Pipeline">Github</a>
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
import ZLPipeline from './components/ZLPipeline/ZLPipeline.vue';
import ZLPipelineManage from './components/ZLPipeline-Manage/ZLPipelineManege.vue';

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
                game_type: [],
                is_enable: true,
            },
            {
                name: '客户端资源校验',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '客户端资源上传',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '服务端资源同步rsync服务器',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '服务端资源同步服务器srcfiles',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '资料片资源校验',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '资料片资源上传',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '关闭zabbix监控',
                description: 'Sample Desc',
                status: 'error',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '设置事件中心静默',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '推送维护状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '停服检查',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
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
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '推送客户端版本文件',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '启服检查',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '生成开放状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '开启zabbix监控',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '取消事件中心静默',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '更新工单状态',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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

const pipelineManageData = ref([
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '客户端资源校验',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '客户端资源上传',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '服务端资源同步rsync服务器',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '服务端资源同步服务器srcfiles',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '资料片资源校验',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '资料片资源上传',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '关闭zabbix监控',
                description: 'Sample Desc',
                status: 'error',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '设置事件中心静默',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '推送维护状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '停服检查',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
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
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '推送客户端版本文件',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '启服检查',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '生成开放状态ServerList',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
                game_type: [],
                is_enable: true,
            },
            {
                name: '开启zabbix监控',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '取消事件中心静默',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
                is_enable: true,
            },
            {
                name: '更新工单状态',
                description: 'Sample Desc',
                status: 'finished',
                order: 1,
                game_type: [],
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
