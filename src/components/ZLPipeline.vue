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
                <div class="ZLPipeline-Title">{{ pipelineMeta.title }}</div>
                <div class="ZLPipeline-sTitle">{{ pipelineMeta.sTitle }}</div>
            </div>
        </div>
        <div style="overflow-x: auto;" class="ZLPipeline-Graph">
            <div ref="nodesContainer" class="ZLPipeline-Nodes">
                <div class="ZLPipeline-Node">
                    <div @click="addNode('start')" class="ZLPipeline-Node-Top ZLPipeline-Node-Top-SE">
                        <div class="ZLPipeline-Node-Name">{{ langPack.pl.node_start }} <el-icon><CaretRight /></el-icon></div>
                        <div class="ZLPipeline-Node-Desc">{{ langPack.pl.node_start_s }}</div>
                    </div>
                </div>
                <div 
                    v-for="node in graphData" 
                    :key="node.name" 
                    class="ZLPipeline-Node"
                    @contextmenu.prevent.stop="openContextMenu($event, node)"
                >     
                    <div v-if="bEditingMode" class="ZLPipeline-Node-Top Node-Editing" @click="addNode(node)">
                        <div class="ZLPipeline-Node-Status">{{ langPack.pl.node_status_editing }}</div>
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
                            :title="langPack.pl.node_desc"
                            :width="200"
                            trigger="hover"
                            :content="node.description"
                            transition="el-zoom-in-top"
                            popper-style="pointer-events:none; border-radius: 20px 20px 0px 0px; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC';"
                        >
                            <template #reference>
                                <div class="ZLPipeline-Node-Desc">{{ node.description }}</div>
                            </template>
                        </el-popover>
                    </div>
                    <div v-else class="ZLPipeline-Node-Top Node-Disabled">
                        <div class="ZLPipeline-Node-Status">{{ langPack.pl.node_status_disabled }}</div>
                        <div v-if="node.name.length <= 7" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else-if="node.name.length <= 9" style="font-size: 1.25rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <div v-else style="font-size: 1rem;" class="ZLPipeline-Node-Name">{{ node.name }}</div>
                        <el-popover
                            placement="top"
                            :title="langPack.pl.node_desc"
                            :width="200"
                            trigger="hover"
                            :content="node.description"
                            transition="el-zoom-in-top"
                            popper-style="pointer-events:none; border-radius: 20px 20px 0px 0px; font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans SC';"
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
                        <div class="ZLPipeline-Node-Name"><el-icon><CaretLeft /></el-icon> {{ langPack.pl.node_end }}</div>
                        <div class="ZLPipeline-Node-Desc">{{ langPack.pl.node_endt_s }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ZLPipeline-Display">
            <el-icon @click="scaleGraph(1)" class="ZLPipeline-Zoom-Icons"><ZoomIn /></el-icon>
            {{ langPack.pl.graph_scale }}{{ scaleSize.toFixed(2) }}x
            <el-icon @click="scaleGraph(-1)" class="ZLPipeline-Zoom-Icons"><ZoomOut /></el-icon>
        </div>
        <div class="ZLPipeline-Tips">{{ langPack.pl.graph_hint_1 }} <span class="ZLPipeline-Key">Shift</span> + <img class="hintIcon" :src="mouseScroll" alt="scroll-svg" /> {{ langPack.pl.graph_hint_2 }}</div>
        <div v-show="contextVis" ref="contextMenu" class="ZLPipeline-ContextMenu">
            <div class="ZLPipeline-ContextMenu-Title">
                <div class="ZLPipeline-ContextMenu-Title-Text">{{ langPack.pl.node_contextmenu_current }}</div>
                <div class="ZLPipeline-ContextMenu-Title-Node">{{ contextMenuTarget.name }}</div>
            </div>
            <div v-show="bAllowEditPopover" class="ZLPipeline-ContextMenu-Item" @click="openNodePop"><el-icon class="ContextIcon"><Setting /></el-icon>{{ langPack.pl.node_contextmenu_setting }}</div>
            <div v-show="contextMenuTarget.is_enable" @click="openPop" class="ZLPipeline-ContextMenu-Item"><el-icon class="ContextIcon"><MessageBox /></el-icon>{{ langPack.pl.node_contextmenu_result }}</div>
            <div v-show="contextMenuTarget.is_enable" @click="disableNode" class="ZLPipeline-ContextMenu-Item"><el-icon class="ContextIcon"><CircleClose /></el-icon>{{ langPack.pl.node_contextmenu_disable }}</div>
            <div v-show="!contextMenuTarget.is_enable" @click="enableNode" class="ZLPipeline-ContextMenu-Item"><el-icon class="ContextIcon"><CircleCheck /></el-icon>{{ langPack.pl.node_contextmenu_enable }}</div>
        </div>
        <div v-show="bShowEditModeButton" @click="switchEditingMode" ref="editingControl" class="ZLPipeline-EditingControl">
            <div class="EditingControlText" v-if="bEditingMode" style="color: white;" >{{ langPack.pl.node_editmode_exit }}</div>
            <div class="EditingControlText" v-else >{{ langPack.pl.node_editmode_enter }}</div>
            <el-icon class="EditingControlIcon">
                <CircleClose class="iconSwitchAnim" v-if="bEditingMode" />
                <EditPen class="iconSwitchAnim" v-else />
            </el-icon>
        </div>
        </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MessageBox } from '@element-plus/icons-vue';
import mouseScroll from '@/assets/mouseScroll.svg';
import { ElMessage } from 'element-plus';
import enUS from '@/locales/enUS';
import zhCN from '@/locales/zhCN';
import { 
    Promotion,
    CloseBold,
    CaretRight,
    CaretLeft,
    SemiSelect,
    ZoomIn,
    ZoomOut,
    Setting,
    CircleClose,
    CircleCheck,
    EditPen
} from '@element-plus/icons-vue';

