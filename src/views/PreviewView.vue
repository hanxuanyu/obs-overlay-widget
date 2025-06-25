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

// 导入小组件组件
import ClockWidget from '../widgets/ClockWidget.vue';
import DateWidget from '../widgets/DateWidget.vue';
import TextWidget from '../widgets/TextWidget.vue';
import ImageWidget from '../widgets/ImageWidget.vue';

// 小组件注册表
const widgetRegistry = {
  'clock': ClockWidget,
  'date': DateWidget,
  'text': TextWidget,
  'image': ImageWidget
};

const widgetType = ref('');
const widgetConfig = ref({});
const widgetComponent = computed(() => {
  return widgetRegistry[widgetType.value as keyof typeof widgetRegistry];
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
