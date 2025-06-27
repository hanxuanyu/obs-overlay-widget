<template>
  <div class="text-config">
    <h2>文本小组件设置</h2>
    
    <el-form label-position="top">
      <el-form-item label="文本内容">
        <el-input v-model="localConfig.text" type="textarea" :rows="3" placeholder="输入要显示的文本" />
      </el-form-item>
      
      <el-divider>文本样式</el-divider>
      
      <el-form-item label="字体大小">
        <el-slider v-model="localConfig.fontSize" :min="12" :max="100" show-input />
      </el-form-item>
      
      <el-form-item label="字体">
        <el-select v-model="localConfig.fontFamily">
          <el-option label="Arial" value="Arial" />
          <el-option label="Helvetica" value="Helvetica" />
          <el-option label="Times New Roman" value="'Times New Roman'" />
          <el-option label="Courier New" value="'Courier New'" />
          <el-option label="Georgia" value="Georgia" />
          <el-option label="Verdana" value="Verdana" />
          <el-option label="Impact" value="Impact" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="字重">
        <el-select v-model="localConfig.fontWeight">
          <el-option label="普通" value="normal" />
          <el-option label="粗体" value="bold" />
          <el-option label="细体" value="lighter" />
        </el-select>
      </el-form-item>
      
      <el-divider>颜色设置</el-divider>
      
      <el-form-item label="使用渐变色">
        <el-switch v-model="localConfig.useGradient" />
      </el-form-item>
      
      <template v-if="!localConfig.useGradient">
        <el-form-item label="文本颜色">
          <el-color-picker v-model="localConfig.color" show-alpha />
        </el-form-item>
      </template>
      
      <template v-else>
        <el-form-item label="渐变起始颜色">
          <el-color-picker v-model="localConfig.gradientColors[0]" show-alpha />
        </el-form-item>
        
        <el-form-item label="渐变结束颜色">
          <el-color-picker v-model="localConfig.gradientColors[1]" show-alpha />
        </el-form-item>
      </template>
      
      <el-divider>特效</el-divider>
      
      <el-form-item label="文字阴影">
        <el-switch v-model="localConfig.textShadow" />
      </el-form-item>
      
      <template v-if="localConfig.textShadow">
        <el-form-item label="阴影颜色">
          <el-color-picker v-model="localConfig.shadowColor" show-alpha />
        </el-form-item>
        
        <el-form-item label="阴影模糊度">
          <el-slider v-model="localConfig.shadowBlur" :min="0" :max="20" show-input />
        </el-form-item>
      </template>
      
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="applyPreset('modern')">现代风格</el-button>
          <el-button type="success" @click="applyPreset('neon')">霓虹风格</el-button>
          <el-button type="warning" @click="applyPreset('retro')">复古风格</el-button>
          <el-button type="danger" @click="applyPreset('minimal')">简约风格</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { TextConfig } from './types';

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<TextConfig>;
}>(), {
  config: () => ({
    text: 'Sample Text',
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    textShadow: false,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 4,
    useGradient: false,
    gradientColors: ['#ff0000', '#0000ff']
  })
});

// Define emit
const emit = defineEmits<{
  (event: 'update:config', config: TextConfig): void;
}>();

// Local config for two-way binding
const localConfig = ref<TextConfig>({
  text: 'Sample Text',
  color: '#ffffff',
  fontSize: 32,
  fontWeight: 'normal',
  fontFamily: 'Arial',
  textShadow: false,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 4,
  useGradient: false,
  gradientColors: ['#ff0000', '#0000ff']
});

// Sync with parent config on mount
onMounted(() => {
  // Merge default config with provided config
  localConfig.value = { ...localConfig.value, ...props.config };
});

// Preset styles
const presets = {
  modern: {
    text: localConfig.value.text,
    fontSize: 48,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    useGradient: true,
    gradientColors: ['#3498db', '#9b59b6'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 10
  },
  neon: {
    text: localConfig.value.text,
    fontSize: 54,
    fontFamily: 'Impact',
    fontWeight: 'normal',
    color: '#39ff14',
    useGradient: false,
    textShadow: true,
    shadowColor: 'rgba(57, 255, 20, 0.8)',
    shadowBlur: 15
  },
  retro: {
    text: localConfig.value.text,
    fontSize: 42,
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    useGradient: true,
    gradientColors: ['#f39c12', '#e74c3c'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowBlur: 6
  },
  minimal: {
    text: localConfig.value.text,
    fontSize: 36,
    fontFamily: 'Helvetica',
    fontWeight: 'lighter',
    color: '#ffffff',
    useGradient: false,
    textShadow: false
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
.text-config {
  padding: 10px;
}
</style>
