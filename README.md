# OBS 悬浮小组件

一个为 OBS Studio 直播和录制场景开发的高度可定制化小组件集合，基于 Vue 3、TypeScript 和 Vite 构建。

## 功能特点

- **多种小组件**：内置时钟、日期、文本、图片等多种可配置小组件
- **动态首页**：自动展示所有已注册小组件，便于预览和选择
- **分屏界面**：左侧为配置面板，右侧为实时预览
- **透明背景**：所有小组件均具有适合 OBS 悬浮的透明背景
- **URL 生成**：自动生成包含编码配置的可分享 URL
- **纯预览模式**：打开生成的 URL 仅显示小组件内容，无配置界面，背景透明
- **可扩展性**：集中化的小组件注册机制，便于添加新的小组件类型

## 小组件类型

1. **时钟小组件**：显示当前时间，可自定义格式、样式和特效，支持显示日期
2. **日期小组件**：显示当前日期，可自定义格式、样式和特效
3. **文本小组件**：显示文本，支持渐变、阴影、字体等自定义样式
4. **图片小组件**：显示图片，可自定义大小、特效和位置

## 使用方法

1. 在首页浏览并选择需要的小组件类型
2. 在配置页面中，从下拉菜单中选择小组件类型
3. 使用左侧控制面板配置小组件属性和样式
4. 在右侧实时查看预览效果
5. 复制生成的 URL，在 OBS Studio 中作为浏览器源使用

## 小组件配置详解

### 时钟小组件

- **时间格式**：支持 24 小时制 (HH:mm:ss) 和 12 小时制 (hh:mm:ss A)
- **显示秒**：切换是否显示秒数
- **显示日期**：切换是否在时钟下方显示日期
- **日期格式**：多种日期格式可选，如 YYYY-MM-DD、MM/DD/YYYY 等
- **样式设置**：
  - 字体大小、字体类型、字重
  - 文本颜色或渐变色
  - 文字阴影及模糊度

### 日期小组件

- **日期格式**：多种格式可选，支持年月日不同顺序排列
- **显示星期**：切换是否显示星期几
- **样式设置**：与时钟小组件类似，支持字体、颜色和阴影自定义

### 文本小组件

- **文本内容**：自定义显示的文字内容
- **样式设置**：
  - 字体大小、字体类型、字重
  - 文本颜色或渐变色
  - 文字阴影及模糊度

### 图片小组件

- **图片 URL**：输入远程图片的 URL
- **尺寸设置**：自定义宽度和高度
- **透明度**：调整图片透明度
- **圆角**：调整图片圆角半径
- **阴影效果**：添加阴影及调整阴影颜色和模糊度

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── assets/            # 静态资源
├── components/        # 通用组件
├── router/            # 路由配置
├── utils/             # 工具函数
│   └── configUtils.ts # 配置编码/解码工具
├── views/             # 页面视图
│   ├── HomeView.vue   # 主页
│   ├── ConfigView.vue # 配置页面
│   └── PreviewView.vue# 预览页面
├── widgets/           # 小组件模块
│   ├── clock/         # 时钟小组件模块
│   │   ├── index.ts   # 模块导出
│   │   ├── types.ts   # 类型定义
│   │   ├── Widget.vue # 小组件组件
│   │   └── Config.vue # 配置组件
│   ├── date/          # 日期小组件模块
│   ├── text/          # 文本小组件模块
│   ├── image/         # 图片小组件模块
│   └── registry.ts    # 小组件注册中心
```

## 小组件开发指南

### 创建新小组件

1. **创建小组件文件夹**：在 `src/widgets/` 下创建新的文件夹，如 `newwidget/`

2. **创建必要文件**：
   - `types.ts` - 定义配置接口和默认配置
   - `Widget.vue` - 小组件显示组件
   - `Config.vue` - 小组件配置组件
   - `index.ts` - 模块导出文件

3. **实现类型定义**（types.ts）：
   ```typescript
   // 小组件配置接口
   export interface NewWidgetConfig {
     // 配置属性定义
   }
   
   // 默认配置
   export const defaultConfig: NewWidgetConfig = {
     // 默认值
   };
   ```

4. **实现小组件组件**（Widget.vue）：
   ```vue
   <template>
     <!-- 小组件UI -->
   </template>
   
   <script setup lang="ts">
   import type { NewWidgetConfig } from './types';
   // 组件逻辑
   </script>
   ```

5. **实现配置组件**（Config.vue）：
   ```vue
   <template>
     <!-- 配置UI -->
   </template>
   
   <script setup lang="ts">
   import type { NewWidgetConfig } from './types';
   // 配置逻辑
   </script>
   ```

6. **导出模块**（index.ts）：
   ```typescript
   import Widget from './Widget.vue';
   import Config from './Config.vue';
   import { defaultConfig } from './types';
   
   export default {
     label: '新小组件',
     value: 'newwidget',
     component: Widget,
     configComponent: Config,
     getDefaultConfig: () => defaultConfig
   };
   ```

7. **注册小组件**：在 `registry.ts` 中导入并添加到 `widgets` 数组

### 架构优势

- **模块化设计**：每个小组件独立成模块，包含所有相关代码
- **类型安全**：TypeScript 提供完整的类型检查和智能提示
- **可扩展性**：添加新小组件无需修改核心逻辑，只需创建新模块并注册
- **代码组织**：相关代码集中在同一文件夹，便于维护和理解
- **零侵入**：新增小组件不会影响现有小组件和核心功能
│   ├── ClockWidget.vue
│   ├── DateWidget.vue
│   ├── TextWidget.vue
│   └── ImageWidget.vue
├── App.vue            # 应用入口组件
└── main.ts            # 应用入口文件
```

