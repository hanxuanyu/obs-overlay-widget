<template>
  <div class="timer-config">
    <h2>计时器小组件设置</h2>
    
    <el-form label-position="top">
      <el-divider>预设样式</el-divider>
      
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="applyPreset('gaming')">游戏风格</el-button>
          <el-button type="success" @click="applyPreset('meeting')">会议计时</el-button>
          <el-button type="warning" @click="applyPreset('workout')">运动计时</el-button>
          <el-button type="danger" @click="applyPreset('minimal')">简约风格</el-button>
        </el-button-group>
      </el-form-item>

      <el-divider>基本设置</el-divider>

      <el-form-item label="计时器模式">
        <el-radio-group v-model="localConfig.mode">
          <el-radio value="countdown">倒计时</el-radio>
          <el-radio value="stopwatch">正计时</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item v-if="localConfig.mode === 'countdown'" label="倒计时时长">
        <div style="display: flex; gap: 10px; align-items: center;">
          <el-input-number 
            v-model="durationMinutes" 
            :min="0" 
            :max="999" 
            controls-position="right"
            style="width: 100px"
          />
          <span>分钟</span>
          <el-input-number 
            v-model="durationSeconds" 
            :min="0" 
            :max="59" 
            controls-position="right"
            style="width: 100px"
          />
          <span>秒</span>
        </div>
      </el-form-item>
      
      <el-form-item>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span>自动开始</span>
            <el-switch v-model="localConfig.autoStart" style="margin-left: 10px;" />
          </div>
          <div>
            <span>显示毫秒</span>
            <el-switch v-model="localConfig.showMilliseconds" style="margin-left: 10px;" />
          </div>
        </div>
      </el-form-item>
      
      <el-form-item label="时间格式">
        <el-select v-model="localConfig.format" placeholder="选择格式">
          <el-option label="mm:ss (分:秒)" value="mm:ss" />
          <el-option label="hh:mm:ss (时:分:秒)" value="hh:mm:ss" />
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
          <el-option label="JetBrains Mono" value="'JetBrains Mono'" />
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
      
      <el-form-item v-if="localConfig.mode === 'countdown'" label="结束颜色">
        <el-color-picker v-model="localConfig.finishedColor" show-alpha />
      </el-form-item>
      
      <template v-if="localConfig.mode === 'countdown'">
        <el-divider>警告设置</el-divider>
        
        <el-form-item label="警告阈值（秒）">
          <el-input-number 
            v-model="localConfig.warningThreshold" 
            :min="0" 
            :max="3600" 
            controls-position="right"
          />
        </el-form-item>
        
        <el-form-item label="警告颜色">
          <el-color-picker v-model="localConfig.warningColor" show-alpha />
        </el-form-item>
        
        <el-divider>进度条设置</el-divider>
        
        <el-form-item label="显示进度条">
          <el-switch v-model="localConfig.showProgress" />
        </el-form-item>
        
        <template v-if="localConfig.showProgress">
          <el-form-item label="进度条颜色">
            <el-color-picker v-model="localConfig.progressColor" show-alpha />
          </el-form-item>
          
          <el-form-item label="进度条高度">
            <el-slider v-model="localConfig.progressHeight" :min="1" :max="20" show-input />
          </el-form-item>
        </template>
        
        <el-divider>音效设置</el-divider>
        
        <el-form-item label="播放提示音">
          <el-switch v-model="localConfig.playSound" />
        </el-form-item>
        
        <el-form-item v-if="localConfig.playSound" label="音量">
          <el-slider v-model="localConfig.soundVolume" :min="0" :max="100" show-input />
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
      
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import type { TimerConfig, TimerMode } from './types';

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<TimerConfig>;
}>(), {
  config: () => ({
    mode: 'countdown',
    duration: 300,
    autoStart: false,
    showMilliseconds: false,
    format: 'mm:ss',
    color: '#ffffff',
    fontSize: 48,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    textShadow: false,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 4,
    useGradient: false,
    gradientColors: ['#ff0000', '#0000ff'],
    finishedColor: '#ff0000',
    playSound: true,
    soundVolume: 50,
    warningThreshold: 30,
    warningColor: '#ff6b35',
    showProgress: true,
    progressColor: '#3498db',
    progressHeight: 4
  })
});

