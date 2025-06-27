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

// 导入小组件显示信息
import { getWidgetItems } from '../widgets/registry';

const router = useRouter();

// 获取所有可用的小组件列表
const widgets = getWidgetItems();

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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  /* 确保内容可以完整显示和滚动 */
  overflow-y: visible;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  /* 增加底部间距，确保页脚和最后的内容有足够空间 */
  padding-bottom: 50px;
  position: relative;
  z-index: 1;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0;
  animation: fadeInUp 0.8s ease-out;
}

.header h1 {
  font-size: 48px;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #3498db, #9b59b6, #e74c3c);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  animation: gradientShift 3s ease infinite;
  font-weight: bold;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header p {
  font-size: 20px;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.cards {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 70px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 35px;
  width: 320px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.card:hover::before {
  left: 100%;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 52px;
  margin-bottom: 25px;
  color: #3498db;
  transition: transform 0.3s ease;
}

.card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 18px;
  color: #2c3e50;
}

.card-description {
  color: #666;
  line-height: 1.7;
  font-size: 16px;
}

.features {
  margin-bottom: 70px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.features h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  color: #2c3e50;
  position: relative;
  display: inline-block;
  width: 100%;
}

.features h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(45deg, #3498db, #9b59b6);
  border-radius: 2px;
}

.widget-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 25px;
  /* 确保底部有足够的边距 */
  margin-bottom: 40px;
}

.widget-item {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* 添加过渡效果 */
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.widget-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.widget-item:hover::before {
  transform: scaleX(1);
}

.widget-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.widget-icon {
  font-size: 40px;
  margin-right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  transition: transform 0.3s ease;
}

.widget-item:hover .widget-icon {
  transform: scale(1.2);
}

.widget-info h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
}

.widget-info p {
  color: #666;
  margin: 0;
  line-height: 1.6;
  font-size: 15px;
}

.footer {
  text-align: center;
  padding: 30px 0;
  color: #777;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

/* 动画定义 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-view {
    padding: 15px;
  }
  
  .header h1 {
    font-size: 36px;
  }
  
  .header p {
    font-size: 18px;
    padding: 0 20px;
  }
  
  .cards {
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }
  
  .card {
    width: 100%;
    max-width: 350px;
  }
  
  .widget-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .widget-item {
    padding: 20px;
  }
  
  .features h2 {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 28px;
  }
  
  .header p {
    font-size: 16px;
  }
  
  .card {
    padding: 25px 20px;
  }
  
  .card-title {
    font-size: 22px;
  }
  
  .widget-icon {
    font-size: 32px;
    margin-right: 15px;
    min-width: 45px;
  }
}

/* 确保在所有设备上都能正常滚动 */
@media (max-height: 600px) {
  .home-view {
    min-height: auto;
    padding-bottom: 30px;
  }
  
  .container {
    padding-bottom: 30px;
  }
}
</style>
