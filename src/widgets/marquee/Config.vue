<template>
  <div class="marquee-config">
    <h2>滚动公告小组件设置</h2>
    
    <el-form label-position="top">
      <el-divider>预设样式</el-divider>
      
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="applyPreset('classic')">经典滚动</el-button>
          <el-button type="suc  modern: {
    conten  gaming: {
    conten  vertical: {
    content: '正在直播中\n精彩内容不要错过\n欢迎弹幕互动\n点个关注吧',
    direction: 'vertical' as const,'击败BOSS! 连击! AMAZING! LEGENDARY!',
    direction: 'horizontal' as const,'正在直播游戏 | LIVE | 欢迎互动聊天！',
    direction: 'horizontal' as const,s" @click="applyPreset('modern')">现代风格</el-button>
          <el-button type="warning" @click="applyPreset('gaming')">游戏主题</el-button>
          <el-button type="danger" @click="applyPreset('vertical')">垂直轮播</el-button>
        </el-button-group>
      </el-form-item>

      <el-divider>基本设置</el-divider>

      <el-form-item label="公告内容">
        <el-input 
          v-model="localConfig.content" 
          type="textarea" 
          :rows="4" 
          placeholder="请输入公告内容，支持多行（垂直滚动模式下每行单独显示）"
        />
      </el-form-item>

      <el-form-item label="滚动方向">
        <el-select v-model="localConfig.direction" placeholder="选择滚动方向">
          <el-option label="水平滚动" value="horizontal" />
          <el-option label="垂直滚动" value="vertical" />
        </el-select>
      </el-form-item>

      <!-- 水平滚动配置 -->
      <template v-if="localConfig.direction === 'horizontal'">
        <el-form-item label="滚动方向">
          <el-select v-model="localConfig.horizontalDirection">
            <el-option label="向左滚动" value="left" />
            <el-option label="向右滚动" value="right" />
          </el-select>
        </el-form-item>

        <el-form-item label="滚动速度">
          <el-slider 
            v-model="localConfig.speed" 
            :min="10" 
            :max="200" 
            :step="5"
            show-input 
            :format-tooltip="(val: number) => `${val} px/s`"
          />
        </el-form-item>
      </template>

      <!-- 垂直滚动配置 -->
      <template v-if="localConfig.direction === 'vertical'">
        <el-form-item label="行间隔时间">
          <el-slider 
            v-model="localConfig.verticalInterval" 
            :min="1" 
            :max="10" 
            :step="0.5"
            show-input 
            :format-tooltip="(val: number) => `${val} 秒`"
          />
        </el-form-item>

        <el-form-item label="行高倍数（调节行间距）">
          <el-slider 
            v-model="localConfig.lineHeight" 
            :min="1" 
            :max="3" 
            :step="0.1"
            show-input 
          />
        </el-form-item>

        <el-form-item label="每次显示行数">
          <el-slider 
            v-model="localConfig.displayLines" 
            :min="1" 
            :max="5" 
            :step="1"
            show-input 
            :format-tooltip="(val: number) => `${val} 行`"
          />
        </el-form-item>
      </template>

      <el-divider>文本样式</el-divider>
      
      <el-form-item label="使用渐变色">
        <el-switch v-model="localConfig.useGradient" />
      </el-form-item>

      <el-form-item v-if="!localConfig.useGradient" label="文本颜色">
        <el-color-picker v-model="localConfig.color" />
      </el-form-item>

      <template v-if="localConfig.useGradient">
        <el-form-item label="渐变颜色1">
          <el-color-picker v-model="localConfig.gradientColors[0]" />
        </el-form-item>
        <el-form-item label="渐变颜色2">
          <el-color-picker v-model="localConfig.gradientColors[1]" />
        </el-form-item>
      </template>

      <el-form-item label="字体大小">
        <el-slider v-model="localConfig.fontSize" :min="12" :max="72" show-input />
      </el-form-item>

      <el-form-item label="字体">
        <el-select v-model="localConfig.fontFamily">
          <el-option label="Arial" value="Arial" />
          <el-option label="微软雅黑" value="Microsoft YaHei" />
          <el-option label="黑体" value="SimHei" />
          <el-option label="宋体" value="SimSun" />
          <el-option label="Times New Roman" value="Times New Roman" />
          <el-option label="Courier New" value="Courier New" />
          <el-option label="Impact" value="Impact" />
        </el-select>
      </el-form-item>

      <el-form-item label="字重">
        <el-select v-model="localConfig.fontWeight">
          <el-option label="普通" value="normal" />
          <el-option label="粗体" value="bold" />
          <el-option label="细体" value="100" />
          <el-option label="轻体" value="300" />
          <el-option label="中等" value="500" />
          <el-option label="加粗" value="700" />
          <el-option label="特粗" value="900" />
        </el-select>
      </el-form-item>

      <el-form-item label="文本阴影">
        <el-switch v-model="localConfig.textShadow" />
      </el-form-item>

      <template v-if="localConfig.textShadow">
        <el-form-item label="阴影颜色">
          <el-color-picker v-model="shadowColor" />
        </el-form-item>
        <el-form-item label="阴影模糊度">
          <el-slider v-model="localConfig.shadowBlur" :min="0" :max="20" show-input />
        </el-form-item>
      </template>

      <el-divider>容器样式</el-divider>

      <el-form-item label="宽度">
        <el-slider 
          v-model="localConfig.width" 
          :min="100" 
          :max="800" 
          :step="10"
          show-input 
          :format-tooltip="(val: number) => `${val}px`"
        />
      </el-form-item>

      <el-form-item label="高度">
        <el-slider 
          v-model="localConfig.height" 
          :min="30" 
          :max="200" 
          :step="5"
          show-input 
          :format-tooltip="(val: number) => `${val}px`"
        />
      </el-form-item>

      <el-form-item label="背景颜色">
        <el-color-picker v-model="backgroundColor" show-alpha />
      </el-form-item>

      <el-form-item label="圆角">
        <el-slider 
          v-model="localConfig.borderRadius" 
          :min="0" 
          :max="30" 
          show-input 
          :format-tooltip="(val: number) => `${val}px`"
        />
      </el-form-item>

      <el-form-item label="内边距">
        <el-slider 
          v-model="localConfig.padding" 
          :min="0" 
          :max="50" 
          :step="2"
          show-input 
          :format-tooltip="(val: number) => `${val}px`"
        />
      </el-form-item>

      <el-divider>其他设置</el-divider>

      <el-form-item>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span>循环播放</span>
            <el-switch v-model="localConfig.loop" style="margin-left: 10px;" />
          </div>
          <div>
            <span>鼠标悬停暂停</span>
            <el-switch v-model="localConfig.pauseOnHover" style="margin-left: 10px;" />
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import type { MarqueeConfig } from './types';

// Define props with default values
const props = withDefaults(defineProps<{
  config: Partial<MarqueeConfig>;
}>(), {
  config: () => ({
    content: '这是一条滚动公告\n支持多行内容\n可以自定义样式和滚动效果',
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    textShadow: true,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 2,
    useGradient: false,
    gradientColors: ['#ff6b6b', '#4ecdc4'],
    direction: 'horizontal',
    horizontalDirection: 'left',
    speed: 50,
    verticalInterval: 3,
    lineHeight: 1.5,
    displayLines: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 12,
    width: 400,
    height: 60,
    loop: true,
    pauseOnHover: true
  })
});

// Define emit
const emit = defineEmits<{
  (event: 'update:config', config: MarqueeConfig): void;
}>();

// Local config for two-way binding
const localConfig = ref<MarqueeConfig>({
  content: '这是一条滚动公告\n支持多行内容\n可以自定义样式和滚动效果',
  color: '#ffffff',
  fontSize: 24,
  fontWeight: 'normal',
  fontFamily: 'Arial',
  textShadow: true,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 2,
  useGradient: false,
  gradientColors: ['#ff6b6b', '#4ecdc4'],
  direction: 'horizontal',
  horizontalDirection: 'left',
  speed: 50,
  verticalInterval: 3,
  lineHeight: 1.5,
  displayLines: 1,
  backgroundColor: 'rgba(0,0,0,0.3)',
  borderRadius: 8,
  padding: 12,
  width: 400,
  height: 60,
  loop: true,
  pauseOnHover: true
});

// Sync with parent config on mount
onMounted(() => {
  // Merge default config with provided config
  localConfig.value = { ...localConfig.value, ...props.config };
});

// 背景颜色处理（支持透明度）
const backgroundColor = computed({
  get: () => {
    return localConfig.value.backgroundColor;
  },
  set: (value) => {
    localConfig.value.backgroundColor = value;
  }
});

// 阴影颜色处理
const shadowColor = computed({
  get: () => {
    return localConfig.value.shadowColor;
  },
  set: (value) => {
    localConfig.value.shadowColor = value;
  }
});

// 预设样式
const presets = {
  classic: {
    content: '欢迎关注我的直播间 ★ 记得点赞订阅哦 ♥ 感谢大家的支持！',
    direction: 'horizontal' as const,
    horizontalDirection: 'left' as const,
    speed: 80,
    verticalInterval: 3,
    lineHeight: 1.4,
    displayLines: 1,
    fontSize: 24,
    fontFamily: 'Microsoft YaHei',
    fontWeight: 'normal',
    color: '#ffffff',
    useGradient: false,
    textShadow: true,
    shadowColor: 'rgba(0,0,0,0.7)',
    shadowBlur: 3,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 25,
    padding: 12,
    width: 600,
    height: 50,
    loop: true,
    pauseOnHover: true
  },
  modern: {
    content: '🎮 正在直播游戏 | ● LIVE | 欢迎互动聊天！',
    direction: 'horizontal' as const,
    horizontalDirection: 'left' as const,
    speed: 60,
    verticalInterval: 3,
    lineHeight: 1.4,
    displayLines: 1,
    fontSize: 26,
    fontFamily: 'Arial',
    fontWeight: '500',
    useGradient: true,
    gradientColors: ['#667eea', '#764ba2'],
    textShadow: true,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowBlur: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    width: 500,
    height: 60,
    loop: true,
    pauseOnHover: true
  },
  gaming: {
    content: '🎮 正在直播游戏 | ● LIVE | 欢迎互动聊天！',
    direction: 'horizontal' as const,
    horizontalDirection: 'right' as const,
    speed: 100,
    verticalInterval: 3,
    lineHeight: 1.4,
    displayLines: 1,
    fontSize: 32,
    fontFamily: 'Impact',
    fontWeight: 'bold',
    useGradient: true,
    gradientColors: ['#ff6b35', '#f7931e'],
    textShadow: true,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowBlur: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 8,
    padding: 20,
    width: 550,
    height: 70,
    loop: true,
    pauseOnHover: false
  },
  vertical: {
    content: '正在直播中\n🎬 精彩内容不要错过\n 欢迎弹幕互动\n⭐ 点个关注吧',
    direction: 'vertical' as const,
    verticalInterval: 2.5,
    lineHeight: 1.4,
    displayLines: 2,
    fontSize: 22,
    fontFamily: 'Microsoft YaHei',
    fontWeight: 'normal',
    color: '#ffffff',
    useGradient: false,
    textShadow: true,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowBlur: 2,
    backgroundColor: 'rgba(30,30,30,0.85)',
    borderRadius: 10,
    padding: 18,
    width: 280,
    height: 90,
    loop: true,
    pauseOnHover: true
  }
};

// 应用预设
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
.marquee-config {
  padding: 10px;
}
</style>
