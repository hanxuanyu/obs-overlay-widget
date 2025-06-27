// 图片小组件配置接口
export interface ImageConfig {
  imageUrl: string;
  width: number;
  height: number;
  opacity: number;
  borderRadius: number;
  shadow: boolean;
  shadowColor: string;
  shadowBlur: number;
}

// 图片小组件默认配置
export const defaultConfig: ImageConfig = {
  imageUrl: '',
  width: 200,
  height: 200,
  opacity: 1,
  borderRadius: 0,
  shadow: false,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowBlur: 10
};
