'use client';

import { getModuleById, getUserModules } from '@/lib/firebase/db-operations';
import { Module } from '@/lib/firebase/types';
import { Container, Typography, Box, Input } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ModulesPage() {
	const [id, setId] = useState<string>('DY0C6mviJBcQDoFfbMPx');
	const [module, setModule] = useState<Module | null>(null);

	useEffect(() => {
		if (id.length == 'DY0C6mviJBcQDoFfbMPx'.length) {
			getModuleById(id)
				.then((module) => {
					console.log('Module fetched by ID:', module);
					setModule(module);
				})
				.catch((error) => {
					console.error('Error fetching module by ID:', error);
				});
		}
	}, [id]);

	return (
		<Container maxWidth="lg">
			<Box sx={{ my: 4 }}>
				<Typography variant="h3" component="h1" gutterBottom>
					Modules
				</Typography>
				<Input value={id} onChange={(e) => setId(e.target.value)} />
        {module && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Module Details:</Typography>
            <Typography>ID: {module.id}</Typography>
            <Typography>Title: {module.title}</Typography>
            <Typography>Description: {module.description}</Typography>
          </Box>
        )}
			</Box>
		</Container>
	);
}
