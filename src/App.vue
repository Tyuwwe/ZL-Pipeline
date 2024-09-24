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
        @click="pipelineVis=true"
        icon="StarFilled"
        round
        disabled
      >
        Preview ZL Progress Bar
      </el-button>
    </div>
    <div class="ZLPipeline-Buttom">
      Version 0924
    </div>
  </div>

  <ZLPipeline 
    :pipelineVisible="pipelineVis" 
    @close="closePipeline"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import ZLPipeline from './components/ZLPipeline.vue';

const pipelineVis = ref(false)

function closePipeline() {
  pipelineVis.value = false
}
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
