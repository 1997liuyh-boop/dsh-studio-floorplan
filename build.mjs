import { createRequire } from 'node:module'
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { existsSync } from 'node:fs'

const root = fileURLToPath(new URL('.', import.meta.url))
const library = root
const require = createRequire(join(root, 'package.json'))
const { build } = require('esbuild')
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const studio = JSON.parse(await readFile(join(root, 'studio.json'), 'utf8'))
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
const css = async path => (await postcss([tailwind()]).process(await readFile(path, 'utf8'), { from: path })).css
await mkdir(join(root, 'static'), { recursive: true })
await mkdir(join(root, 'lib'), { recursive: true })

// 保留上游源码，发布页面使用同版本的本地 3D 依赖。
let html = await readFile(join(root, 'app/index.html'), 'utf8')
const scene = html.match(/<script type="module">([\s\S]*?)<\/script>/)
if (!scene) throw new Error('上游 3D 入口缺失，请检查版本适配')
await build({
  stdin: { contents: scene[1], resolveDir: root, sourcefile: 'scene.js' },
  outfile: join(root, 'static/scene.js'), bundle: true, format: 'esm', platform: 'browser', minify: true,
  alias: { three: join(root, 'vendor/package'), 'three/addons': join(root, 'vendor/package/examples/jsm') },
})
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/, '')
  .replace(scene[0], '<script type="module" src="/studio-projects/floorplan/scene.js"></script>')
  .replace('</head>', '<link rel="stylesheet" href="/studio-projects/floorplan/embed.css"></head>')
  .replaceAll("'huxing-", "'dsh.studio.floorplan.huxing-")
await writeFile(join(root, 'static/index.html'), html)
await writeFile(join(root, 'static/embed.css'), await css(join(root, 'src/embed.tw.css')))
await copyFile(join(root, 'vendor/package/LICENSE'), join(root, 'static/THREE-LICENSE.txt'))
await copyFile(join(root, 'app/LICENSE'), join(root, 'LICENSE'))

// 页面及入口使用工作库 SDK，工作室的安装和卸载不修改宿主。
await build({ entryPoints: [join(library, 'packages/sdk/entry.ts')], outfile: join(root, 'lib/index.js'),
  bundle: true, platform: 'node', format: 'esm', target: 'node22',
  define: { STUDIO_PROJECT_ID: JSON.stringify(studio.id), STUDIO_PROJECT: JSON.stringify(studio) } })
await build({ entryPoints: [join(library, 'packages/sdk/client.tsx')], outfile: join(root, 'lib/client.js'),
  bundle: true, platform: 'browser', format: 'cjs', jsx: 'automatic', external: ['react', 'react/jsx-runtime'],
  define: { STUDIO_PROJECT: JSON.stringify(studio), STUDIO_PROJECT_ORDER: String(studio.order),
    STUDIO_CARD_CSS: JSON.stringify(await css(join(library, 'packages/sdk/card.css'))) },
  banner: { js: `window.__ModuleLoader__.load({id:${JSON.stringify(pkg.name)},factory:(require)=>{var module={exports:{}};var exports=module.exports;` },
  footer: { js: 'return module.exports;}});' } })
await writeFile(join(root, 'dsh.plugin.json'), JSON.stringify({ name: pkg.name, version: pkg.version,
  description: studio.description, entry: { name: pkg.name, inject: ['studioProjects'] }, client: { platform: 'web' } }, null, 2) + '\n')
console.log('已构建：' + studio.name)
