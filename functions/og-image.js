// generate-og-images/index.js
const chromium = require('chrome-aws-lambda')
const fs = require('fs')
const path = require('path')

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const isDebug = 0
const isDebug2 = 0

exports.handler = async function (event, context) {
  if (isDebug2) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  } else {
    options = {
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    }
  }

  const browser = await chromium.puppeteer.launch(options)
  const page = await browser.newPage()

  let html = fs.readFileSync(path.resolve(__dirname, './template.html')).toString()
  let logo = fs.readFileSync(path.resolve(__dirname, './Lampadina_ingranaggi.svg'), { encoding: 'base64' })
  let font = fs.readFileSync(path.resolve(__dirname, './BungeeShade-Regular.woff2'), { encoding: 'base64' })

  html = html.replace('/*Inject_title*/', event.queryStringParameters.title)
  html = html.replace('/*Inject_image_src*/', `data:image/svg+xml;base64,${logo}`)
  html = html.replace('/*Inject_font*/', `data:font/woff2;charset=utf-8;base64,${font}`)

  if (event.queryStringParameters.theme == 'dark') {
    bgcolor = 'black'
    fgcolor = 'white'
  } else {
    bgcolor = 'white'
    fgcolor = 'black'
  }
  for (let index = 0; index < 2; index++) html = html.replace('--background', bgcolor)
  for (let index = 0; index < 4; index++) html = html.replace('--foreground', fgcolor)

  await page.setViewport({ width: 2048, height: 1170 })
  await page.setContent(html)

  const file = await page.screenshot('png')

  await browser.close()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': isDebug ? 'text/html' : 'image/png',
    },
    body: isDebug ? html : file.toString('base64'),
    isBase64Encoded: isDebug ? false : true,
  }
}
