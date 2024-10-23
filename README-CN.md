<div align="center">

# ZL-Pipeline

#### 一个单行流水线组件库（开发中）

<img src="https://img.shields.io/badge/最新版-1.1.7-rgb(53,73,94).svg" alt="vue">
<img src="https://img.shields.io/badge/Vue3-rgb(53,73,94).svg" alt="vue">
<img src="https://img.shields.io/badge/TypeScript-rgb(21, 59, 115).svg" alt="vue">
<img src="https://img.shields.io/badge/Pipeline-rgb(21, 119, 115).svg" alt="vue">
<img src="https://img.shields.io/badge/ElementPlus-rgb(35, 129, 181).svg" alt="vue">

</div>

## 简介

> 语言: [[ENGLISH]](./README.md) | [中文]

> ZL-Pipeline 支持 English (enUS) 和 简体中文（zhCN）

**ZL-Pipeline** 是一个现代化的流水线前端组件库，灵感来自于 **Jenkins Blue Ocean** ，使用 **Element Plus** 
、 **Vue 3** 以及 **TypeScript** 环境编写。

对比 **Jenkins Blue Ocean**，**ZL-Pipeline** 更加轻量化、现代化，也更灵活。

该项目为公司内部需求定制，如果有特定需求难免无法完美满足要求。

ZL-Pipeline ***仍然在开发状态***，请在生产环境部署前谨慎测试。

## 预览

![overall](./image/overall.png "overall")

*流水线页面*

![edit](./image/edit.png "edit")

*节点编辑页面*

## 安装

### 快速安装

使用任何包管理器来安装，例如，使用 **NPM** 安装:

```shell
npm i zl-pipeline
```

### 依赖

任何必要的依赖项均列于下方，这些包会随着 `zl-pipeline` 的安装而自动安装：

```json
"dependencies": {
    "file-saver": "^2.0.5"
}
```

如果你想要在本地开发 `zl-pipeline` ，请安装如下 `devDependencies` 包：

```json
"devDependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "@tsconfig/node20": "^20.1.4",
    "@types/file-saver": "^2.0.7",
    "@types/node": "^20.14.5",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vue/tsconfig": "^0.5.1",
    "element-plus": "^2.8.1",
    "less": "^4.2.0",
    "npm-run-all2": "^6.2.0",
    "typescript": "~5.4.0",
    "unplugin-auto-import": "^0.18.3",
    "unplugin-icons": "^0.19.3",
    "unplugin-vue-components": "^0.27.4",
    "vite": "^5.3.1",
    "vite-plugin-dts": "^4.2.2",
    "vue": "^3.4.29",
    "vue-router": "^4.3.3",
    "vue-tsc": "^2.0.21"
}
```

## 使用方法

### 导入

如果需要使用 ZL-Pipeline 默认使用的字体（Noto Sans），可以在项目的 `index.html` 页面全局引入 Noto Sans。

> 对于 Apple 用户，ZL-Pipeline 将默认使用 `-apple-system` 字体

```html
// Google Fonts
<link href="https://fonts.googleapis.com/css?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">

// 镜像站
<link href="https://fonts.loli.net/css?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
```

仅需导入 `ZL-Pipeline`，`ElementPlus` 无需被导入：

```typescript
// main.ts
import './assets/main.css'

import { createApp } from 'vue'
// 导入 ZL-Pipeline CSS
import 'zl-pipeline/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
```

`ZL-Pipeline` 支持 Tree-Shaking（按需引入），因此使用引入单个组件非常方便：

```html
<script setup lang="ts">
    /* 在 script 中引入 */
    import { ZLPipeline, ZLPipelineManage } from 'zl-pipeline'
</script>
<template>
    /* 在 template 中使用，部分变量已被隐藏 */
    
    <ZLPipeline 
    :pipelineVisible="pipelineVis" 
    :bShowEditModeButton="true" 
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
    lang="zhCN"
    @onClose="closeNodePop" 
    />
    
    <ZLPipelineStatusPop 
    :popMeta="popMeta" 
    :popStatusList="popStatusList" 
    :popVisible="popVis" 
    @onClose="closeStatusPop" 
    />
</template>
```

### 可用的参数以及回调

在 ZL-Pipeline 中，你可以使用四种组件：

* ZLPipeline : 有实时状态的，带有可选的编辑功能的主流水线。
* ZLPipelineManage : 没有实时状态，但是可以编辑节点的流水线。
* ZLPipeline-StatusPop : 展示节点运行状态。
* ZLPipeline-NodePop : 修改节点的子节点。

