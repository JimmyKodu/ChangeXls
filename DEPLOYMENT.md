# 部署指南 / Deployment Guide

## GitHub Pages 部署 / GitHub Pages Deployment

### 步骤 / Steps:

1. **进入仓库设置 / Go to repository settings**
   - 在GitHub仓库页面，点击 "Settings"
   - Navigate to your repository on GitHub and click "Settings"

2. **配置 Pages / Configure Pages**
   - 在左侧菜单找到 "Pages" 
   - In the left sidebar, find and click "Pages"
   
3. **选择分支 / Select branch**
   - Source: 选择主分支 (main 或 master)
   - Select your main branch (main or master)
   - Folder: 选择 / (root)
   - 点击 "Save"

4. **等待部署 / Wait for deployment**
   - GitHub 会自动部署您的网站
   - GitHub will automatically deploy your site
   - 几分钟后，您会看到网站URL
   - After a few minutes, you'll see your site URL

5. **访问应用 / Access the application**
   - URL 格式: `https://yourusername.github.io/ChangeXls/`
   - Your site will be available at: `https://yourusername.github.io/ChangeXls/`

## 其他托管选项 / Other Hosting Options

### Netlify

1. 将仓库连接到 Netlify / Connect your repository to Netlify
2. 选择构建设置 / Select build settings:
   - Build command: (留空 / leave empty)
   - Publish directory: `/` (root)
3. 部署 / Deploy

### Vercel

1. 导入GitHub仓库 / Import your GitHub repository
2. 配置项目 / Configure project:
   - Framework Preset: Other
   - Root Directory: `./`
3. 部署 / Deploy

## 本地测试 / Local Testing

您也可以在本地运行和测试：
You can also run and test locally:

```bash
# 方法 1: 使用 Python 的简单HTTP服务器 / Using Python's simple HTTP server
python3 -m http.server 8000

# 方法 2: 使用 Node.js 的 http-server / Using Node.js http-server
npx http-server -p 8000

# 然后访问 / Then visit: http://localhost:8000
```

## 注意事项 / Important Notes

- ✅ 应用是纯静态的，不需要后端服务器
- ✅ The application is purely static, no backend server needed
- ✅ 所有处理都在浏览器中完成
- ✅ All processing happens in the browser
- ✅ 文件不会上传到任何服务器
- ✅ Files are not uploaded to any server
- ⚠️ 需要互联网连接以加载 SheetJS 库
- ⚠️ Internet connection required to load SheetJS library
