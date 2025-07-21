import Widget from './Widget.vue';
import Config from './Config.vue';
import { defaultConfig } from './types';
import { createWidget } from '../createWidget';

export default createWidget({
  label: '滚动公告',
  value: 'marquee',
  icon: '📢',
  description: '可定制内容、样式和滚动效果的公告滚动条，支持水平和垂直滚动',
  component: Widget,
  configComponent: Config,
  defaultConfig
});
