<template>
  <div class="clock-widget" :style="clockStyle">
    <div>{{ currentTime }}</div>
    <div v-if="props.config.showDate" :style="clockStyle">{{ currentDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import dayjs from 'dayjs';
import type { ClockConfig } from './types';

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

// State for current time and date
const currentTime = ref('');
const currentDate = ref('');

// Update time string based on format
const updateTime = () => {
  const currentFormat = props.config.format || 'HH:mm:ss';
  const format = props.config.showSeconds ? currentFormat : currentFormat.replace(':ss', '');
  currentTime.value = dayjs().format(format);
  
  // Update date if enabled
  if (props.config.showDate) {
    const dateFormat = props.config.dateFormat || 'YYYY-MM-DD';
    currentDate.value = dayjs().format(dateFormat);
  }
};

// Interval for updating time
let timeInterval: number | null = null;

// Start the clock
onMounted(() => {
  updateTime();
  
  // Set interval based on whether seconds are shown
  const intervalTime = props.config.showSeconds ? 1000 : 60000;
  timeInterval = window.setInterval(updateTime, intervalTime);
});

// Clean up interval on component unmount
onUnmounted(() => {
  if (timeInterval !== null) {
    window.clearInterval(timeInterval);
  }
});

// Watch for showSeconds changes
watch(() => props.config.showSeconds, (newValue) => {
  if (timeInterval !== null) {
    window.clearInterval(timeInterval);
  }
  
  const intervalTime = newValue ? 1000 : 60000;
  timeInterval = window.setInterval(updateTime, intervalTime);
  updateTime();
});

// Watch for showDate or dateFormat changes
watch([() => props.config.showDate, () => props.config.dateFormat], () => {
  updateTime();
}, { deep: true });

// Computed styles for the clock
const clockStyle = computed(() => {
  const style: Record<string, string> = {
    fontSize: `${props.config.fontSize || 48}px`,
    fontFamily: props.config.fontFamily || 'Arial',
    fontWeight: props.config.fontWeight || 'normal'
  };
  
  // Apply gradient or solid color
  if (props.config.useGradient && (props.config.gradientColors || []).length >= 2) {
    const colors = props.config.gradientColors || ['#ff0000', '#0000ff'];
    style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
    style.webkitBackgroundClip = 'text';
    style.backgroundClip = 'text';
    style.color = 'transparent';
  } else {
    style.color = props.config.color || '#ffffff';
  }
  
  // Apply text shadow if enabled
  if (props.config.textShadow) {
    style.textShadow = `0 0 ${props.config.shadowBlur || 4}px ${props.config.shadowColor || 'rgba(0,0,0,0.5)'}`;
  }
  
  return style;
});
</script>

<style scoped>
.clock-widget {
  display: inline-block;
  padding: 10px;
  font-family: Arial, sans-serif;
  user-select: none;
  text-align: center;
}
</style>