## 实现原理

本项目基于 Vue 3 组合式 API 和 TypeScript 构建，核心实现包括：

1. **小组件系统**：每个小组件都是独立的 Vue 组件，通过 props 接收配置
2. **配置系统**：每种小组件对应一个配置组件，使用 v-model 进行双向绑定
3. **集中注册机制**：通过 `registry.ts` 统一管理所有小组件，便于扩展和维护
4. **动态首页展示**：自动从注册表中读取小组件信息展示在首页，通过映射添加图标和描述
5. **URL 参数传递**：使用 Base64 编码将配置数据序列化到 URL 中
6. **预览模式**：通过 URL 参数判断是否处于纯预览模式，隐藏配置界面
7. **响应式更新**：使用 Vue 的响应式系统实现配置变更时的实时预览

## 最近更新

- **界面全面中文化**：所有小组件界面、配置面板、提示文本已全部中文化
- **时钟小组件增强**：时钟小组件支持显示日期功能，样式与时间保持一致
- **动态首页改进**：首页自动读取注册的小组件列表，支持内容滚动
- **小组件注册中心**：新增 `registry.ts` 作为小组件注册中心，统一管理
- **响应式布局优化**：改进移动端和小屏幕适配体验

## 如何添加新小组件

要添加新的小组件，需要以下步骤：

1. **创建小组件组件**：在 `src/widgets/` 目录下创建新的 Vue 组件，如 `NewWidget.vue`

```vue
<template>
  <div class="new-widget" :style="widgetStyle">
    <!-- 小组件内容 -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// 定义配置接口
interface NewWidgetConfig {
  // 添加所需配置属性
  property1: string;
  property2: number;
  // ...
}

// 定义 props（注意包含默认值和类型）
const props = withDefaults(defineProps<{
  config: Partial<NewWidgetConfig>;
}>(), {
  config: () => ({
    property1: 'default',
    property2: 0,
    // ...提供默认值
  })
});

// 计算样式
const widgetStyle = computed(() => {
  // 返回基于配置的样式对象
  return {
    // ...
  };
});
</script>

<style scoped>
.new-widget {
  /* 基础样式 */
}
</style>
```

1. **创建配置组件**：在 `src/components/config/` 目录下创建对应的配置组件，如 `NewConfig.vue`

```vue
<template>
  <div class="new-config">
    <h2>新小组件设置</h2>
    
    <el-form label-position="top">
      <!-- 配置表单项 -->
      <el-form-item label="属性1">
        <el-input v-model="localConfig.property1" />
      </el-form-item>
      
      <el-form-item label="属性2">
        <el-slider v-model="localConfig.property2" :min="0" :max="100" show-input />
      </el-form-item>
      
      <!-- 更多配置项 -->
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

// 定义配置接口
interface NewWidgetConfig {
  property1: string;
  property2: number;
  // ...
}

// 定义 props
const props = withDefaults(defineProps<{
  config: Partial<NewWidgetConfig>;
}>(), {
  config: () => ({
    property1: 'default',
    property2: 0,
    // ...
  })
});

// 定义 emit
const emit = defineEmits<{
  (event: 'update:config', config: NewWidgetConfig): void;
}>();

// 本地配置用于双向绑定
const localConfig = ref<NewWidgetConfig>({
  property1: 'default',
  property2: 0,
  // ...
});

// 同步初始配置
onMounted(() => {
  localConfig.value = { ...localConfig.value, ...props.config };
});

// 监听本地变更并发送更新
watch(localConfig, (newConfig) => {
  emit('update:config', { ...newConfig });
}, { deep: true });
</script>
```

1. **注册新小组件**：在 `src/widgets/registry.ts` 中添加新小组件

```typescript
// 导入新组件
import NewWidget from './NewWidget.vue';
import NewConfig from '../components/config/NewConfig.vue';

// 小组件注册表
export const widgets = [
  // 现有小组件...
  { label: '新小组件', value: 'new', component: NewWidget, configComponent: NewConfig },
];

// 在 getDefaultConfig 函数中添加默认配置
case 'new':
  return {
    property1: 'default',
    property2: 0,
    // ...
  };
```

添加完成后，新小组件会自动出现在首页的可用小组件列表中，并可在配置页面中使用。

## 故障排除

如果遇到与未定义属性相关的 TypeScript 错误，请确保：

1. 所有小组件组件都能处理可能未定义的配置属性
2. 为所有配置选项提供默认值
3. 使用适当的空值检查（例如：`props.config.property || defaultValue`）

## 与 OBS Studio 集成

1. 在 Web 服务器或本地运行此应用
2. 使用配置界面设置您的小组件
3. 复制生成的 URL
4. 在 OBS Studio 中：
   - 向您的场景添加"浏览器源"
   - 将 URL 粘贴到浏览器源 URL 字段
   - 根据需要设置宽度和高度
   - 勾选"不可见时关闭源"以获得更好的性能
