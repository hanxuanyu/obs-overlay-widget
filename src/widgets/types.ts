import type { Component } from 'vue';

// 基础小组件配置接口
export interface BaseWidgetConfig {
  [key: string]: any;
}

// 小组件注册信息接口
export interface WidgetRegistration {
  label: string;
  value: string;
  icon: string;
  description: string;
  component: Component;
  configComponent: Component;
  getDefaultConfig: () => BaseWidgetConfig;
}

// 小组件列表项接口（用于 UI 显示）
export interface WidgetItem {
  value: string;
  label: string;
  icon: string;
  description: string;
}
