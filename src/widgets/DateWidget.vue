<template>
  <div class="date-widget" :style="dateStyle">
    {{ currentDate }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import dayjs from 'dayjs';

// Define props interface
interface DateConfig {
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
  showWeekday: boolean;
}

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<DateConfig>;
}>(), {
  config: () => ({
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
  })
});

// State for current date
const currentDate = ref('');

// Update date string based on format
const updateDate = () => {
  let dateStr = dayjs().format(props.config.format || 'YYYY-MM-DD');
  
  // Add weekday if enabled
  if (props.config.showWeekday) {
    const weekday = dayjs().format('dddd');
    dateStr = `${weekday}, ${dateStr}`;
  }
  
  currentDate.value = dateStr;
};

// Interval for updating date (at midnight)
let dateInterval: number | null = null;

// Start the date display and set interval to update at midnight
onMounted(() => {
  updateDate();
  
  // Calculate time until next midnight
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const timeUntilMidnight = tomorrow.getTime() - now.getTime();
  
  // Set timeout to update at midnight, then set daily interval
  setTimeout(() => {
    updateDate();
    // Update daily
    dateInterval = window.setInterval(updateDate, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
});

// Clean up interval on component unmount
onUnmounted(() => {
  if (dateInterval !== null) {
    window.clearInterval(dateInterval);
  }
});

// Watch for config changes
watch(() => props.config, () => {
  updateDate();
}, { deep: true });

// Computed styles for the date
const dateStyle = computed(() => {
  const style: Record<string, string> = {
    fontSize: `${props.config.fontSize || 32}px`,
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
.date-widget {
  display: inline-block;
  padding: 10px;
  font-family: Arial, sans-serif;
  user-select: none;
}
</style>
