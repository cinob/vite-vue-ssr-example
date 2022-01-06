import * as fs from 'fs'
import * as path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import c2k from 'koa-connect'
import { createServer as _createServer, ViteDevServer } from 'vite'
// @ts-ignore
// import { render } from './dist/server/entry-server.js'

async function createServer (
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''
  const manifest = isProd
    ? fs.readFileSync(resolve('dist/client/ssr-manifest.json'))
    : {}

  const app = new Koa()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite: ViteDevServer
  if (!isProd) {
    vite = await _createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    })
    app.use(c2k(vite.middlewares))
  } else {
    app.use(serve('dist/client', {
      // 防止 / 被解析为静态文件
      index: false
    }))
  }

  app.use(async (ctx, next) => {
    const url = ctx.request.url
    if (url.startsWith('/api')) {
      ctx.body = [{
        name: 'wahaha',
        age: 16
      }, {
        name: 'wahaha',
        age: 16
      }, {
        name: 'wahaha',
        age: 16
      }]
    } else {
      await next()
    }
  })

  app.use(async (ctx) => {
    try {
      const url = ctx.request.url

      let template, render
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }
      const [appHtml, preloadLinks] = await render(url, manifest)
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      ctx.set('Content-Type', 'text/html')
      ctx.body = html
    } catch (e: any) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      ctx.status = 500
      ctx.body = e.stack
    }
  })
  return { app }
}

createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  )
