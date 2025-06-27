<template>
  <div class="timer-widget" :style="containerStyle">
    <div class="timer-display" :style="timerStyle" @click="toggleTimer">
      {{ displayTime }}
    </div>
    <div 
      v-if="props.config.showProgress && props.config.mode === 'countdown'" 
      class="progress-bar"
      :style="progressBarStyle"
    >
      <div class="progress-fill" :style="progressFillStyle"></div>
    </div>
    <div class="timer-controls" v-if="!props.config.autoStart">
      <button @click="startTimer" :disabled="status === 'running'" class="control-btn start">
        {{ status === 'paused' ? '继续' : '开始' }}
      </button>
      <button @click="pauseTimer" :disabled="status !== 'running'" class="control-btn pause">
        暂停
      </button>
      <button @click="resetTimer" class="control-btn reset">
        重置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { TimerConfig, TimerStatus, TimerMode } from './types';

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

// 状态管理
const status = ref<TimerStatus>('stopped');
const currentTime = ref(0); // 当前时间（秒）
const startTime = ref(0);
const pausedTime = ref(0);

// 计时器相关
let animationFrame: number | null = null;

// 计算显示时间
const displayTime = computed(() => {
  const time = Math.max(0, currentTime.value);
  const totalSeconds = Math.floor(time);
  const milliseconds = Math.floor((time % 1) * 1000);
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const format = props.config.format || 'mm:ss';
  
  if (format.includes('hh')) {
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return props.config.showMilliseconds ? `${timeStr}.${milliseconds.toString().padStart(3, '0')}` : timeStr;
  } else {
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return props.config.showMilliseconds ? `${timeStr}.${milliseconds.toString().padStart(3, '0')}` : timeStr;
  }
});

// 计算当前颜色
const currentColor = computed(() => {
  if (status.value === 'finished') {
    return props.config.finishedColor || '#ff0000';
  }
  
  if (props.config.mode === 'countdown' && props.config.warningThreshold) {
    if (currentTime.value <= props.config.warningThreshold && currentTime.value > 0) {
      return props.config.warningColor || '#ff6b35';
    }
  }
  
  return props.config.color || '#ffffff';
});

// 进度条样式
const progressBarStyle = computed(() => ({
  width: '100%',
  height: `${props.config.progressHeight || 4}px`,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '2px',
  marginTop: '8px',
  overflow: 'hidden'
}));

const progressFillStyle = computed(() => {
  const progress = props.config.mode === 'countdown' 
    ? (currentTime.value / (props.config.duration || 300)) * 100
    : 0;
  
  return {
    width: `${Math.max(0, Math.min(100, progress))}%`,
    height: '100%',
    backgroundColor: props.config.progressColor || '#3498db',
    transition: 'width 0.1s ease'
  };
});

// 容器样式
const containerStyle = computed(() => ({
  textAlign: 'center',
  userSelect: 'none'
}));

// 计时器显示样式
const timerStyle = computed(() => {
  const style: Record<string, string> = {
    fontSize: `${props.config.fontSize || 48}px`,
    fontFamily: props.config.fontFamily || 'Arial',
    fontWeight: props.config.fontWeight || 'normal',
    cursor: props.config.autoStart ? 'default' : 'pointer',
    marginBottom: '10px'
  };
  
  // 应用渐变或纯色
  if (props.config.useGradient && (props.config.gradientColors || []).length >= 2) {
    const colors = props.config.gradientColors || ['#ff0000', '#0000ff'];
    style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
    style.webkitBackgroundClip = 'text';
    style.backgroundClip = 'text';
    style.color = 'transparent';
  } else {
    style.color = currentColor.value;
  }
  
  // 应用文字阴影
  if (props.config.textShadow) {
    style.textShadow = `0 0 ${props.config.shadowBlur || 4}px ${props.config.shadowColor || 'rgba(0,0,0,0.5)'}`;
  }
  
  return style;
});

// 更新计时器
const updateTimer = () => {
  if (status.value !== 'running') return;
  
  const now = Date.now();
  const elapsed = (now - startTime.value + pausedTime.value) / 1000;
  
  if (props.config.mode === 'countdown') {
    currentTime.value = (props.config.duration || 300) - elapsed;
    
    if (currentTime.value <= 0) {
      currentTime.value = 0;
      status.value = 'finished';
      playFinishSound();
      return;
    }
  } else {
    currentTime.value = elapsed;
  }
  
  animationFrame = requestAnimationFrame(updateTimer);
};

// 播放结束声音
const playFinishSound = () => {
  if (!props.config.playSound) return;
  
  // 创建音频上下文和生成蜂鸣声
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime((props.config.soundVolume || 50) / 100, audioContext.currentTime);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.warn('无法播放提示音:', error);
  }
};

// 控制函数
const startTimer = () => {
  if (status.value === 'stopped') {
    // 重新开始
    if (props.config.mode === 'countdown') {
      currentTime.value = props.config.duration || 300;
    } else {
      currentTime.value = 0;
    }
    pausedTime.value = 0;
  }
  
  startTime.value = Date.now();
  status.value = 'running';
  updateTimer();
};

const pauseTimer = () => {
  if (status.value === 'running') {
    status.value = 'paused';
    pausedTime.value += Date.now() - startTime.value;
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  }
};

const resetTimer = () => {
  status.value = 'stopped';
  pausedTime.value = 0;
  
  if (props.config.mode === 'countdown') {
    currentTime.value = props.config.duration || 300;
  } else {
    currentTime.value = 0;
  }
  
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
};

const toggleTimer = () => {
  if (props.config.autoStart) return;
  
  if (status.value === 'running') {
    pauseTimer();
  } else if (status.value === 'paused' || status.value === 'stopped') {
    startTimer();
  } else if (status.value === 'finished') {
    resetTimer();
  }
};

// 监听配置变化
watch(() => props.config.duration, (newDuration) => {
  if (status.value === 'stopped' && props.config.mode === 'countdown') {
    currentTime.value = newDuration || 300;
  }
});

watch(() => props.config.mode, (newMode) => {
  resetTimer();
});

// 组件挂载
onMounted(() => {
  if (props.config.mode === 'countdown') {
    currentTime.value = props.config.duration || 300;
  } else {
    currentTime.value = 0;
  }
  
  if (props.config.autoStart) {
    startTimer();
  }
});

// 组件卸载
onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<style scoped>
.timer-widget {
  display: inline-block;
  padding: 15px;
  font-family: Arial, sans-serif;
}

.timer-display {
  margin-bottom: 10px;
}

.timer-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.control-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.control-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn.start {
  background: rgba(76, 175, 80, 0.8);
}

.control-btn.pause {
  background: rgba(255, 193, 7, 0.8);
}

.control-btn.reset {
  background: rgba(244, 67, 54, 0.8);
}

.progress-bar {
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  border-radius: 2px;
}
</style>
