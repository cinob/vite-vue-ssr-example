const fs = require('fs')
const path = require('path')

const manifest = require('./dist/static/ssr-manifest.json')
const { render } = require('./dist/server/entry-server.js')

const toAbsolutePath = (p: string) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolutePath('dist/static/index.html'), 'utf-8')
;(async () => {
  const [appHtml, preloadLinks] = await render(manifest)
  const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)
  
  const filePath = 'dist/static/index.html'
  fs.writeFileSync(toAbsolutePath(filePath), html)

  console.log('pre-rendered:', filePath)

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolutePath('dist/static/ssr-manifest.json'))
})()
