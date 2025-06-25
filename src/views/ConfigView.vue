<template>
  <div class="config-view">
    <div class="left-panel">
      <div class="widget-selector">
        <el-select v-model="selectedWidget" placeholder="Select Widget" @change="handleWidgetChange">
          <el-option v-for="widget in widgets" :key="widget.value" :label="widget.label" :value="widget.value" />
        </el-select>
      </div>
      
      <div class="config-panel">
        <component :is="currentConfigComponent" v-if="currentConfigComponent" @update:config="updateWidgetConfig" :config="currentWidgetConfig" />
      </div>
      
      <div class="url-generator">
        <el-input v-model="generatedUrl" readonly>
          <template #append>
            <el-button @click="copyUrl">
              <el-icon><CopyDocument /></el-icon> Copy
            </el-button>
          </template>
        </el-input>
      </div>
    </div>
    
    <div class="right-panel">
      <div class="preview-container">
        <div class="preview-wrapper">
          <component :is="currentWidgetComponent" v-if="currentWidgetComponent" :config="currentWidgetConfig" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { CopyDocument } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { encodeConfig, decodeConfig } from '../utils/configUtils';

// Widget components and their configs
import ClockWidget from '../widgets/ClockWidget.vue';
import DateWidget from '../widgets/DateWidget.vue';
import TextWidget from '../widgets/TextWidget.vue';
import ImageWidget from '../widgets/ImageWidget.vue';

// Config components
import ClockConfig from '../components/config/ClockConfig.vue';
import DateConfig from '../components/config/DateConfig.vue';
import TextConfig from '../components/config/TextConfig.vue';
import ImageConfig from '../components/config/ImageConfig.vue';

const widgets = [
  { label: 'Clock Widget', value: 'clock', component: ClockWidget, configComponent: ClockConfig },
  { label: 'Date Widget', value: 'date', component: DateWidget, configComponent: DateConfig },
  { label: 'Text Widget', value: 'text', component: TextWidget, configComponent: TextConfig },
  { label: 'Image Widget', value: 'image', component: ImageWidget, configComponent: ImageConfig },
];

const selectedWidget = ref('clock');
const currentWidgetConfig = ref({});
const generatedUrl = ref('');

// Get widget component based on selection
const currentWidgetComponent = computed(() => {
  const widget = widgets.find(w => w.value === selectedWidget.value);
  return widget?.component;
});

// Get config component based on selection
const currentConfigComponent = computed(() => {
  const widget = widgets.find(w => w.value === selectedWidget.value);
  return widget?.configComponent;
});

// Set default config for each widget type
const getDefaultConfig = (widgetType: string) => {
  switch (widgetType) {
    case 'clock':
      return {
        format: 'HH:mm:ss',
        color: '#ffffff',
        fontSize: 48,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        textShadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        useGradient: false,
        gradientColors: ['#ff0000', '#0000ff'],
        showSeconds: true
      };
    case 'date':
      return {
        format: 'YYYY-MM-DD',
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        textShadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        useGradient: false,
        gradientColors: ['#ff0000', '#0000ff'],
        showWeekday: true
      };
    case 'text':
      return {
        text: 'Sample Text',
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        textShadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        useGradient: false,
        gradientColors: ['#ff0000', '#0000ff'],
      };
    case 'image':
      return {
        imageUrl: '',
        width: 200,
        height: 200,
        opacity: 1,
        borderRadius: 0,
        shadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 10
      };
    default:
      return {};
  }
};

// Handle widget type change
const handleWidgetChange = () => {
  currentWidgetConfig.value = getDefaultConfig(selectedWidget.value);
  updateGeneratedUrl();
};

// Update widget configuration
const updateWidgetConfig = (newConfig: any) => {
  currentWidgetConfig.value = newConfig;
  updateGeneratedUrl();
};

// Generate preview URL
const updateGeneratedUrl = () => {
  const baseUrl = window.location.origin;
  const configStr = encodeConfig({
    type: selectedWidget.value,
    config: currentWidgetConfig.value
  });
  generatedUrl.value = `${baseUrl}/preview?data=${configStr}`;
};

// Copy URL to clipboard
const copyUrl = () => {
  navigator.clipboard.writeText(generatedUrl.value).then(() => {
    ElMessage.success('URL copied to clipboard!');
  }).catch(() => {
    ElMessage.error('Failed to copy URL');
  });
};

// Check for query params on load (for direct linking)
onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get('data');
  
  if (data) {
    try {
      const decodedData = decodeConfig(data);
      selectedWidget.value = decodedData.type;
      currentWidgetConfig.value = decodedData.config;
    } catch (e) {
      ElMessage.error('Invalid configuration in URL');
      handleWidgetChange(); // Load default config
    }
  } else {
    handleWidgetChange(); // Load default config
  }
});

// Update URL when configuration changes
watch([selectedWidget, currentWidgetConfig], () => {
  updateGeneratedUrl();
}, { deep: true });
</script>

<style scoped>
.config-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-panel {
  width: 380px;
  padding: 20px;
  background-color: #f5f7fa;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-panel {
  flex: 1;
  background-color: transparent;
  background-image: linear-gradient(45deg, #ddd 25%, transparent 25%), 
                    linear-gradient(-45deg, #ddd 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #ddd 75%), 
                    linear-gradient(-45deg, transparent 75%, #ddd 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.widget-selector {
  width: 100%;
}

.config-panel {
  flex-grow: 1;
}

.url-generator {
  margin-top: 20px;
}

.preview-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-wrapper {
  padding: 20px;
  border-radius: 8px;
}
</style>
