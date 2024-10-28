import { defineApplicationConfig } from '@vben/vite-config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineApplicationConfig({
  overrides: {
    plugins: [nodePolyfills()],
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      proxy: {
        '/basic-api': {
          target: 'https://d2.dyna1.asia',
          // target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          // secure: false
        },
        '/gm/upload': {
          target: 'https://d2.dyna1.asia',
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
        '/api': {
          target: 'http://192.168.50.104:9290',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
        },
        '/getUPloadID': {
          target: 'https://api.weixin.qq.com/wxa/sec/vod/applyupload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/getUPloadID`), ''),
        },
        '/splitUpload': {
          target: 'https://api.weixin.qq.com/wxa/sec/vod/uploadpart',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/splitUpload`), ''),
        },
        '/getToken': {
          target: 'https://grpc.okyaya.com/bgapi/manage/getAccessToken',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/getToken`), ''),
        },
        '/getMediaList': {
          target: 'https://api.weixin.qq.com/wxa/sec/vod/getmedia',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/getMediaList`), ''),
        },
        '/sureUpload': {
          target: 'https://api.weixin.qq.com/wxa/sec/vod/commitupload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/sureUpload`), ''),
        },
      },
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
  },
});
