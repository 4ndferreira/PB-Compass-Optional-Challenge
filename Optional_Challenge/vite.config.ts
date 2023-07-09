import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      // Uses 'development' if the NODE_ENV environment variable is not defined.
      NODE_ENV: 'development',
      // Have in mind that variables coming from process.env are always strings.
      DEBUG: 'false',
      // Required: will fail if the API_KEY environment variable is not provided.
      API_KEY: undefined, 
      // Optional: will not fail if the APP_VERSION environment variable is missing.
      APP_VERSION: null,
    }),
  ],
  
})
