const host_url = process.env.HOST_URL
const vercel_url = 'https://bocchio-og-image.vercel.app/'

export default (args) => {
  const title = (args && args.title) || "Bocchio's WebSite - Sito personale di Tommaso Bocchietti"
  const description =
    (args && args.description) ||
    "Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione all'ingegneria."
  const type = (args && args.type) || 'website'
  const url = (args && host_url + args.url) || host_url + '/'
  const theme = '?theme=' + (url.indexOf(host_url + '/portale/') == 0 ? 'dark' : 'light')

  return {
    title: title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: vercel_url + title + theme,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: vercel_url + title + theme,
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: title,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: title,
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: vercel_url + title + theme,
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: url,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: url,
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: type,
      },
    ],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: url,
      },
    ],
  }
}
