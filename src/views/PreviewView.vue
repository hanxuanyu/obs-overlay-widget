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

// Import widget components
import ClockWidget from '../widgets/ClockWidget.vue';
import DateWidget from '../widgets/DateWidget.vue';
import TextWidget from '../widgets/TextWidget.vue';
import ImageWidget from '../widgets/ImageWidget.vue';

// Widget registry
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
  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get('data');
  
  if (data) {
    try {
      const decodedData = decodeConfig(data);
      widgetType.value = decodedData.type;
      widgetConfig.value = decodedData.config;
    } catch (e) {
      console.error('Invalid configuration in URL', e);
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
