import type { ParsedContent, MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';
export type Sections = 'mix' | 'article' | 'portal';

export interface Image {
  src: string,
  alt: string
}

export interface BaseCard extends ParsedContent {
  title: string,
  description: string,
  paragraph: string[],
  img: Image,
  _path: string,
}

export interface Mix extends MarkdownParsedContent {
  title: string,
  description: string,
  paragraph: string[],
  img: Image,

  createdAt?: string,
  updatedAt?: string,
  portalurl?: string,
}

export interface Article extends Mix {
  tag: string[],
}


export interface Portal extends ParsedContent {
  title: string,
  description: string,
  paragraph: string[],
  img: Image,

  createdAt?: string,
  updatedAt?: string,
}

export type MixPreview = Omit<Mix, 'body'>;
export type ArticlePreview = Omit<Article, 'body'>;
export type PortalPreview = Omit<Portal, 'body'>;


// Navigation

export interface PrevNextItem {
  title: string,
  img: Image,
  _path: string,
}

export interface Navigation {
  prev: PrevNextItem | null,
  next: PrevNextItem | null,
  portal: PrevNextItem | null,
}