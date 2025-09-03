import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   server: {
    host: true, //จำเป็นสำหรับ Docker
    port: 5173, //Port ที่เราจะใช้งาน
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://backend:5000", //ส่ง request ไปยัง backend service
        changeOrigin: true,
        secure: false,
      },
    },
  },
})