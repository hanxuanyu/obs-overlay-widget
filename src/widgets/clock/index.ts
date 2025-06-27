import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';

export default {
  label: '时钟小组件',
  value: 'clock',
  component: Widget,
  configComponent: Config,
  getDefaultConfig: () => defaultConfig
};
