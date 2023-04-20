import type {
  ParsedContent,
  MarkdownParsedContent,
} from '@nuxt/content/dist/runtime/types'
export type Sections = 'articles' | 'portals' | 'mix'

export interface Article extends MarkdownParsedContent {
  title: string
  description: string
  paragraph: string[] | string
  img: { src: string; alt: string }
  tag: string[]
  portalurl?: string
  alt: string
  createdAt: string
  updatedAt: string
  published?: boolean
}

export type ArticlePreview = Omit<Article, 'body'>

export interface PrevNext {
  title?: string
  _path?: string
}

export interface Navigation {
  url: string
  link: string
}
