import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

import {fileURLToPath, URL} from "node:url"; //npm install url @types/node --save


export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    plugins: [react()],
})
