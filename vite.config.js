import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        widget: './widget.html',
        standalone: './standalone.html',
        build: './build.js'
      }
    }
  },
  css: {
    // Ensure CSS files are processed
    modules: false
  }
})
