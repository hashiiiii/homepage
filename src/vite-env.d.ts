/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_STATIC_DATA?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
