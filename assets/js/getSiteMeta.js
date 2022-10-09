const host_url = process.env.HOST_URL

export default (args) => {
  const title = (args && args.title) || 'Home'
  const description =
    (args && args.description) ||
    "Tommaso Bocchietti. Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione all'ingegneria."
  const type = (args && args.type) || 'website'
  const tmpUrl = (args && host_url + args.url) || host_url + '/'
  const url = tmpUrl.substring(tmpUrl.length - 1) == '/' ? tmpUrl : tmpUrl + '/'
  const theme = '&theme=' + (url.indexOf(host_url + '/portal/') == 0 ? 'dark' : 'light')

  const og_image_url = host_url + '/.netlify/functions/og-image?title=' + (title == 'Home' ? "Bocchio's WebSite" : title) + theme

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
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
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
        content: og_image_url,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: og_image_url,
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
        content: og_image_url,
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
