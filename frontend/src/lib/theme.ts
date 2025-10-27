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
		fontFamily: ['var(--font-primary)', 'Georgia', 'serif'].join(','),
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
