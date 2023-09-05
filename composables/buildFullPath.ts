export function buildFullPath() {

    const { path } = useRoute()
    const { locale } = useI18n()

    const contentPath = (locale.value === 'en' ? '/en' : '') + path.replace(/\/$/, '')

    return contentPath
}