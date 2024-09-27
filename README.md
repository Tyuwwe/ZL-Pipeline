<div align="center">

# ZL-Pipeline

#### A single-line Pipeline component package (Under Development)

<img src="https://img.shields.io/badge/Vue3-rgb(53,73,94).svg" alt="vue">
<img src="https://img.shields.io/badge/TypeScript-rgb(21, 59, 115).svg" alt="vue">
<img src="https://img.shields.io/badge/Pipeline-rgb(21, 119, 115).svg" alt="vue">
<img src="https://img.shields.io/badge/ElementPlus-rgb(35, 129, 181).svg" alt="vue">

</div>

## Introduction

> Language: [ENGLISH] | [[中文]](./README-CN.md)

ZL-Pipeline is a modern pipeline front-end UI with edit function inspired by **Jenkins Blue Ocean** built with **Element Plus** on **Vue 3** + **TypeScript**.

Compared with Jenkins Blue Ocean, ZL-Pipeline is more light-weighted, modernized and flexible.

ZL-Pipeline is still under-development now, please test carefully before production deployment.

## Preview

> Note that muti-language support will be available in future releases (Only zh-CN available now).

![overall](./image/overall.png "overall")

*Pipeline View*

![edit](./image/edit.png "edit")

*Node Edit View*

## Install

### Quick Install

Use any package manager to install, for example, use **NPM**:

```shell
npm i zl-pipeline
```

### Dependencies

All needed dependencies are listed below, these packages will be automatically installed with `zl-pipeline`:

> Note: We are developing version without Element Plus dependency

```json
"dependencies": {
    "@element-plus/icons-vue": "^2.3.1",
    "element-plus": "^2.8.1",
    "file-saver": "^2.0.5"
}
```

If you want to develop ZL-Pipeline locally, you need to install devDependencies:

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

## Usage

### Import

Both `ZL-Pipeline` and `ElementPlus` have to be imported:

```typescript
// main.ts
import './assets/main.css'

import { createApp } from 'vue'
// Import ElementPlus and ElementPlus CSS
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// Import ZL-Pipeline CSS
import 'zl-pipeline/dist/style.css'
import App from './App.vue'

// Import ElementPlus Icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus);
app.mount('#app')
```

`ZL-Pipeline` supports Tree-Shaking, its eazy to import single component:

```html
<script setup lang="ts">
    /* Import in script */
    import { ZLPipeline, ZLPipelineManage } from 'zl-pipeline'
</script>
<template>
    /* Use in template, some variables are hidden */
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

### Available Input Data & Callbacks

There are 4 types of components available in ZL-Pipeline:

* ZLPipeline : Main pipeline with adjustable edit nodes / view nodes function.
* ZLPipelineManage : Manage pipeline with no live status shown but can edit pipeline nodes.
* ZLPipeline-StatusPop : Show pipeline node status.
* ZLPipeline-NodePop : Modify pipeline childnodes.

All of them will receive some certain typed data:

#### Input:

* **:pipelineVisible** :
  * Type: Boolean
  * Desc: Control pipeline display
  * Available: ZLPipeline / ZLPipelineManage
* **:bShowEditModeButton** :
  * Type: Boolean
  * Desc: Control show pipeline edit mode button
  * Available: ZLPipeline
* **:bAllowEditPopover** :
  * Type: Boolean
  * Desc: Control show pipeline edit popover
  * Available: ZLPipeline
* **:graphData** :
  * Type: Array\<inputGraphData\>
  * Desc: Pipeline full data
  * Available: ZLPipeline / ZLPipelineManage

#### Output (Callback):

* **@onClose** :
  * Type: Callback
  * Desc: Emit when user click close button
  * Available: All Components
* **@onChange** :
  * Type: Callback
  * Desc: Emit when user change any data (need further development)
  * Available: All Components
* **@onSubmit** :
  * Type: Callback
  * Desc: Emit when user click any submit button (need further development)
  * Available: All Components

### Data Structure

#### inputGraphData

`inputGraphData` is a special data structure defined in ZLPipeline:

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
        /* Other Nodes */
    }
]
```

> Author: Tyuwwe
>
> Date: 2024/9/26
