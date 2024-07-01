import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import dotenv from 'dotenv';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  dotenv.config();
  return {
    envPrefix: "REACT_APP_",
    
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
      define: {
        API_URL: JSON.stringify('https://goreadsback.onrender.com/api/'),
        LOGIN_URL: JSON.stringify('https://goreadsback.onrender.com/'),
        //https://goreadsback.onrender.com/
      }
  };
});
