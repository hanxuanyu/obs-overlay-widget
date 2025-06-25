<template>
  <div class="config-view">
    <div class="left-panel">
      <div class="widget-selector">
        <el-select v-model="selectedWidget" placeholder="选择小组件" @change="handleWidgetChange">
          <el-option v-for="widget in widgets" :key="widget.value" :label="widget.label" :value="widget.value" />
        </el-select>
      </div>
      
      <div class="config-container">
        <div class="config-panel">
          <component :is="currentConfigComponent" v-if="currentConfigComponent" @update:config="updateWidgetConfig" :config="currentWidgetConfig" />
        </div>
        
        <div class="url-generator">
          <h3>生成的URL链接</h3>
          <el-input v-model="generatedUrl" readonly size="large">
            <template #append>
              <el-button @click="copyUrl">
                <el-icon><CopyDocument /></el-icon> 复制
              </el-button>
            </template>
          </el-input>
        </div>
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

// 小组件组件及其配置
import ClockWidget from '../widgets/ClockWidget.vue';
import DateWidget from '../widgets/DateWidget.vue';
import TextWidget from '../widgets/TextWidget.vue';
import ImageWidget from '../widgets/ImageWidget.vue';

// 配置组件
import ClockConfig from '../components/config/ClockConfig.vue';
import DateConfig from '../components/config/DateConfig.vue';
import TextConfig from '../components/config/TextConfig.vue';
import ImageConfig from '../components/config/ImageConfig.vue';

const widgets = [
  { label: '时钟小组件', value: 'clock', component: ClockWidget, configComponent: ClockConfig },
  { label: '日期小组件', value: 'date', component: DateWidget, configComponent: DateConfig },
  { label: '文本小组件', value: 'text', component: TextWidget, configComponent: TextConfig },
  { label: '图片小组件', value: 'image', component: ImageWidget, configComponent: ImageConfig },
];

const selectedWidget = ref('clock');
const currentWidgetConfig = ref({});
const generatedUrl = ref('');

// 根据选择获取小组件组件
const currentWidgetComponent = computed(() => {
  const widget = widgets.find(w => w.value === selectedWidget.value);
  return widget?.component;
});

// 根据选择获取配置组件
const currentConfigComponent = computed(() => {
  const widget = widgets.find(w => w.value === selectedWidget.value);
  return widget?.configComponent;
});

// 为每种小组件类型设置默认配置
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

// 更新小组件配置
const updateWidgetConfig = (newConfig: any) => {
  currentWidgetConfig.value = newConfig;
  updateGeneratedUrl();
};

// 生成预览 URL
const updateGeneratedUrl = () => {
  const baseUrl = window.location.origin;
  const configStr = encodeConfig({
    type: selectedWidget.value,
    config: currentWidgetConfig.value
  });
  generatedUrl.value = `${baseUrl}/preview?data=${configStr}`;
};

// 复制 URL 到剪贴板
const copyUrl = () => {
  navigator.clipboard.writeText(generatedUrl.value).then(() => {
    ElMessage.success('URL 已复制到剪贴板！');
  }).catch(() => {
    ElMessage.error('复制 URL 失败');
  });
};

// 加载时检查查询参数（用于直接链接）
onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get('data');
  
  if (data) {
    try {
      const decodedData = decodeConfig(data);
      selectedWidget.value = decodedData.type;
      currentWidgetConfig.value = decodedData.config;
    } catch (e) {
      ElMessage.error('URL 中的配置无效');
      handleWidgetChange(); // 加载默认配置
    }
  } else {
    handleWidgetChange(); // 加载默认配置
  }
});

// 配置变更时更新 URL
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
  /* 确保底部有足够的边距 */
  padding-bottom: 30px;
}

.config-container {
  display: flex;
  flex-direction: column;
  flex: 1;
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
  /* 配置面板可以滚动，但不挤压URL生成器 */
  overflow-y: auto;
  flex: 1;
  margin-bottom: 20px;
}

.url-generator {
  /* URL生成器固定在底部 */
  margin-top: auto;
  padding: 10px 0;
  border-top: 1px solid #eaeaea;
}

.url-generator h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #606266;
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
