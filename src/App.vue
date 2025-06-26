<script setup lang="ts">
// App.vue is the main component that uses the router
</script>

<template>
  <router-view />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden; /* 只隐藏水平滚动条 */
  overflow-y: auto; /* 允许垂直滚动 */
  background-color: #f5f7fa;
}

#app {
  min-height: 100vh;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
