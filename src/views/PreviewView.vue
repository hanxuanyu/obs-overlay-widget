<template>
  <div class="preview-view">
    <component 
      :is="widgetComponent" 
      v-if="widgetComponent" 
      :config="widgetConfig" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
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
</script>

<style scoped>
.preview-view {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
</style>
