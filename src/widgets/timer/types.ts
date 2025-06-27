// 计时器模式
export type TimerMode = 'countdown' | 'stopwatch';

// 计时器状态
export type TimerStatus = 'stopped' | 'running' | 'paused' | 'finished';

// 计时器小组件配置接口
export interface TimerConfig {
  mode: TimerMode;
  duration: number; // 倒计时持续时间（秒）
  autoStart: boolean; // 是否自动开始
  showMilliseconds: boolean; // 是否显示毫秒
  format: string; // 时间显示格式
  color: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  useGradient: boolean;
  gradientColors: string[];
  finishedColor: string; // 倒计时结束时的颜色
  playSound: boolean; // 是否播放提示音
  soundVolume: number; // 音量 (0-100)
  warningThreshold: number; // 警告阈值（秒）
  warningColor: string; // 警告颜色
  showProgress: boolean; // 是否显示进度条
  progressColor: string; // 进度条颜色
  progressHeight: number; // 进度条高度
}

// 计时器小组件默认配置
export const defaultConfig: TimerConfig = {
  mode: 'countdown',
  duration: 300, // 5分钟
  autoStart: false,
  showMilliseconds: false,
  format: 'mm:ss',
  color: '#ffffff',
  fontSize: 48,
  fontWeight: 'normal',
  fontFamily: 'Arial',
  textShadow: false,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 4,
  useGradient: false,
  gradientColors: ['#ff0000', '#0000ff'],
  finishedColor: '#ff0000',
  playSound: true,
  soundVolume: 50,
  warningThreshold: 30,
  warningColor: '#ff6b35',
  showProgress: true,
  progressColor: '#3498db',
  progressHeight: 4
};
