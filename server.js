const { createServer } = require('http')
const { parse } = require('url')
const fs = require('fs')
const path = require('path')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const logFile = path.join(__dirname, 'app.error.log')

function logError(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`
  fs.appendFileSync(logFile, line)
  console.error(line)
}

process.on('uncaughtException', (err) => {
  logError('Uncaught exception: ' + err.stack)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  logError('Unhandled rejection: ' + reason)
  process.exit(1)
})

logError('Starting server...')

const app = next({ dev, dir: __dirname, webpack: true })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  logError('Next.js ready, starting HTTP server...')
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      logError('Error handling ' + req.url + ': ' + err.stack)
      res.statusCode = 500
      res.end('Internal server error')
    }
  }).listen(port, (err) => {
    if (err) {
      logError('Listen error: ' + err)
      throw err
    }
    logError('Ready on port ' + port)
  })
}).catch((err) => {
  logError('app.prepare() failed: ' + err.stack)
  process.exit(1)
})
