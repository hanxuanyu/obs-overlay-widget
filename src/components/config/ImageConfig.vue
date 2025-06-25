<template>
  <div class="image-config">
    <h2>Image Widget Settings</h2>
    
    <el-form label-position="top">
      <el-form-item label="Image URL">
        <el-input v-model="localConfig.imageUrl" placeholder="Enter image URL" />
      </el-form-item>
      
      <div class="preview-image" v-if="localConfig.imageUrl">
        <img :src="localConfig.imageUrl" alt="Preview" style="max-width: 100%; max-height: 150px;" />
      </div>
      
      <el-divider>Size & Appearance</el-divider>
      
      <el-form-item label="Width (px)">
        <el-slider v-model="localConfig.width" :min="50" :max="800" show-input />
      </el-form-item>
      
      <el-form-item label="Height (px)">
        <el-slider v-model="localConfig.height" :min="50" :max="800" show-input />
      </el-form-item>
      
      <el-form-item label="Opacity">
        <el-slider v-model="localConfig.opacity" :min="0" :max="1" :step="0.01" show-input />
      </el-form-item>
      
      <el-form-item label="Border Radius (px)">
        <el-slider v-model="localConfig.borderRadius" :min="0" :max="100" show-input />
      </el-form-item>
      
      <el-divider>Effects</el-divider>
      
      <el-form-item label="Shadow">
        <el-switch v-model="localConfig.shadow" />
      </el-form-item>
      
      <template v-if="localConfig.shadow">
        <el-form-item label="Shadow Color">
          <el-color-picker v-model="localConfig.shadowColor" show-alpha />
        </el-form-item>
        
        <el-form-item label="Shadow Blur">
          <el-slider v-model="localConfig.shadowBlur" :min="0" :max="50" show-input />
        </el-form-item>
      </template>
      
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="applyPreset('normal')">Normal</el-button>
          <el-button type="success" @click="applyPreset('rounded')">Rounded</el-button>
          <el-button type="warning" @click="applyPreset('shadow')">Shadow</el-button>
          <el-button type="danger" @click="applyPreset('circular')">Circular</el-button>
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
