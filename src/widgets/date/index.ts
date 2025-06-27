import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';

export default {
  label: '日期小组件',
  value: 'date',
  component: Widget,
  configComponent: Config,
  getDefaultConfig: () => defaultConfig
};
