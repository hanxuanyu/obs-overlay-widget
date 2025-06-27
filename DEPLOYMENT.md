# 部署说明

本项目支持多种部署方式，每种方式都有对应的构建命令。

## 🚀 部署方式

### 1. GitHub Pages（自动部署）

**特点**：推送代码到 `main` 或 `master` 分支后自动部署
**URL格式**：`https://username.github.io/obs-overlay-widget/`

**设置步骤**：
1. 推送代码到GitHub仓库
2. 在仓库设置中启用GitHub Pages
   - 进入 Settings → Pages
   - Source 选择 "GitHub Actions"
3. GitHub Actions会自动构建和部署

### 2. 手动部署（任意服务器）

**特点**：适用于任何Web服务器，包括Apache、Nginx、静态托管服务等
**构建命令**：
```bash
npm run build
```

**部署步骤**：
1. 运行构建命令
2. 将 `dist` 文件夹中的所有文件上传到服务器
3. 可以部署到根目录或任何子目录

### 3. GitHub Pages（手动构建）

**特点**：如果你需要手动为GitHub Pages构建
**构建命令**：
```bash
npm run build:github
```

## 📝 构建命令说明

| 命令 | 用途 | base路径 | 适用场景 |
|------|------|----------|----------|
| `npm run dev` | 开发服务器 | `/` | 本地开发 |
| `npm run build` | 生产构建 | `./` | 手动部署到任意服务器 |
| `npm run build:github` | GitHub Pages构建 | `/obs-overlay-widget/` | 手动GitHub Pages部署 |
| `npm run preview` | 预览构建结果 | - | 本地测试构建结果 |

## 🛠️ 技术说明

### Base路径配置

项目使用智能的base路径配置：

- **开发模式**：使用 `/` 作为base路径
- **生产模式**：
  - 默认使用 `./`（相对路径），适用于任何部署位置
  - 如果设置了 `VITE_BASE_PATH` 环境变量，则使用指定路径

### 自动化部署

GitHub Actions工作流（`.github/workflows/deploy.yml`）会：
1. 检测代码变更
2. 安装依赖
3. 使用 `npm run build:github` 构建项目
4. 自动部署到GitHub Pages

## 🔧 自定义部署

如果你的仓库名不是 `obs-overlay-widget`，需要修改：

1. **vite.config.ts** 中的仓库名
2. **package.json** 中 `build:github` 脚本的路径

例如，如果仓库名是 `my-widget`：
```json
"build:github": "vue-tsc -b && cross-env VITE_BASE_PATH=/my-widget/ vite build"
```
