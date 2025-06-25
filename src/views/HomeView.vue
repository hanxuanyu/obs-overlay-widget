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
          <div class="widget-item">
            <div class="widget-icon">⏰</div>
            <div class="widget-info">
              <h3>时钟小组件</h3>
              <p>显示当前时间，可自定义格式、样式和特效</p>
            </div>
          </div>
          
          <div class="widget-item">
            <div class="widget-icon">📅</div>
            <div class="widget-info">
              <h3>日期小组件</h3>
              <p>显示当前日期，可自定义格式、样式和特效</p>
            </div>
          </div>
          
          <div class="widget-item">
            <div class="widget-icon">📝</div>
            <div class="widget-info">
              <h3>文本小组件</h3>
              <p>显示文本，支持渐变、阴影、字体等自定义样式</p>
            </div>
          </div>
          
          <div class="widget-item">
            <div class="widget-icon">🖼️</div>
            <div class="widget-info">
              <h3>图片小组件</h3>
              <p>显示图片，可自定义大小、特效和位置</p>
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

const router = useRouter();

const goToConfig = () => {
  router.push('/config');
};

const goToDoc = () => {
  // 在实际应用中，这里会跳转到文档页面
  window.open('https://github.com/yourusername/obs-overlay-widget', '_blank');
};
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 20px;
}

.widget-item {
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
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
