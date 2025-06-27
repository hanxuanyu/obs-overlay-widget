import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';
import { createWidget } from '../createWidget';

export default createWidget({
  label: '计时器小组件',
  value: 'timer',
  icon: '⏱️',
  description: '支持倒计时和正计时功能，可自定义样式、进度条和提示音',
  component: Widget,
  configComponent: Config,
  defaultConfig
});
