import * as fs from 'fs'
import * as path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
// @ts-ignore
import { render } from './dist/server/entry-server.js'

async function createServer () {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  const manifest = fs.readFileSync(resolve('dist/client/ssr-manifest.json'))

  const app = new Koa()

  app.use(serve('dist/client', {
    // 防止 / 被解析为静态文件
    index: false
  }))

  app.use(async (ctx) => {
    const url = ctx.request.url

    const [appHtml, preloadLinks] = await render(url, manifest)
    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    ctx.set('Content-Type', 'text/html')
    ctx.body = html
  })
  return { app }
}

createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  )
