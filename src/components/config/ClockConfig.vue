<template>
  <div class="clock-config">
    <h2>时钟小组件设置</h2>
    
    <el-form label-position="top">
      <el-form-item label="时间格式">
        <el-select v-model="localConfig.format" placeholder="选择格式">
          <el-option label="HH:mm:ss (24小时制)" value="HH:mm:ss" />
          <el-option label="HH:mm (24小时制)" value="HH:mm" />
          <el-option label="hh:mm:ss A (12小时制)" value="hh:mm:ss A" />
          <el-option label="hh:mm A (12小时制)" value="hh:mm A" />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span>显示秒</span>
            <el-switch v-model="localConfig.showSeconds" style="margin-left: 10px;" />
          </div>
          <div>
            <span>显示日期</span>
            <el-switch v-model="localConfig.showDate" style="margin-left: 10px;" />
          </div>
        </div>
      </el-form-item>
      
      <el-form-item v-if="localConfig.showDate" label="日期格式">
        <el-select v-model="localConfig.dateFormat" placeholder="选择格式">
          <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
          <el-option label="MM/DD/YYYY" value="MM/DD/YYYY" />
          <el-option label="DD/MM/YYYY" value="DD/MM/YYYY" />
          <el-option label="MMMM D, YYYY" value="MMMM D, YYYY" />
          <el-option label="D MMMM YYYY" value="D MMMM YYYY" />
        </el-select>
      </el-form-item>
      
      <el-divider>文本样式</el-divider>
      
      <el-form-item label="字体大小">
        <el-slider v-model="localConfig.fontSize" :min="12" :max="120" show-input />
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
          <el-button type="warning" @click="applyPreset('elegant')">优雅风格</el-button>
          <el-button type="danger" @click="applyPreset('minimal')">简约风格</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// 为配置定义 props 接口
interface ClockConfig {
  format: string;
  color: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  useGradient: boolean;
  gradientColors: string[];
  showSeconds: boolean;
  showDate: boolean;
  dateFormat: string;
}

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<ClockConfig>;
}>(), {
  config: () => ({
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
    showSeconds: true,
    showDate: false,
    dateFormat: 'YYYY-MM-DD'
  })
});

// Define emit
const emit = defineEmits<{
  (event: 'update:config', config: ClockConfig): void;
}>();

// Local config for two-way binding
const localConfig = ref<ClockConfig>({
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
  showSeconds: true,
  showDate: false,
  dateFormat: 'YYYY-MM-DD'
});

// Sync with parent config on mount
onMounted(() => {
  // Merge default config with provided config
  localConfig.value = { ...localConfig.value, ...props.config };
});

// Preset styles
const presets = {
  modern: {
    format: 'HH:mm',
    fontSize: 72,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    useGradient: true,
    gradientColors: ['#3498db', '#9b59b6'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 10,
    showSeconds: false,
    showDate: true,
    dateFormat: 'YYYY-MM-DD'
  },
  neon: {
    format: 'HH:mm:ss',
    fontSize: 60,
    fontFamily: 'Impact',
    fontWeight: 'normal',
    color: '#39ff14',
    useGradient: false,
    textShadow: true,
    shadowColor: 'rgba(57, 255, 20, 0.8)',
    shadowBlur: 15,
    showSeconds: true,
    showDate: false
  },
  elegant: {
    format: 'hh:mm A',
    fontSize: 64,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    useGradient: true,
    gradientColors: ['#d4af37', '#f1c40f'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 5,
    showSeconds: false,
    showDate: true,
    dateFormat: 'MMMM D, YYYY'
  },
  minimal: {
    format: 'HH:mm',
    fontSize: 56,
    fontFamily: 'Helvetica',
    fontWeight: 'lighter',
    color: '#ffffff',
    useGradient: false,
    textShadow: false,
    showSeconds: false,
    showDate: false
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
.clock-config {
  padding: 10px;
}
</style>
