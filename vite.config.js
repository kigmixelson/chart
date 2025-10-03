import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        widget: './widget.html',
        standalone: './standalone.html',
        build: './build.js'
      },
      external: [
        'd3.v7.min.js',
        '/d3.v7.min.js'
      ]
    }
  },
  css: {
    // Ensure CSS files are processed
    modules: false
  }
})