// Define emit
const emit = defineEmits<{
  (event: 'update:config', config: TimerConfig): void;
}>();

// Local config for two-way binding
const localConfig = ref<TimerConfig>({
  mode: 'countdown',
  duration: 300,
  autoStart: false,
  showMilliseconds: false,
  format: 'mm:ss',
  color: '#ffffff',
  fontSize: 48,
  fontWeight: 'normal',
  fontFamily: 'Arial',
  textShadow: false,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 4,
  useGradient: false,
  gradientColors: ['#ff0000', '#0000ff'],
  finishedColor: '#ff0000',
  playSound: true,
  soundVolume: 50,
  warningThreshold: 30,
  warningColor: '#ff6b35',
  showProgress: true,
  progressColor: '#3498db',
  progressHeight: 4
});

// 持续时间的分钟和秒数
const durationMinutes = computed({
  get: () => Math.floor((localConfig.value.duration || 0) / 60),
  set: (value: number) => {
    const seconds = (localConfig.value.duration || 0) % 60;
    localConfig.value.duration = value * 60 + seconds;
  }
});

const durationSeconds = computed({
  get: () => (localConfig.value.duration || 0) % 60,
  set: (value: number) => {
    const minutes = Math.floor((localConfig.value.duration || 0) / 60);
    localConfig.value.duration = minutes * 60 + value;
  }
});

// Sync with parent config on mount
onMounted(() => {
  // Merge default config with provided config
  localConfig.value = { ...localConfig.value, ...props.config };
});

// Preset styles
const presets = {
  gaming: {
    mode: 'countdown' as TimerMode,
    duration: 1800, // 30分钟
    format: 'mm:ss',
    fontSize: 64,
    fontFamily: 'Impact',
    fontWeight: 'bold',
    color: '#ff6b35',
    useGradient: true,
    gradientColors: ['#ff6b35', '#f7931e'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowBlur: 8,
    showProgress: true,
    progressColor: '#ff6b35',
    progressHeight: 6,
    warningThreshold: 60,
    warningColor: '#ff0000',
    playSound: true,
    soundVolume: 80,
    autoStart: false,
    showMilliseconds: false,
    finishedColor: '#ff0000'
  },
  meeting: {
    mode: 'countdown' as TimerMode,
    duration: 3600, // 60分钟
    format: 'hh:mm:ss',
    fontSize: 52,
    fontFamily: 'Arial',
    fontWeight: 'normal',
    color: '#2ecc71',
    useGradient: false,
    gradientColors: ['#2ecc71', '#27ae60'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 4,
    showProgress: true,
    progressColor: '#2ecc71',
    progressHeight: 4,
    warningThreshold: 300,
    warningColor: '#f39c12',
    finishedColor: '#e74c3c',
    playSound: true,
    soundVolume: 60,
    autoStart: false,
    showMilliseconds: false
  },
  workout: {
    mode: 'stopwatch' as TimerMode,
    duration: 0,
    format: 'mm:ss',
    fontSize: 72,
    fontFamily: 'JetBrains Mono',
    fontWeight: 'bold',
    color: '#e74c3c',
    useGradient: true,
    gradientColors: ['#e74c3c', '#c0392b'],
    textShadow: true,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 6,
    showMilliseconds: true,
    autoStart: false,
    showProgress: false,
    progressColor: '#e74c3c',
    progressHeight: 4,
    warningThreshold: 0,
    warningColor: '#f39c12',
    finishedColor: '#e74c3c',
    playSound: false,
    soundVolume: 50
  },
  minimal: {
    mode: 'countdown' as TimerMode,
    duration: 300,
    format: 'mm:ss',
    fontSize: 48,
    fontFamily: 'Helvetica',
    fontWeight: 'lighter',
    color: '#ffffff',
    useGradient: false,
    gradientColors: ['#ffffff', '#f8f9fa'],
    textShadow: false,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowBlur: 4,
    showProgress: false,
    progressColor: '#ffffff',
    progressHeight: 4,
    warningThreshold: 30,
    warningColor: '#f39c12',
    finishedColor: '#e74c3c',
    playSound: false,
    soundVolume: 50,
    autoStart: false,
    showMilliseconds: false
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
.timer-config {
  padding: 10px;
}
</style>
