import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';
import { createWidget } from '../createWidget';

export default createWidget({
  label: '时钟小组件',
  value: 'clock',
  icon: '⏰',
  description: '显示当前时间，可自定义格式、样式和特效',
  component: Widget,
  configComponent: Config,
  defaultConfig
});
