# 户型装修工作室

基于 [wy51ai/floorplan-3d](https://github.com/wy51ai/floorplan-3d) 的 DSH 独立插件，保留上游 MIT 许可。固定上游提交见 UPSTREAM.json。

先安装 [工作室容器与共享运行时](https://github.com/1997liuyh-boop/dsh-studio-library)，再在市场通过本仓库 Git URL 安装并启用本插件。根目录 lib/、static/ 是已构建的安装文件。开发时执行 npm install --include=dev --legacy-peer-deps、npm run build、npm run check，构建无需相邻工作库。


在工作室列表打开“户型装修设计”，使用 [floorplan-3d](https://github.com/wy51ai/floorplan-3d) 原应用进行 2D 家具布置、墙体拆改、尺寸测量、3D 鸟瞰与第一人称漫游，并估算地面材料费用。保留上游 MIT 许可，Three.js 固定为 0.160.0 并打包到本地，运行不依赖 CDN，也无需启动独立服务。

方案自动保存在当前宿主来源的独立 localStorage 键下；桌面和浏览器来源之间不会自动同步。可导出、导入 JSON 备份方案，也可导出 PNG。原应用内置一套示例户型；自定义房间与墙体需要编辑上游 `ROOMS`、`WALLS` 和 `WINS` 数据，不支持上传户型图自动识别。

本目录通过 `build.mjs` 使用同级工作库 SDK 构建，`DSH_STUDIO_LIBRARY` 可指定工作库位置。构建前将 npm 官方 `three@0.160.0` 包解压至 `vendor/package`。在工作库中登记 `studios/floorplan` 后，工作库构建器调用本目录的构建脚本；插件通过正式插件管理器安装到桌面或 Web 配置。

新增嵌入样式由 `src/embed.tw.css` 通过 Tailwind CSS 生成，原应用布局与编辑交互保留。卸载插件不清除方案；清除宿主浏览器数据会清除本地方案，操作前请导出 JSON。
