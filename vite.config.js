import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			includeAssets: [],
			manifest: {
				name: 'Tasks Countdown Timer',
				short_name: 'Task Timer',
				description: 'Organize your time for more productivity.',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/icono-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/icono-192x192.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
});
