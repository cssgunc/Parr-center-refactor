'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#003366', // UNC Blue
		},
		secondary: {
			main: '#B3D4E5',
		},
		background: {
			default: '#ffffff',
		},
		info: {
			main: '#4B9CD3', // carolina-blue
			light: '#DBEBF6', // light-carolina-blue
		},
		error: {
			main: '#B14C59', // secondary-maroon
		},
		warning: {
			main: '#BE897E', // secondary-light-maroon
		},
		common: {
			black: '#13294B', // primary-athletics-navy
			white: '#ffffff',
		},
		// Grey scale and divider for consistent UI colors
		grey: {
			50: '#f9fafb',
			100: '#f3f4f6',
			200: '#e5e7eb',
			300: '#d1d5db',
			400: '#9ca3af',
			700: '#374151',
			800: '#1f2937',
		},
		divider: '#e5e7eb',
	},
	typography: {
		// Use Work Sans as the overall body/default font (secondary),
		// while headings use Inter (primary) via explicit overrides.
		fontFamily: ['var(--font-secondary)', 'system-ui', 'Arial', 'sans-serif'].join(',') ,
		h1: { fontFamily: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'].join(',') },
		h2: { fontFamily: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'].join(',') },
		h3: { fontFamily: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'].join(',') },
		h4: { fontFamily: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'].join(',') },
		h5: { fontFamily: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'].join(',') },
		h6: { fontFamily: ['var(--font-primary)', 'Inter', 'system-ui', 'sans-serif'].join(',') },
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 'bold',
				},
			},
		},
	},
	shape: {
		borderRadius: 12,
	},
});

export default theme;
