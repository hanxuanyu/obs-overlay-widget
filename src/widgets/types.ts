import type { Component } from 'vue';

// 基础小组件配置接口
export interface BaseWidgetConfig {
  [key: string]: any;
}

// 小组件注册信息接口
export interface WidgetRegistration {
  label: string;
  value: string;
  component: Component;
  configComponent: Component;
  getDefaultConfig: () => BaseWidgetConfig;
}

// 小组件模块导出接口
export interface WidgetModule {
  registration: WidgetRegistration;
}
