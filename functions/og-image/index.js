const chromium = require('chrome-aws-lambda')
const fs = require('fs')

const exePath =
  process.platform === 'win32'
    ? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const isDev = !!process.env.IS_DEV

exports.handler = async function (event) {
  if (!!process.env.IS_DEV) {
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

  let html = fs.readFileSync(require.resolve('./assets/template.html')).toString()
  let logo = fs.readFileSync(require.resolve('./assets/Lampadina_ingranaggi.svg'), { encoding: 'base64' })
  let font = fs.readFileSync(require.resolve('./assets/BungeeShade-Regular.woff2'), { encoding: 'base64' })

  html = html.replace('/*Inject_title*/', event.queryStringParameters.title || "Bocchio's WebSite")
  html = html.replace('/*Inject_theme*/', event.queryStringParameters.theme || 'light')
  html = html.replace('/*Inject_image_src*/', `data:image/svg+xml;base64,${logo}`)
  html = html.replace('/*Inject_font*/', `data:font/woff2;charset=utf-8;base64,${font}`)

  // Recommend 1200×628
  await page.setViewport({ width: 1200, height: 685 })
  await page.setContent(html)

  const file = await page.screenshot('webp')

  await browser.close()

  return {
    statusCode: 200,
    headers: {
      'Content-Type': isDev ? 'text/html' : 'image/webp',
    },
    body: isDev ? html : file.toString('base64'),
    isBase64Encoded: !isDev,
  }
}
