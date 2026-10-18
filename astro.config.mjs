import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://arkiveglobal.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
