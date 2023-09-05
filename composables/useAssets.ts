export function useAsset(path: string) {
    const assets = import.meta.glob('~/assets/**/*', {
        eager: true,
        import: 'default',
    })
    return assets['/assets' + path]
}