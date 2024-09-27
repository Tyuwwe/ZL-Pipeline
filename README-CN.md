<div align="center">

# ZL-Pipeline

#### 一个单行流水线组件库（开发中）

<img src="https://img.shields.io/badge/Vue3-rgb(53,73,94).svg" alt="vue">
<img src="https://img.shields.io/badge/TypeScript-rgb(21, 59, 115).svg" alt="vue">
<img src="https://img.shields.io/badge/Pipeline-rgb(21, 119, 115).svg" alt="vue">
<img src="https://img.shields.io/badge/ElementPlus-rgb(35, 129, 181).svg" alt="vue">

</div>

## 简介

> 语言: [[ENGLISH]](./README.md) | [中文]

ZL-Pipeline 是一个现代化的流水线前端组件库，灵感来自于 **Jenkins Blue Ocean** ，使用 **Element Plus** 
、 **Vue 3** 以及 **TypeScript** 环境编写。

对比 Jenkins Blue Ocean，ZL-Pipeline 更加轻量化、现代化，也更灵活。

ZL-Pipeline 仍然在开发状态，请在生产环境部署前谨慎测试。

## 预览

> 请注意：多语言支持将会在未来的版本提供（现在仅支持中文）

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

> 请注意：我们正在开发无需 Element Plus 的版本

```json
"dependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "element-plus": "^2.8.1",
    "file-saver": "^2.0.5"
}
```

如果你想要在本地开发 `zl-pipeline` ，请安装如下 `devDependencies` 包：

```json
"devDependencies": {
    "@tsconfig/node20": "^20.1.4",
    "@types/file-saver": "^2.0.7",
    "@types/node": "^20.14.5",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vue/tsconfig": "^0.5.1",
    "less": "^4.2.0",
    "npm-run-all2": "^6.2.0",
    "typescript": "~5.4.0",
    "vue": "^3.4.29",
    "vite": "^5.3.1",
    "vite-plugin-dts": "^4.2.2",
    "vue-tsc": "^2.0.21",
    "vue-router": "^4.3.3"
}
```

## 使用方法

### 导入

`ZL-Pipeline` 和 `ElementPlus` 都需要被导入：

```typescript
// main.ts
import './assets/main.css'

import { createApp } from 'vue'
// 导入 ElementPlus 和 ElementPlus CSS 样式表
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入 ZL-Pipeline CSS 样式表
import 'zl-pipeline/dist/style.css'
import App from './App.vue'

// 导入 ElementPlus Icons 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus);
app.mount('#app')
```

`ZL-Pipeline` 支持 Tree-Shaking（按需引入），因此使用引入单个组件非常方便：

```html
<script setup lang="ts">
    /* 在 script 中引入 */
    import { ZLPipeline, ZLPipelineManage } from 'zl-pipeline'
</script>
<template>
    /* 在 template 中使用，注意某些变量已被隐藏 */
    <ZLPipeline 
      :pipelineVisible="pipelineVis"
      :bShowEditModeButton="false"
      :bAllowEditPopover="false"
      :graphData="pipelineData"
      @onClose="closePipeline"
    />
    <ZLPipelineManage 
      :pipelineVisible="manageVis" 
      :graphData="pipelineData"
      @onClose="closeManage"
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
  * 类型：Boolean
  * 描述：控制组件显示
  * 可用组件：ZLPipeline / ZLPipelineManage
* **:bShowEditModeButton** :
  * 类型：Boolean
  * 描述：控制编辑模式按钮是否显示
  * 可用组件：ZLPipeline
* **:bAllowEditPopover** :
  * 类型：Boolean
  * 描述：控制是否可以打开编辑节点页
  * 可用组件：ZLPipeline
* **:graphData** :
  * 类型：Array\<inputGraphData\>
  * 描述：流水线的所有数据
  * 可用组件：ZLPipeline / ZLPipelineManage

#### 输出（回调函数）：

* **@onClose** :
  * 类型：Callback
  * 描述：当用户点击关闭按钮时触发
  * 可用组件：All Components
* **@onChange** :
  * 类型：Callback
  * 描述：当用户修改任意属性时触发（仍在开发）
  * 可用组件：All Components
* **@onSubmit** :
  * 类型：Callback
  * 描述：当用户点击任意提交按钮时触发（仍在开发）
  * 可用组件：All Components

### 数据结构

#### inputGraphData

`inputGraphData` 是一种 ZLPipeline 定义的特殊数据类型：

```typescript
[
    {
        name: string
        description: string
        status: string
        is_enable: boolean
        child: {
            name: string
            description: string
            status: string
            is_enable: boolean
            order: number
            game_type: Array<string>
        }
        result: {
            title: string
            text: string
        }
    },
    {
        /* 其他节点 */
    }
]
```

> 作者: Tyuwwe
>
> 日期: 2024/9/26
