'use client';

<<<<<<< HEAD
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
=======
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NAVBAR COMPONENT
 * 
 * A navigation bar that appears on all pages and provides links to different
 * sections of the application. It highlights the current page for better UX.
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo/Brand */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Parr Center Learning Platform
              </h1>
            </Link>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              href="/modules"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === '/modules'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Modules
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
>>>>>>> acb25e6 (separated modules page into app folder)
}
