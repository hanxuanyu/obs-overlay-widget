import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';

export default {
  label: '图片小组件',
  value: 'image',
  component: Widget,
  configComponent: Config,
  getDefaultConfig: () => defaultConfig
};
