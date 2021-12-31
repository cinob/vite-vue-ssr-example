const fs = require('fs')
const path = require('path')
const _ = require('koa-route')
const express = require('express')

async function createServer (
  root = process.cwd()
) {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  const manifest = fs.readFileSync(resolve('dist/client/ssr-manifest.json'))

  const app = new express()

  let vite
  app.use(require('compression')())
  app.use(
    require('serve-static')(resolve('dist/client'), {
      index: false
    })
  )

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    let template, render
    template = indexProd
        render = require('./dist/server/entry-server.js').render
  })
  return { app }
}

createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  )
