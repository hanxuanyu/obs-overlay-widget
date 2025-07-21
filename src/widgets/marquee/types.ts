// 滚动公告小组件配置接口
export interface MarqueeConfig {
  // 公告内容
  content: string;
  // 文本样式
  color: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textShadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  useGradient: boolean;
  gradientColors: string[];
  
  // 滚动配置
  direction: 'horizontal' | 'vertical';
  horizontalDirection: 'left' | 'right';
  speed: number; // 水平滚动速度 (px/s)
  
  // 垂直滚动特有配置
  verticalInterval: number; // 垂直滚动时行间隔时间 (秒)
  lineHeight: number; // 行高倍数
  displayLines: number; // 每次显示的行数
  
  // 容器样式
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  width: number;
  height: number;
  
  // 其他配置
  loop: boolean; // 是否循环播放
  pauseOnHover: boolean; // 鼠标悬停时是否暂停
}

// 滚动公告小组件默认配置
export const defaultConfig: MarqueeConfig = {
  content: '欢迎关注我的直播间 ★ 记得点赞订阅哦 ♥ 感谢大家的支持！',
  color: '#ffffff',
  fontSize: 24,
  fontWeight: 'normal',
  fontFamily: 'Microsoft YaHei',
  textShadow: true,
  shadowColor: 'rgba(0,0,0,0.7)',
  shadowBlur: 3,
  useGradient: false,
  gradientColors: ['#ff6b6b', '#4ecdc4'],
  
  direction: 'horizontal',
  horizontalDirection: 'left',
  speed: 80,
  
  verticalInterval: 3,
  lineHeight: 1.4,
  displayLines: 1,
  
  backgroundColor: 'rgba(0,0,0,0.6)',
  borderRadius: 25,
  padding: 12,
  width: 600,
  height: 50,
  
  loop: true,
  pauseOnHover: true
};
