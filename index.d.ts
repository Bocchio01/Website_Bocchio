declare module 'nuxt/schema' {
    interface AppConfigInput {
        title?: string,
        theme?: {
            dark?: boolean,
            color?: string,
            font?: number
        },
    }
}

// It is always important to ensure you import/export something when augmenting a type
export { }
