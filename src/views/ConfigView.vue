<template>
  <div class="config-view">
    <div class="left-panel">
      <div class="widget-selector">
        <el-select v-model="selectedWidget" placeholder="选择小组件" @change="handleWidgetChange">
          <el-option v-for="widget in widgets" :key="widget.value" :label="widget.label" :value="widget.value" />
        </el-select>
      </div>
      
      <div class="config-container">
        <div class="url-generator">
          <h3>生成的URL链接</h3>
          <div class="url-input-group">
            <el-input v-model="generatedUrl" readonly size="large" />
            <div class="button-group">
              <el-button @click="copyUrl" size="large">
                <el-icon><CopyDocument /></el-icon> 复制
              </el-button>
              <el-button @click="openPreview" size="large">
                <el-icon><View /></el-icon> 打开
              </el-button>
            </div>
          </div>
        </div>
        
        <div class="config-panel">
          <component :is="currentConfigComponent" v-if="currentConfigComponent" @update:config="updateWidgetConfig" :config="currentWidgetConfig" />
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
import { CopyDocument, View } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { encodeConfig, decodeConfig } from '../utils/configUtils';
import { generatePreviewUrl } from '../utils/urlUtils';

// 导入小组件注册表
import { widgets, getDefaultConfig } from '../widgets/registry';

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
  const configStr = encodeConfig({
    type: selectedWidget.value,
    config: currentWidgetConfig.value
  });
  
  generatedUrl.value = generatePreviewUrl(configStr);
};

// 复制 URL 到剪贴板
const copyUrl = () => {
  navigator.clipboard.writeText(generatedUrl.value).then(() => {
    ElMessage.success('URL 已复制到剪贴板！');
  }).catch(() => {
    ElMessage.error('复制 URL 失败');
  });
};

// 打开预览页面
const openPreview = () => {
  if (generatedUrl.value) {
    window.open(generatedUrl.value, '_blank');
  } else {
    ElMessage.warning('请先配置小组件');
  }
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
  /* 配置面板可以滚动 */
  overflow-y: auto;
  flex: 1;
}

.url-generator {
  /* URL生成器固定在顶部 */
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #eaeaea;
}

.url-generator h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: #606266;
}

.url-input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.button-group {
  display: flex;
  gap: 8px;
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
