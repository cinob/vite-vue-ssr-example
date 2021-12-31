const fs = require('fs')
const path = require('path')
const express = require('express')

async function createServer () {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  const manifest = fs.readFileSync(resolve('dist/client/ssr-manifest.json'))

  const app = new express()

  app.use(require('compression')())
  app.use(
    require('serve-static')(resolve('dist/client'), {
      index: false
    })
  )

  app.use('*', async (req: any, res: any) => {
    // const url = req.originalUrl
    let template, render
    template = indexProd
    render = require('./dist/server/entry-server.js').render

    const [appHtml, preloadLinks] = await render( manifest)
    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })
  return { app }
}

createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  )
