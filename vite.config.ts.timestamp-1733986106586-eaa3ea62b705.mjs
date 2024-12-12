// vite.config.ts
import { defineApplicationConfig } from "file:///Users/xiaxuhui/project/d2rmarket-admin/internal/vite-config/dist/index.mjs";
import { nodePolyfills } from "file:///Users/xiaxuhui/project/d2rmarket-admin/node_modules/.pnpm/vite-plugin-node-polyfills@0.19.0_rollup@3.29.4_vite@5.0.10/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineApplicationConfig({
  overrides: {
    plugins: [nodePolyfills()],
    optimizeDeps: {
      include: [
        "echarts/core",
        "echarts/charts",
        "echarts/components",
        "echarts/renderers",
        "qrcode",
        "@iconify/iconify",
        "ant-design-vue/es/locale/zh_CN",
        "ant-design-vue/es/locale/en_US"
      ]
    },
    server: {
      proxy: {
        "/basic-api": {
          target: "https://d2test.dyna1.asia/api/",
          // target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), "")
          // only https
          // secure: false
        },
        "/gm/upload": {
          target: "https://d2test.dyna1.asia/api/",
          changeOrigin: true,
          ws: true
          // rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        }
      },
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/*"]
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveGlheHVodWkvcHJvamVjdC9kMnJtYXJrZXQtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy94aWF4dWh1aS9wcm9qZWN0L2Qycm1hcmtldC1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMveGlheHVodWkvcHJvamVjdC9kMnJtYXJrZXQtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyB9IGZyb20gJ0B2YmVuL3ZpdGUtY29uZmlnJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUFwcGxpY2F0aW9uQ29uZmlnKHtcbiAgb3ZlcnJpZGVzOiB7XG4gICAgcGx1Z2luczogW25vZGVQb2x5ZmlsbHMoKV0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgICdlY2hhcnRzL2NvcmUnLFxuICAgICAgICAnZWNoYXJ0cy9jaGFydHMnLFxuICAgICAgICAnZWNoYXJ0cy9jb21wb25lbnRzJyxcbiAgICAgICAgJ2VjaGFydHMvcmVuZGVyZXJzJyxcbiAgICAgICAgJ3FyY29kZScsXG4gICAgICAgICdAaWNvbmlmeS9pY29uaWZ5JyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS96aF9DTicsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvZW5fVVMnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9iYXNpYy1hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9kMnRlc3QuZHluYTEuYXNpYS9hcGkvJyxcbiAgICAgICAgICAvLyB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYmFzaWMtYXBpYCksICcnKSxcbiAgICAgICAgICAvLyBvbmx5IGh0dHBzXG4gICAgICAgICAgLy8gc2VjdXJlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAnL2dtL3VwbG9hZCc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwczovL2QydGVzdC5keW5hMS5hc2lhL2FwaS8nLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICB3czogdHJ1ZSxcbiAgICAgICAgICAvLyByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vdXBsb2FkYCksICcnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB3YXJtdXA6IHtcbiAgICAgICAgY2xpZW50RmlsZXM6IFsnLi9pbmRleC5odG1sJywgJy4vc3JjL3t2aWV3cyxjb21wb25lbnRzfS8qJ10sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUywrQkFBK0I7QUFDL1UsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTyxzQkFBUSx3QkFBd0I7QUFBQSxFQUNyQyxXQUFXO0FBQUEsSUFDVCxTQUFTLENBQUMsY0FBYyxDQUFDO0FBQUEsSUFDekIsY0FBYztBQUFBLE1BQ1osU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLGNBQWM7QUFBQSxVQUNaLFFBQVE7QUFBQTtBQUFBLFVBRVIsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxhQUFhLEdBQUcsRUFBRTtBQUFBO0FBQUE7QUFBQSxRQUcvRDtBQUFBLFFBQ0EsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBO0FBQUEsUUFFTjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGFBQWEsQ0FBQyxnQkFBZ0IsNEJBQTRCO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
