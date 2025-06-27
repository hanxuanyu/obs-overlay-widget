/**
 * URL工具函数
 */

/**
 * 获取应用的基础URL路径
 * 用于生成正确的预览链接，支持不同的部署环境
 */
export function getAppBaseUrl(): string {
  const origin = window.location.origin;
  
  // 获取Vite配置的base路径
  let basePath = import.meta.env.BASE_URL;
  
  // 如果base路径是相对路径（如'./'），需要根据当前页面路径来确定完整路径
  if (basePath.startsWith('./')) {
    // 从当前路径中提取base路径
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // 如果当前路径包含index.html，移除它
    if (pathSegments[pathSegments.length - 1] === 'index.html') {
      pathSegments.pop();
    }
    
    // 重建base路径
    basePath = pathSegments.length > 0 ? `/${pathSegments.join('/')}/` : '/';
  }
  
  // 清理base路径，确保格式正确
  const cleanBasePath = basePath === '/' ? '' : basePath.replace(/\/$/, '');
  
  return `${origin}${cleanBasePath}`;
}

/**
 * 生成预览URL
 * @param configData 配置数据字符串
 */
export function generatePreviewUrl(configData: string): string {
  const baseUrl = getAppBaseUrl();
  return `${baseUrl}/#/preview?data=${configData}`;
}
