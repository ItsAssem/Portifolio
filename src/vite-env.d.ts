/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string
    readonly VITE_APP_TITLE: string;
    // Add more environment variables as needed
    readonly [key: string]: string | number | boolean
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
