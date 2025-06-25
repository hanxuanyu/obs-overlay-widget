<template>
  <div class="text-widget" :style="textStyle">
    {{ config.text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Define props interface
interface TextConfig {
  text: string;
  color: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  useGradient: boolean;
  gradientColors: string[];
}

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

// Computed styles for the text
const textStyle = computed(() => {
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
.text-widget {
  display: inline-block;
  padding: 10px;
  font-family: Arial, sans-serif;
  user-select: none;
}
</style>
