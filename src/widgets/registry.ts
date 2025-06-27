// 导入各个小组件模块
import ClockWidget from './clock';
import DateWidget from './date';
import TextWidget from './text';
import ImageWidget from './image';

// 小组件注册表
export const widgets = [
  ClockWidget,
  DateWidget,
  TextWidget,
  ImageWidget,
];

// 获取小组件默认配置
export const getDefaultConfig = (widgetType: string) => {
  for (const widget of widgets) {
    if (widget.value === widgetType) {
      return widget.getDefaultConfig();
    }
  }
  return {};
};
