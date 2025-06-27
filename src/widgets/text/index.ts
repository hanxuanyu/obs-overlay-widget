import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';
import { createWidget } from '../createWidget';

export default createWidget({
  label: '文本小组件',
  value: 'text',
  icon: '📝',
  description: '显示文本，支持渐变、阴影、字体等自定义样式',
  component: Widget,
  configComponent: Config,
  defaultConfig
});
