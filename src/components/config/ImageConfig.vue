<template>
  <div class="image-config">
    <h2>图片小组件设置</h2>
    
    <el-form label-position="top">
      <el-form-item label="图片URL">
        <el-input v-model="localConfig.imageUrl" placeholder="输入图片URL" />
      </el-form-item>
      
      <div class="preview-image" v-if="localConfig.imageUrl">
        <img :src="localConfig.imageUrl" alt="预览" style="max-width: 100%; max-height: 150px;" />
      </div>
      
      <el-divider>尺寸与外观</el-divider>
      
      <el-form-item label="宽度 (像素)">
        <el-slider v-model="localConfig.width" :min="50" :max="800" show-input />
      </el-form-item>
      
      <el-form-item label="高度 (像素)">
        <el-slider v-model="localConfig.height" :min="50" :max="800" show-input />
      </el-form-item>
      
      <el-form-item label="透明度">
        <el-slider v-model="localConfig.opacity" :min="0" :max="1" :step="0.01" show-input />
      </el-form-item>
      
      <el-form-item label="圆角半径 (像素)">
        <el-slider v-model="localConfig.borderRadius" :min="0" :max="100" show-input />
      </el-form-item>
      
      <el-divider>特效</el-divider>
      
      <el-form-item label="阴影">
        <el-switch v-model="localConfig.shadow" />
      </el-form-item>
      
      <template v-if="localConfig.shadow">
        <el-form-item label="阴影颜色">
          <el-color-picker v-model="localConfig.shadowColor" show-alpha />
        </el-form-item>
        
        <el-form-item label="阴影模糊度">
          <el-slider v-model="localConfig.shadowBlur" :min="0" :max="50" show-input />
        </el-form-item>
      </template>
      
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="applyPreset('normal')">正常</el-button>
          <el-button type="success" @click="applyPreset('rounded')">圆角</el-button>
          <el-button type="warning" @click="applyPreset('shadow')">阴影</el-button>
          <el-button type="danger" @click="applyPreset('circular')">圆形</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// Define props interface for config
interface ImageConfig {
  imageUrl: string;
  width: number;
  height: number;
  opacity: number;
  borderRadius: number;
  shadow: boolean;
  shadowColor: string;
  shadowBlur: number;
}

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<ImageConfig>;
}>(), {
  config: () => ({
    imageUrl: '',
    width: 200,
    height: 200,
    opacity: 1,
    borderRadius: 0,
    shadow: false,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 10
  })
});

// Define emit
const emit = defineEmits<{
  (event: 'update:config', config: ImageConfig): void;
}>();

// Local config for two-way binding
const localConfig = ref<ImageConfig>({
  imageUrl: '',
  width: 200,
  height: 200,
  opacity: 1,
  borderRadius: 0,
  shadow: false,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 10
});

// Sync with parent config on mount
onMounted(() => {
  // Merge default config with provided config
  localConfig.value = { ...localConfig.value, ...props.config };
});

// Preset styles
const presets = {
  normal: {
    width: 300,
    height: 200,
    opacity: 1,
    borderRadius: 0,
    shadow: false
  },
  rounded: {
    width: 300,
    height: 200,
    opacity: 1,
    borderRadius: 12,
    shadow: false
  },
  shadow: {
    width: 300,
    height: 200,
    opacity: 1,
    borderRadius: 8,
    shadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 20
  },
  circular: {
    width: 200,
    height: 200,
    opacity: 1,
    borderRadius: 100,
    shadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 15
  }
};

// Apply preset
const applyPreset = (presetName: keyof typeof presets) => {
  const preset = presets[presetName];
  localConfig.value = { ...localConfig.value, ...preset };
};

// Watch for local changes and emit to parent
watch(localConfig, (newConfig) => {
  emit('update:config', { ...newConfig });
}, { deep: true });
</script>

<style scoped>
.image-config {
  padding: 10px;
}

.preview-image {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