这些组件都会接受特定形式的参数：

#### 输入：

* **:pipelineVisible** :
  * 类型：`Boolean`
  * 描述：控制组件显示
  * 可用组件：ZLPipeline / ZLPipelineManage
* **:popVisible** :
  * 类型：`Boolean`
  * 描述：控制弹出窗口显示
  * 可用组件：ZLPipeline-StatusPop / ZLPipelineManage-NodePop
* **:popMeta** :
  * 类型：`Object<popMetaStatus>`
  * 描述：返回结果显示窗口的原始数据（标题等）
  * 可用组件：ZLPipeline-StatusPop
* **:popMeta** :
  * 类型：`inputGraphData`
  * 描述：节点编辑窗口的原始数据（标题等）
  * 可用组件：ZLPipeline-NodePop
* **:popStatusList** :
  * 类型：`Object<popStatusList>`
  * 描述：返回结果显示窗口的返回结果列表
  * 可用组件：ZLPipeline-StatusPop
* **:bShowEditModeButton** :
  * 类型：`Boolean`
  * 描述：控制编辑模式按钮是否显示
  * 可用组件：ZLPipeline
* **:bAllowEditPopover** :
  * 类型：`Boolean`
  * 描述：控制是否可以打开编辑节点页
  * 可用组件：ZLPipeline
* **:graphData** :
  * 类型：`Array<inputGraphData>`
  * 描述：流水线的所有数据
  * 可用组件：ZLPipeline / ZLPipelineManage
* **:pipelineMeta** :
  * 类型：`inputPipelineMetaData`
  * 描述：流水线的元数据（标题等）
  * 可用组件：ZLPipeline / ZLPipelineManage
* **:gameChildNodesOptions** :
  * 类型：`Array<inputChildNodeObj>`
  * 描述：编辑节点页面的子节点选项列表
  * 可用组件：ZLPipeline-NodePop
* **:gameTypeOptions** :
  * 类型：`Array<string>`
  * 描述：编辑节点页面的子节点内可选功能选项列表
  * 可用组件：ZLPipeline-NodePop
* **lang** :
  * 类型：`String`
  * 描述：字体选择 （目前支持 zhCN 和 enUS）
  * 可用组件：除 ZLPipeline-NodePop 之外的所有组件

#### 输出（回调函数）：

* **@onClose** :
  * 类型：`Callback`
  * 描述：当用户点击关闭按钮时触发
  * 可用组件：所有组件
* **@onChange** :
  * 类型：`Callback`
  * 描述：当用户修改任意属性时触发（仍在开发）
  * 可用组件：所有组件
* **@onSubmit** :
  * 类型：`Callback`
  * 描述：当用户点击任意提交按钮时触发（仍在开发）
  * 可用组件：所有组件
* **@onClickOpenNode** :
  * 类型：`Callback`
  * 描述：当用户点击任意节点时触发
  * 可用组件：ZLPipeline / ZLPipelineManage
* **@onClickOpenStatus** :
  * 类型：`Callback`
  * 描述：当用户点击任意节点状态时触发
  * 可用组件：ZLPipeline

### 数据结构

#### inputGraphData

`inputGraphData` 是一种 ZLPipeline 定义的特殊数据类型，用于传递流水线的数据：

```typescript
[
    {
        name: string
        description: string
        status: string
        is_enable: boolean
        child: {
            name: string
            script: string
            description: string
            status: string
            // 可选状态：success / running / waiting / failed
            is_enable: boolean
            order: number
            game_type: Array<string>
        }
        result: {
            title: string
            time: string
            data: {
                msg: string
                impact: Array<any>
                advice: string
            }
        }
    },
    {
        /* 其他节点 */
    }
]
```

`popMetaStatus` 是一种特定的数据类型，用于定义执行结果弹出页面的原始数据：

```typescript
{
    title: string
}
```

`popStatusList` 是一种特定的数据类型，用于定义执行结果弹出页面的返回结果列表：

```typescript
[
    {
        title: string
        time: string
        data: {
            msg: string
            impact: Array<any>
            advice: string
        }
    },
    {
        // Other Status
    }
]
```

`inputChildNodeObj` 是一种特定的数据类型，用于定义节点编辑页面的可选子节点列表：

```typescript
{
    label: string,
    value: string
}
```

> 作者: Tyuwwe
>
> 日期: 2024/10/21
