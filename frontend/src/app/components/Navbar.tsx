'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: 'secondary.main',
				boxShadow: 'none',
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					<Box
						component={Link}
						href="/"
						sx={{
							display: 'flex',
							alignItems: 'center',
							textDecoration: 'none',
							py: 2,
						}}
					>
						<Image
							src="/image.png"
							alt="UNC Parr Center for Ethics"
							width={400}
							height={60}
							priority
							style={{ height: 'auto', maxHeight: '60px' }}
						/>
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Button
							component={Link}
							href="/modules"
							variant="contained"
							sx={{
								backgroundColor: 'primary.main',
								color: 'white',
								textTransform: 'none',
								fontSize: '16px',
                borderRadius: '16px',
								px: 3,
								py: 1,
							}}
						>
							Modules
						</Button>

						<IconButton
							component={Link}
							href="/profile"
							sx={{
								color: 'primary.main',
							}}
						>
							<AccountCircle sx={{ fontSize: 40 }} />
						</IconButton>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
