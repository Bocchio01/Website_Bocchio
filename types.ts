import type { ParsedContent, MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';

export type Sections = 'index' | 'mix' | 'article' | 'portal';
export type Providers = 'cloudinary' | 'localSvg' | null;
export type AttachmentProviders = 'dropbox' | 'mega';
// export enum NavigationTypes {
//     prev = &#8617,
//     portal = &#8605,
//     next = &#8618,
// }

export interface Image {
    src: string,
    alt: string,
    provider: Providers,
}

export interface BaseCard {
    title: string,
    description?: string,
    paragraph: string[],
    img: Image,
    _path: string,
    tag?: string[],
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
    attachments?: AttachmentItem[],
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

// Attachments

export interface AttachmentItem {
    name: AttachmentProviders,
    url: string,
}