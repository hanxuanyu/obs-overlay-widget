// 时钟小组件配置接口
export interface ClockConfig {
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
  showSeconds: boolean;
  showDate: boolean;
  dateFormat: string;
}

// 时钟小组件默认配置
export const defaultConfig: ClockConfig = {
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
