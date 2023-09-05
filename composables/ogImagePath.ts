import { Sections } from "~/types"

export function buildOgImagePath(title: string, section: Sections) {
    const url = 'https://bocchio.dev/.netlify/functions/og-image'

    const theme = section === 'portal' ? 'dark' : 'light'

    return url + '?title=' + title + '&theme=' + theme

}