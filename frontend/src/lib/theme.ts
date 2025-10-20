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
	},
	typography: {
		fontFamily: ['Futura', 'Arial', 'sans-serif'].join(','),
	},
	shape: {
		borderRadius: 12,
	},
});

export default theme;
