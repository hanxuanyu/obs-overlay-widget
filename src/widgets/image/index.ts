import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';
import { createWidget } from '../createWidget';

export default createWidget({
  label: '图片小组件',
  value: 'image',
  icon: '🖼️',
  description: '显示图片，可自定义大小、特效和位置',
  component: Widget,
  configComponent: Config,
  defaultConfig
});
