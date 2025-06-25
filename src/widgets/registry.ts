// 小组件组件及其配置
import ClockWidget from './ClockWidget.vue';
import DateWidget from './DateWidget.vue';
import TextWidget from './TextWidget.vue';
import ImageWidget from './ImageWidget.vue';

// 配置组件
import ClockConfig from '../components/config/ClockConfig.vue';
import DateConfig from '../components/config/DateConfig.vue';
import TextConfig from '../components/config/TextConfig.vue';
import ImageConfig from '../components/config/ImageConfig.vue';

// 小组件注册表
export const widgets = [
  { label: '时钟小组件', value: 'clock', component: ClockWidget, configComponent: ClockConfig },
  { label: '日期小组件', value: 'date', component: DateWidget, configComponent: DateConfig },
  { label: '文本小组件', value: 'text', component: TextWidget, configComponent: TextConfig },
  { label: '图片小组件', value: 'image', component: ImageWidget, configComponent: ImageConfig },
];

// 获取小组件默认配置
export const getDefaultConfig = (widgetType: string) => {
  switch (widgetType) {
    case 'clock':
      return {
        format: 'HH:mm:ss',
        color: '#ffffff',
        fontSize: 48,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        textShadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        useGradient: false,
        gradientColors: ['#ff0000', '#0000ff'],
        showSeconds: true,
        showDate: false,
        dateFormat: 'YYYY-MM-DD'
      };
    case 'date':
      return {
        format: 'YYYY-MM-DD',
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        textShadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        useGradient: false,
        gradientColors: ['#ff0000', '#0000ff'],
        showWeekday: true
      };
    case 'text':
      return {
        text: 'Sample Text',
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'normal',
        fontFamily: 'Arial',
        textShadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 4,
        useGradient: false,
        gradientColors: ['#ff0000', '#0000ff'],
      };
    case 'image':
      return {
        imageUrl: '',
        width: 200,
        height: 200,
        opacity: 1,
        borderRadius: 0,
        shadow: false,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 10
      };
    default:
      return {};
  }
};
