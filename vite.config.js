import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: {},
  },
  define: {
    "process.env": import.meta.env,
    __BUILD_TIME__: JSON.stringify(new Date().getTime()),
  },
  build: {
    // 빌드 시 청크와 에셋에 해시 추가
    rollupOptions: {
      output: {
        // 메인 진입점 파일
        entryFileNames: "assets/[name].[hash].js",
        // 청크 파일
        chunkFileNames: "assets/[name].[hash].js",
        // 이미지, CSS 등 기타 에셋
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    // 소스맵 생성
    sourcemap: true,
    // 매니페스트 파일 생성
    manifest: true,
  },
});
