<template>
  <div class="home-view">
    <div class="container">
      <div class="header">
        <h1>OBS 悬浮小组件</h1>
        <p>为 OBS Studio 直播和录制场景创建可定制化小组件</p>
      </div>
      
      <div class="cards">
        <div class="card" @click="goToConfig">
          <div class="card-icon">
            <el-icon><Setting /></el-icon>
          </div>
          <div class="card-title">配置小组件</div>
          <div class="card-description">
            通过交互式界面设计和自定义 OBS 直播小组件
          </div>
        </div>
        
        <div class="card" @click="goToDoc">
          <div class="card-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="card-title">使用文档</div>
          <div class="card-description">
            了解如何使用和集成 OBS 悬浮小组件到您的直播中
          </div>
        </div>
      </div>
      
      <div class="features">
        <h2>可用小组件</h2>
        
        <div class="widget-list">
          <div v-for="widget in widgets" :key="widget.value" class="widget-item">
            <div class="widget-icon">{{ widget.icon }}</div>
            <div class="widget-info">
              <h3>{{ widget.label }}</h3>
              <p>{{ widget.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>OBS 悬浮小组件 &copy; 2025</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Setting, Document } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';

// 导入已注册的小组件信息
import { widgets as registeredWidgets } from '../widgets/registry';

const router = useRouter();

// 定义小组件项的类型
interface WidgetItem {
  value: string;
  label: string;
  icon: string;
  description: string;
}

const widgets = ref<WidgetItem[]>([]);

// 小组件图标映射
const widgetIcons = {
  'clock': '⏰',
  'date': '📅',
  'text': '📝',
  'image': '🖼️',
  // 可以为其他小组件添加图标
};

// 小组件描述映射
const widgetDescriptions = {
  'clock': '显示当前时间，可自定义格式、样式和特效',
  'date': '显示当前日期，可自定义格式、样式和特效',
  'text': '显示文本，支持渐变、阴影、字体等自定义样式',
  'image': '显示图片，可自定义大小、特效和位置',
  // 可以为其他小组件添加描述
};

// 初始化时加载小组件
onMounted(() => {
  widgets.value = registeredWidgets.map((widget: any) => ({
    value: widget.value as string,
    label: widget.label as string,
    icon: widgetIcons[widget.value as keyof typeof widgetIcons] || '🔧', // 默认图标
    description: widgetDescriptions[widget.value as keyof typeof widgetDescriptions] || '自定义小组件'
  }));
});

const goToConfig = () => {
  router.push('/config');
};

const goToDoc = () => {
  // 在实际应用中，这里会跳转到文档页面
  window.open('https://github.com/hanxuanyu/obs-overlay-widget', '_blank');
};
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
  /* 添加溢出滚动，确保内容可以完整显示 */
  overflow-y: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  /* 添加底部间距，确保页脚有足够空间 */
  padding-bottom: 30px;
}

.header {
  text-align: center;
  margin-bottom: 50px;
  padding: 30px 0;
}

.header h1 {
  font-size: 48px;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.header p {
  font-size: 18px;
  color: #666;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
  color: #3498db;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-description {
  color: #666;
  line-height: 1.6;
}

.features {
  margin-bottom: 50px;
}

.features h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  color: #333;
}

.widget-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  /* 确保底部有足够的边距 */
  margin-bottom: 30px;
}

.widget-item {
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  /* 添加过渡效果 */
  transition: transform 0.3s, box-shadow 0.3s;
}

.widget-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.12);
}

.widget-icon {
  font-size: 36px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.widget-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.widget-info p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.footer {
  text-align: center;
  padding: 20px 0;
  color: #666;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .cards {
    flex-direction: column;
    align-items: center;
  }
  
  .widget-list {
    grid-template-columns: 1fr;
  }
}
</style>
