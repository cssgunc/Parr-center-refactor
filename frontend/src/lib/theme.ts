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
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					backgroundColor: '#e5e7eb',
					borderRadius: 6,
					'& .MuiLinearProgress-bar': {
						transition: 'width 0.45s ease',
						'@media (prefers-reduced-motion: reduce)': {
							transition: 'none',
						},
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					fontWeight: 500,
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: 'white',
					color: '#374151',
					border: '1px solid #e5e7eb',
					boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					fontSize: '0.875rem',
				},
				arrow: {
					color: 'white',
					'&::before': {
						border: '1px solid #e5e7eb',
					},
				},
			},
		},
	},
	shape: {
		borderRadius: 12,
	},
});

export default theme;
