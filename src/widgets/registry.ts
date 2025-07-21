// 导入各个小组件模块
import ClockWidget from './clock';
import DateWidget from './date';
import TextWidget from './text';
import ImageWidget from './image';
import TimerWidget from './timer';
import MarqueeWidget from './marquee';


// 导入类型定义
import type { WidgetRegistration, WidgetItem } from './types';

// 小组件注册表
export const widgets: WidgetRegistration[] = [
  ClockWidget,
  DateWidget,
  TextWidget,
  ImageWidget,
  TimerWidget,
  MarqueeWidget,
];

// 获取小组件显示信息列表（用于 UI 展示）
export const getWidgetItems = (): WidgetItem[] => {
  return widgets.map(widget => ({
    value: widget.value,
    label: widget.label,
    icon: widget.icon,
    description: widget.description
  }));
};

// 获取小组件默认配置
export const getDefaultConfig = (widgetType: string) => {
  for (const widget of widgets) {
    if (widget.value === widgetType) {
      return widget.getDefaultConfig();
    }
  }
  return {};
};

// 根据类型获取小组件注册信息
export const getWidget = (widgetType: string): WidgetRegistration | undefined => {
  return widgets.find(widget => widget.value === widgetType);
};
