<template>
  <div
    class="marquee-container"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="config.direction === 'horizontal'"
      class="marquee-horizontal"
      :style="horizontalStyle"
      ref="horizontalRef"
    >
      <span class="marquee-text" :style="textStyle">{{ config.content }}</span>
      <span class="marquee-text marquee-duplicate" :style="textStyle">{{ config.content }}</span>
    </div>
    
    <div
      v-else
      class="marquee-vertical"
      :style="verticalStyle"
    >
      <div
        class="marquee-vertical-content"
        :style="verticalContentStyle"
      >
        <div
          v-for="(line, index) in contentLines"
          :key="index"
          class="marquee-line"
          :style="lineStyle"
        >
          {{ line }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import type { MarqueeConfig } from './types';

interface Props {
  config: MarqueeConfig;
}

const props = defineProps<Props>();

const horizontalRef = ref<HTMLElement>();
const currentLineIndex = ref(0);
const horizontalOffset = ref(0);
const isPaused = ref(false);
let animationId: number | null = null;
let verticalTimer: number | null = null;
let lastTime = 0;

// 计算样式
const containerStyle = computed(() => ({
  width: `${props.config.width}px`,
  height: `${props.config.height}px`,
  backgroundColor: props.config.backgroundColor,
  borderRadius: `${props.config.borderRadius}px`,
  padding: `${props.config.padding}px`,
  overflow: 'hidden',
  position: 'relative' as const,
  boxSizing: 'border-box' as const
}));

const textStyle = computed(() => {
  const style: any = {
    fontSize: `${props.config.fontSize}px`,
    fontWeight: props.config.fontWeight,
    fontFamily: props.config.fontFamily,
    whiteSpace: 'nowrap',
    lineHeight: '1.2', // 固定行高，避免文本被遮挡
    margin: 0,
    padding: 0
  };

  if (props.config.useGradient && props.config.gradientColors.length >= 2) {
    style.background = `linear-gradient(45deg, ${props.config.gradientColors.join(', ')})`;
    style.WebkitBackgroundClip = 'text';
    style.WebkitTextFillColor = 'transparent';
    style.backgroundClip = 'text';
  } else {
    style.color = props.config.color;
  }

  if (props.config.textShadow) {
    style.textShadow = `0 0 ${props.config.shadowBlur}px ${props.config.shadowColor}`;
  }

  return style;
});

const horizontalStyle = computed(() => ({
  transform: `translateX(${horizontalOffset.value}px)`,
  transition: isPaused.value ? 'none' : 'transform 0.1s linear',
  height: '100%',
  display: 'flex',
  alignItems: 'center'
}));

const verticalStyle = computed(() => {
  // 根据显示行数调整容器高度
  const lineHeight = props.config.fontSize * props.config.lineHeight;
  const containerHeight = lineHeight * props.config.displayLines;
  
  return {
    height: `${containerHeight}px`,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'flex-start' as const,
    overflow: 'hidden'
  };
});

const verticalContentStyle = computed(() => {
  const lineHeight = props.config.fontSize * props.config.lineHeight;
  const offset = currentLineIndex.value * lineHeight;
  return {
    transform: `translateY(${-offset}px)`,
    transition: 'transform 0.5s ease-in-out'
  };
});

const lineStyle = computed(() => {
  const lineHeight = props.config.fontSize * props.config.lineHeight;
  const style: any = {
    fontSize: `${props.config.fontSize}px`,
    fontWeight: props.config.fontWeight,
    fontFamily: props.config.fontFamily,
    margin: 0,
    padding: 0,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: `${lineHeight}px`,
    lineHeight: props.config.lineHeight,
    whiteSpace: 'nowrap'
  };

  if (props.config.useGradient && props.config.gradientColors.length >= 2) {
    style.background = `linear-gradient(45deg, ${props.config.gradientColors.join(', ')})`;
    style.WebkitBackgroundClip = 'text';
    style.WebkitTextFillColor = 'transparent';
    style.backgroundClip = 'text';
  } else {
    style.color = props.config.color;
  }

  if (props.config.textShadow) {
    style.textShadow = `0 0 ${props.config.shadowBlur}px ${props.config.shadowColor}`;
  }

  return style;
});

// 分割内容为行
const contentLines = computed(() => {
  return props.config.content.split('\n').filter(line => line.trim() !== '');
});

// 水平滚动动画
const startHorizontalAnimation = () => {
  if (!horizontalRef.value || props.config.direction !== 'horizontal') return;
  
  const container = horizontalRef.value.parentElement;
  if (!container) return;
  
  // 等待下一帧确保DOM已渲染
  requestAnimationFrame(() => {
    const textElement = horizontalRef.value?.querySelector('.marquee-text') as HTMLElement;
    if (!textElement) return;
    
    const containerWidth = container.offsetWidth;
    const textWidth = textElement.offsetWidth;
    const spacing = 50; // 两个文本之间的间距
    const totalWidth = textWidth + spacing;
    
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      if (!isPaused.value) {
        const direction = props.config.horizontalDirection === 'left' ? -1 : 1;
        const pixelsPerSecond = props.config.speed;
        const deltaPixels = (pixelsPerSecond * deltaTime) / 1000;
        
        horizontalOffset.value += direction * deltaPixels;
        
        // 无缝循环重置位置
        if (props.config.horizontalDirection === 'left') {
          if (horizontalOffset.value <= -totalWidth) {
            horizontalOffset.value = 0;
          }
        } else {
          if (horizontalOffset.value >= totalWidth) {
            horizontalOffset.value = 0;
          }
        }
      }
      
      if (props.config.loop) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    // 设置初始位置
    if (props.config.horizontalDirection === 'left') {
      horizontalOffset.value = containerWidth;
    } else {
      horizontalOffset.value = -totalWidth;
    }
    
    animationId = requestAnimationFrame(animate);
  });
};

// 垂直滚动动画
const startVerticalAnimation = () => {
  if (props.config.direction !== 'vertical' || contentLines.value.length <= props.config.displayLines) return;
  
  const showNextLines = () => {
    const totalLines = contentLines.value.length;
    const displayLines = props.config.displayLines;
    
    // 按照显示行数来滚动
    let nextIndex = currentLineIndex.value + displayLines;
    
    // 如果超出范围，从头开始
    if (nextIndex >= totalLines) {
      nextIndex = 0;
    }
    
    currentLineIndex.value = nextIndex;
    
    if (props.config.loop || nextIndex !== 0) {
      verticalTimer = window.setTimeout(showNextLines, props.config.verticalInterval * 1000);
    }
  };
  
  verticalTimer = window.setTimeout(showNextLines, props.config.verticalInterval * 1000);
};

// 鼠标事件处理
const handleMouseEnter = () => {
  if (props.config.pauseOnHover) {
    isPaused.value = true;
  }
};

const handleMouseLeave = () => {
  if (props.config.pauseOnHover) {
    isPaused.value = false;
  }
};

// 停止动画
const stopAnimations = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (verticalTimer) {
    clearTimeout(verticalTimer);
    verticalTimer = null;
  }
  lastTime = 0;
};

// 启动动画
const startAnimation = () => {
  stopAnimations();
  currentLineIndex.value = 0;
  
  if (props.config.direction === 'horizontal') {
    startHorizontalAnimation();
  } else {
    startVerticalAnimation();
  }
};

// 监听配置变化
watch(() => props.config, () => {
  startAnimation();
}, { deep: true });

onMounted(() => {
  startAnimation();
});

onUnmounted(() => {
  stopAnimations();
});
</script>

<style scoped>
.marquee-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
}

.marquee-horizontal {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  width: auto;
  display: flex;
  align-items: center;
}

.marquee-vertical {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.marquee-vertical-content {
  display: flex;
  flex-direction: column;
}

.marquee-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.marquee-line.active {
  opacity: 1 !important;
}

.marquee-text {
  display: inline-block;
  white-space: nowrap;
}

.marquee-duplicate {
  margin-left: 50px; /* 两个文本之间的间距 */
}
</style>
