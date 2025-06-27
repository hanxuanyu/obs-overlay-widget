# 新建小组件模板

这是一个模板，用于快速创建新的小组件。

## 步骤

### 1. 创建小组件目录结构

```
src/widgets/[widget-name]/
├── index.ts          # 小组件注册入口
├── types.ts          # 类型定义和默认配置
├── Widget.vue        # 小组件显示组件
└── Config.vue        # 小组件配置组件
```

### 2. 实现 types.ts

```typescript
import type { BaseWidgetConfig } from '../types';

// 小组件配置接口
export interface YourWidgetConfig extends BaseWidgetConfig {
  // 定义你的配置属性
  text: string;
  color: string;
  fontSize: number;
  // ... 其他配置
}

// 默认配置
export const defaultConfig: YourWidgetConfig = {
  text: 'Hello World',
  color: '#ffffff',
  fontSize: 24,
  // ... 其他默认值
};
```

### 3. 实现 Widget.vue

```vue
<template>
  <div class="your-widget" :style="widgetStyle">
    {{ config.text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { YourWidgetConfig } from './types';

// 接收配置props
const props = defineProps<{
  config: YourWidgetConfig;
}>();

// 计算样式
const widgetStyle = computed(() => ({
  color: props.config.color,
  fontSize: props.config.fontSize + 'px',
  // ... 其他样式
}));
</script>

<style scoped>
.your-widget {
  /* 基础样式 */
}
</style>
```

### 4. 实现 Config.vue

```vue
<template>
  <div class="config-panel">
    <el-form :model="config" label-width="120px">
      <el-form-item label="文本内容">
        <el-input v-model="config.text" @input="updateConfig" />
      </el-form-item>
      
      <el-form-item label="文字颜色">
        <el-color-picker v-model="config.color" @change="updateConfig" />
      </el-form-item>
      
      <el-form-item label="字体大小">
        <el-slider 
          v-model="config.fontSize" 
          :min="12" 
          :max="72" 
          @change="updateConfig" 
        />
      </el-form-item>
      
      <!-- 其他配置项... -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { YourWidgetConfig } from './types';

// 接收配置和更新函数
const props = defineProps<{
  modelValue: YourWidgetConfig;
}>();

const emit = defineEmits<{
  'update:modelValue': [config: YourWidgetConfig];
}>();

// 本地配置状态
const config = reactive({ ...props.modelValue });

// 监听外部配置变化
watch(() => props.modelValue, (newValue) => {
  Object.assign(config, newValue);
}, { deep: true });

// 更新配置
const updateConfig = () => {
  emit('update:modelValue', { ...config });
};
</script>

<style scoped>
.config-panel {
  padding: 20px;
}
</style>
```

### 5. 实现 index.ts

```typescript
import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';
import { createWidget } from '../createWidget';

export default createWidget({
  label: '你的小组件',
  value: 'your-widget',
  icon: '🎯', // 选择合适的emoji图标
  description: '这是你的小组件的描述',
  component: Widget,
  configComponent: Config,
  defaultConfig
});
```

### 6. 在 registry.ts 中注册

```typescript
// 在 src/widgets/registry.ts 中添加导入
import YourWidget from './your-widget';

// 在小组件注册表中添加
export const widgets: WidgetRegistration[] = [
  ClockWidget,
  DateWidget,
  TextWidget,
  ImageWidget,
  WeatherWidget,
  YourWidget, // 添加你的小组件
];
```

## 完成！

现在你的新小组件就会自动出现在：
- 首页的小组件列表中
- 配置页面的小组件选择器中
- 预览页面中可以显示

## 最佳实践

1. **命名规范**: 使用kebab-case命名目录和文件
2. **图标选择**: 选择有意义的emoji作为图标
3. **配置项**: 提供合理的默认值，让小组件开箱即用
4. **样式**: 使用CSS变量和计算属性，让样式可配置
5. **类型安全**: 充分利用TypeScript的类型检查
