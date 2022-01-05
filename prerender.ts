import * as fs from 'fs'
import * as path from 'path'

// @ts-ignore
import manifest from './dist/static/ssr-manifest.json'
// @ts-ignore
import { render } from './dist/server/entry-server.js'

const toAbsolutePath = (p: string) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolutePath('dist/static/index.html'), 'utf-8')
const routesToPrerender = fs
  .readdirSync(toAbsolutePath('src/pages'))
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

;(async () => {
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)
    const html = template
    .replace(`<!--preload-links-->`, preloadLinks)
    .replace(`<!--app-html-->`, appHtml)
    
    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolutePath(filePath), html)
    
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolutePath('dist/static/ssr-manifest.json'))
})()
