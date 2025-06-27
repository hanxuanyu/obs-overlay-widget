// 日期小组件配置接口
export interface DateConfig {
  format: string;
  color: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  useGradient: boolean;
  gradientColors: string[];
  showWeekday: boolean;
}

// 日期小组件默认配置
export const defaultConfig: DateConfig = {
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
