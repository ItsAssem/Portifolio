/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string
    readonly [key: string]: any
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
