<template>
  <div class="home-view">
    <div class="container">
      <div class="header">
        <h1>OBS Overlay Widget</h1>
        <p>Create customizable widgets for OBS Studio streaming and recording</p>
      </div>
      
      <div class="cards">
        <div class="card" @click="goToConfig">
          <div class="card-icon">
            <el-icon><Setting /></el-icon>
          </div>
          <div class="card-title">Configure Widgets</div>
          <div class="card-description">
            Design and customize widgets for your OBS streams with an interactive interface
          </div>
        </div>
        
        <div class="card" @click="goToDoc">
          <div class="card-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="card-title">Documentation</div>
          <div class="card-description">
            Learn how to use and integrate OBS Overlay Widgets into your streams
          </div>
        </div>
      </div>
      
      <div class="features">
        <h2>Available Widgets</h2>
        
        <div class="widget-list">
          <div class="widget-item">
            <div class="widget-icon">⏰</div>
            <div class="widget-info">
              <h3>Clock Widget</h3>
              <p>Display current time with customizable format, style, and effects</p>
            </div>
          </div>
          
          <div class="widget-item">
            <div class="widget-icon">📅</div>
            <div class="widget-info">
              <h3>Date Widget</h3>
              <p>Show current date with customizable format, style, and effects</p>
            </div>
          </div>
          
          <div class="widget-item">
            <div class="widget-icon">📝</div>
            <div class="widget-info">
              <h3>Text Widget</h3>
              <p>Display text with customizable styles including gradients, shadows, and fonts</p>
            </div>
          </div>
          
          <div class="widget-item">
            <div class="widget-icon">🖼️</div>
            <div class="widget-info">
              <h3>Image Widget</h3>
              <p>Show images with customizable size, effects, and positioning</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer">
        <p>OBS Overlay Widget &copy; 2025</p>
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
  // This would go to documentation in a real app
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