class inputChildObj {
    name: string
    description: string
    status: string
    is_enable: boolean
    order: number
    game_type: Array<string>
    constructor(n: string, d: string, s: string, i: boolean, o: number, g: Array<string>) {
        this.name = n
        this.description = d
        this.status = s
        this.is_enable = i
        this.order = o
        this.game_type = g
    }
}

class inputResultObj {
    title: string
    text: string
    constructor(title: string, text: string) {
        this.title = title
        this.text = text
    }
}

class inputGraphData {
    name: string
    description: string
    status: string
    is_enable: boolean
    child: inputChildObj[]
    result: inputResultObj[]
    constructor(n: string, d: string, s: string, i: boolean, c: inputChildObj[], r: inputResultObj[]) {
        this.name = n
        this.description = d
        this.status = s
        this.is_enable = i
        this.child = c
        this.result = r
    }
}

class inputPipelineMetaData {
    title: string
    sTitle: string
    constructor(t: string, s: string) {
        this.title = t
        this.sTitle = s
    }
}

const langPack = ref(zhCN)

const props = defineProps<{
    pipelineVisible: boolean;
    bShowEditModeButton: boolean;
    bAllowEditPopover: boolean;
    lang: string;
    graphData: inputGraphData[];
    pipelineMeta: inputPipelineMetaData;
}>();
const emit = defineEmits(['onClose', 'onChange', 'onSubmit', 'onClickOpenNode', 'onClickOpenStatus'])
const pipelineContainer = ref<any>()
const nodesContainer = ref<any>()
const contextMenu = ref<any>()
const editingControl = ref<any>()
const scaleSize = ref(1.0)
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

let localLangList = ['zhCN', 'enUS']
if (localLangList.includes(props.lang)) {
    langPack.value = (props.lang == 'zhCN')? zhCN : enUS
}
else {
    langPack.value = zhCN
}

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
    if (node.name) {
        popMeta.value.title = node.name
        popStatusList.value = node.result ? node.result : []
    }
    const emitData = {
        popMeta: popMeta.value,
        popStatusList: popStatusList.value,
    }
    emit('onClickOpenStatus', emitData)
}

function openNodePop(node: any = null) {
    if (props.bAllowEditPopover == false) return
    if (bEditingMode.value) {
        ElMessage(langPack.value.msg.now_editing)
        return
    }
    if (node.name) contextMenuTarget.value = node
    emit('onClickOpenNode', contextMenuTarget.value)
}

function disableNode() {
    contextMenuTarget.value.is_enable = false;
}

function enableNode() {
    contextMenuTarget.value.is_enable = true;
}

const openContextMenu = (e: MouseEvent, node: any) => {
    if (bEditingMode.value) {
        ElMessage(langPack.value.msg.now_editing)
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
    setTimeout(() => {
        contextMenu.value.style.opacity = 1
        contextVis.value = false
    }, 200)
}

function closePipelineGraph() {
    pipelineContainer.value.style.transform = "scale(0.95)"
    pipelineContainer.value.style.opacity = "0"
    setTimeout(() => {
        emit('onClose')
        pipelineContainer.value.style.transform = ""
        pipelineContainer.value.style.opacity = ""
    }, 300)
}

function switchEditingMode() {
    if (bEditingMode.value) {
        editingControl.value.style.backgroundColor = ""
        ElMessage(langPack.value.msg.exit_editing)
    }
    else {
        editingControl.value.style.backgroundColor = "darkred"
        ElMessage(langPack.value.msg.enter_editing)
    }
    bEditingMode.value = !bEditingMode.value 
}

function addNode(targetNode: any) {
    if (!bEditingMode.value) return
    if (targetNode == 'start') {
        const newNode = {
            name: '节点' + (Math.random() * 10000).toFixed(0),
            description: '描述',
            status: 'finished',
            is_enable: true,
            child: [],
            result: []
        }
        props.graphData.splice(0, 0, newNode)
        return
    }
    for (let i = 0; i < props.graphData.length; ++i) {
        if (props.graphData[i] == targetNode) {
            const newNode = {
                name: '节点' + (Math.random() * 10000).toFixed(0),
                description: '描述',
                status: 'finished',
                is_enable: true,
                child: [],
                result: []
            }
            props.graphData.splice(i + 1, 0, newNode)
            return
        }
    }
}

function deletePop(targetNode: any) {
    for (let i = 0; i < props.graphData.length; ++i) {
        if (props.graphData[i] == targetNode) {
            props.graphData.splice(i, 1)
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
    'finished': langPack.value.pl.node_status_finished,
    'running': langPack.value.pl.node_status_running,
    'waiting': langPack.value.pl.node_status_waiting,
    'error': langPack.value.pl.node_status_error,
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
        opacity: 0;
    }
    100% {
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
        transform: translateX(-20px);
    }
    100% { 
        opacity: 0.5;
        transform: translateX(0px);
    }
}

.Node-Editing:hover::before {
    animation: hintShow .4s;
    content: '点击\a即可在这里\a添加新节点';
    position: absolute;
    left: 200px;
    top: 30px;
    white-space: pre;
    opacity: 0.5;
    border-top: 2px dotted rgba(0, 0, 0, 0.5);
    border-bottom: 2px dotted rgba(0, 0, 0, 0.5);
    border-right: 2px dotted rgba(0, 0, 0, 0.5);
    border-radius: 0 20px 20px 0;
    padding: 10px;
    z-index: -1;
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
    padding-bottom: 10px;
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