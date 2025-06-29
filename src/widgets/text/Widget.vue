<template>
  <div class="text-widget" :style="textStyle">
    <div class="text-content" v-html="formattedText"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TextConfig } from './types';

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<TextConfig>;
}>(), {
  config: () => ({
    text: '示例文本\n支持换行显示',
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    textShadow: false,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 4,
    useGradient: false,
    gradientColors: ['#ff0000', '#0000ff'],
    textAlign: 'left',
    writingMode: 'horizontal'
  })
});

// 格式化文本内容，处理换行
const formattedText = computed(() => {
  const text = props.config.text || '示例文本\n支持换行显示';
  // 将换行符转换为 <br> 标签
  return text.replace(/\n/g, '<br>');
});

// Computed styles for the text
const textStyle = computed(() => {
  const style: Record<string, string> = {
    fontSize: `${props.config.fontSize || 32}px`,
    fontFamily: props.config.fontFamily || 'Arial',
    fontWeight: props.config.fontWeight || 'normal',
    textAlign: props.config.textAlign || 'left'
  };

  // 根据文字显示方向设置样式
  if (props.config.writingMode === 'vertical') {
    style.writingMode = 'vertical-rl';
    style.textOrientation = 'mixed';
  } else {
    style.writingMode = 'horizontal-tb';
  }
  
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

.text-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.2;
}
</style>
