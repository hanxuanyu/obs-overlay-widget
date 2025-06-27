import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';

export default {
  label: '文本小组件',
  value: 'text',
  component: Widget,
  configComponent: Config,
  getDefaultConfig: () => defaultConfig
};
