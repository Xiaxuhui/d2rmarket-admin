// vite.config.ts
import { defineApplicationConfig } from "file:///Users/alex/video-management/internal/vite-config/dist/index.mjs";
import { nodePolyfills } from "file:///Users/alex/video-management/node_modules/.pnpm/vite-plugin-node-polyfills@0.19.0_rollup@3.29.4_vite@5.0.10/node_modules/vite-plugin-node-polyfills/dist/index.js";
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
          target: "http://localhost:3000",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), "")
          // only https
          // secure: false
        },
        "/upload": {
          target: "http://localhost:3300/upload",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), "")
        },
        "/api": {
          // 朝宇
          target: "http://192.168.50.193:9290",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), "")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxleC92aWRlby1tYW5hZ2VtZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWxleC92aWRlby1tYW5hZ2VtZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hbGV4L3ZpZGVvLW1hbmFnZW1lbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyB9IGZyb20gJ0B2YmVuL3ZpdGUtY29uZmlnJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUFwcGxpY2F0aW9uQ29uZmlnKHtcbiAgb3ZlcnJpZGVzOiB7XG4gICAgcGx1Z2luczogW25vZGVQb2x5ZmlsbHMoKV0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgICdlY2hhcnRzL2NvcmUnLFxuICAgICAgICAnZWNoYXJ0cy9jaGFydHMnLFxuICAgICAgICAnZWNoYXJ0cy9jb21wb25lbnRzJyxcbiAgICAgICAgJ2VjaGFydHMvcmVuZGVyZXJzJyxcbiAgICAgICAgJ3FyY29kZScsXG4gICAgICAgICdAaWNvbmlmeS9pY29uaWZ5JyxcbiAgICAgICAgJ2FudC1kZXNpZ24tdnVlL2VzL2xvY2FsZS96aF9DTicsXG4gICAgICAgICdhbnQtZGVzaWduLXZ1ZS9lcy9sb2NhbGUvZW5fVVMnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9iYXNpYy1hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgd3M6IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeL2Jhc2ljLWFwaWApLCAnJyksXG4gICAgICAgICAgLy8gb25seSBodHRwc1xuICAgICAgICAgIC8vIHNlY3VyZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgJy91cGxvYWQnOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMzAwL3VwbG9hZCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi91cGxvYWRgKSwgJycpLFxuICAgICAgICB9LFxuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICAvLyBcdTY3MURcdTVCODdcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC41MC4xOTM6OTI5MCcsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHdzOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi9hcGlgKSwgJycpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogWycuL2luZGV4Lmh0bWwnLCAnLi9zcmMve3ZpZXdzLGNvbXBvbmVudHN9LyonXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLCtCQUErQjtBQUM5UyxTQUFTLHFCQUFxQjtBQUU5QixJQUFPLHNCQUFRLHdCQUF3QjtBQUFBLEVBQ3JDLFdBQVc7QUFBQSxJQUNULFNBQVMsQ0FBQyxjQUFjLENBQUM7QUFBQSxJQUN6QixjQUFjO0FBQUEsTUFDWixTQUFTO0FBQUEsUUFDUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsY0FBYztBQUFBLFVBQ1osUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxhQUFhLEdBQUcsRUFBRTtBQUFBO0FBQUE7QUFBQSxRQUcvRDtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsSUFBSTtBQUFBLFVBQ0osU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLElBQUksT0FBTyxVQUFVLEdBQUcsRUFBRTtBQUFBLFFBQzVEO0FBQUEsUUFDQSxRQUFRO0FBQUE7QUFBQSxVQUVOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLElBQUk7QUFBQSxVQUNKLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxHQUFHLEVBQUU7QUFBQSxRQUN6RDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGFBQWEsQ0FBQyxnQkFBZ0IsNEJBQTRCO0FBQUEsTUFDNUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
