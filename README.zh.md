# dsh-studio-floorplan

[English](README.md)

## 仓库信息

- 仓库名称：`dsh-studio-floorplan`
- 仓库描述：户型装修工作室，支持 2D 户型编辑、家具布置、墙体修改、3D 漫游、尺寸测量和材料估价。
- 仓库地址：`https://github.com/1997liuyh-boop/dsh-studio-floorplan`
- 上游项目：`https://github.com/wy51ai/floorplan-3d`，固定版本记录在 `UPSTREAM.json`。

## 功能与特性

- 在 2D 户型中编辑房间、墙体、门窗和家具。
- 测量空间、估算地面材料费用，并使用 3D 鸟瞰或第一人称视角查看结果。
- 使用隔离的本地存储保存方案，支持 JSON 备份导入导出和 PNG 导出。
- 本地打包 Three.js，发布页面不依赖 CDN 或独立服务。
- 使用共享工作室卡片和项目容器，不修改宿主应用。

## 安装

请先安装控制组合包，再完整退出 Desktop，通过官方插件管理器安装本工作室精确 tag：

```powershell
& "<Desktop安装目录>\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add "github:1997liuyh-boop/dsh-studio-library#v0.1.3"
& "<Desktop安装目录>\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop add "github:1997liuyh-boop/dsh-studio-floorplan#v0.1.2"
& "<Desktop安装目录>\resources\runtime\cli\bin\dsh.cmd" plugin --profile desktop list
```

验证安装包包含 `main: lib/index.js`、`exports./client: lib/client.js`、`dsh.bundle.patch: ./cordis.patch.yml`、`static/index.html` 和 `studio.json`。重新启动 Desktop 后打开“户型装修工作室”。

## 要求与限制

发布包使用 `UPSTREAM.json` 记录的本地 Three.js 固定副本。不上传方案，也不支持自动识别上传的户型图。清理浏览器或 DSH 数据前请导出 JSON；自定义房间数据需要修改源码后重新构建。

## 许可与来源

本工作室使用 MIT 许可，并保留上游 MIT 声明。版本和适配说明见 `UPSTREAM.json`。
