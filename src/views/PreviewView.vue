<template>
  <div class="preview-view transparent-bg">
    <component 
      :is="widgetComponent" 
      v-if="widgetComponent" 
      :config="widgetConfig" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { decodeConfig } from '../utils/configUtils';
import { widgets } from '../widgets/registry';

// 创建小组件注册表
const widgetRegistry: Record<string, any> = {};
widgets.forEach(widget => {
  widgetRegistry[widget.value] = widget.component;
});

const widgetType = ref('');
const widgetConfig = ref({});
const widgetComponent = computed(() => {
  return widgetRegistry[widgetType.value];
});

onMounted(() => {
  // 为body添加透明背景类
  document.body.classList.add('preview-mode');
  document.documentElement.classList.add('preview-mode');
  
  // 在 hash 模式下获取 URL 参数
  const searchParams = window.location.href.split('?')[1];
  const queryParams = new URLSearchParams(searchParams || '');
  const data = queryParams.get('data');
  
  if (data) {
    try {
      const decodedData = decodeConfig(data);
      widgetType.value = decodedData.type;
      widgetConfig.value = decodedData.config;
    } catch (e) {
      console.error('URL 中的配置无效', e);
    }
  }
});

onUnmounted(() => {
  // 清理透明背景类
  document.body.classList.remove('preview-mode');
  document.documentElement.classList.remove('preview-mode');
});
</script>

<style scoped>
.preview-view {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent !important;
  background: transparent !important;
}

.transparent-bg {
  background: rgba(0, 0, 0, 0) !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
