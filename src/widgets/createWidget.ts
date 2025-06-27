import type { Component } from 'vue';
import type { WidgetRegistration, BaseWidgetConfig } from './types';

/**
 * 创建小组件注册信息的辅助函数
 * 
 * @param options 小组件配置选项
 * @returns 小组件注册信息
 */
export function createWidget(options: {
  /** 小组件显示名称 */
  label: string;
  /** 小组件唯一标识符 */
  value: string;
  /** 小组件图标（emoji 或图标字符） */
  icon: string;
  /** 小组件描述 */
  description: string;
  /** 小组件组件 */
  component: Component;
  /** 小组件配置组件 */
  configComponent: Component;
  /** 默认配置 */
  defaultConfig: BaseWidgetConfig;
}): WidgetRegistration {
  return {
    label: options.label,
    value: options.value,
    icon: options.icon,
    description: options.description,
    component: options.component,
    configComponent: options.configComponent,
    getDefaultConfig: () => options.defaultConfig
  };
}

/**
 * 创建小组件类型定义的辅助函数
 * 
 * @param defaultConfig 默认配置对象
 * @returns 包含默认配置的对象
 */
export function createWidgetConfig<T extends BaseWidgetConfig>(defaultConfig: T) {
  return {
    defaultConfig
  };
}
