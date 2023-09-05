// import { serverQueryContent } from '#content/server'
// import { SitemapStream, streamToPromise } from 'sitemap'

// export default defineEventHandler('sitemap', async (event) => {
//   // Fetch all documents
//   const docs = await serverQueryContent(event).find()
//   const sitemap = new SitemapStream({
//     hostname: 'https://bocchio.dev'
//   })

//   for (const doc of docs) {
//     sitemap.write({
//       url: doc._path,
//       changefreq: 'monthly'
//     })
//   }
//   sitemap.end()

//   return streamToPromise(sitemap)
// })