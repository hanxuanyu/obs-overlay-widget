# 🚀 快速部署指南

## 准备工作

1. **Fork或下载此项目**
2. **更新GitHub用户名**：

### 在Windows上：
```cmd
setup-readme.bat YOUR_GITHUB_USERNAME
```

### 在Linux/Mac上：
```bash
chmod +x setup-readme.sh
./setup-readme.sh YOUR_GITHUB_USERNAME
```

### 手动更新：
如果脚本无法运行，请手动替换README.md中所有的`USERNAME`为你的GitHub用户名。

## 部署到GitHub Pages

1. **提交更改**：
   ```bash
   git add .
   git commit -m "Setup project for deployment"
   git push origin main
   ```

2. **启用GitHub Pages**：
   - 访问你的GitHub仓库
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"

3. **等待部署完成**：
   - 查看Actions页面的构建状态
   - 几分钟后访问：`https://YOUR_GITHUB_USERNAME.github.io/obs-overlay-widget/`

## 验证部署

✅ 构建状态正常  
✅ 网站可以访问  
✅ 小组件配置正常工作  
✅ 预览链接生成正确  

恭喜！你的OBS小组件工具已经成功部署！🎉
