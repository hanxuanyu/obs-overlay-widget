<template>
  <div class="image-widget">
    <img 
      v-if="config.imageUrl" 
      :src="config.imageUrl" 
      :style="imageStyle" 
      alt="Widget Image" 
    />
    <div v-else class="placeholder" :style="placeholderStyle">
      Please set an image URL
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ImageConfig } from './types';

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

// Computed styles for the image
const imageStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${props.config.width || 200}px`,
    height: `${props.config.height || 200}px`,
    opacity: `${props.config.opacity || 1}`,
    borderRadius: `${props.config.borderRadius || 0}px`,
    objectFit: 'cover'
  };
  
  // Apply shadow if enabled
  if (props.config.shadow) {
    style.filter = `drop-shadow(0 0 ${props.config.shadowBlur || 10}px ${props.config.shadowColor || 'rgba(0,0,0,0.5)'})`;
  }
  
  return style;
});

// Style for placeholder when no image is set
const placeholderStyle = computed(() => {
  return {
    width: `${props.config.width || 200}px`,
    height: `${props.config.height || 200}px`,
    borderRadius: `${props.config.borderRadius || 0}px`,
    opacity: `${props.config.opacity || 1}`,
  };
});
</script>

<style scoped>
.image-widget {
  display: inline-block;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.7);
  font-family: Arial, sans-serif;
  font-size: 16px;
}
</style>
