const type = "website";
const url = process.env.HOST_URL;
const title = "Bocchio's WebSite - Sito personale di Tommaso Bocchietti";
const description = "Più di un semplice portfolio: un vero e proprio tour nella mente e negli interessi di Bocchio. Articoli, blog, portali e WebApp che spaziano dalla programmazione alla fisica.";
const mainImage = process.env.VERCEL_BASE_URL + '/';

export default (meta) => {
  return [
    {
      hid: "description",
      name: "description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: (meta && meta.type) || type,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: (meta && url + meta.url) || url,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: (meta && mainImage + meta.title) || mainImage + "/Bocchio's WebSite",
    },
    {
      hid: "twitter:url",
      name: "twitter:url",
      content: (meta && url + meta.url) || url,
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: (meta && meta.title) || title,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: (meta && meta.description) || description,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: (meta && mainImage + meta.title) || mainImage + "/Bocchio's WebSite",
    },
  ];
};