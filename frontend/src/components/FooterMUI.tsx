import Image from 'next/image';
import { Box, Typography } from '@mui/material';

export default function FooterMUI() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#4B9CD3',
        color: 'white',
        py: 4,
        px: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: '1280px',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            display: { xs: 'block', md: 'grid' },
            gridTemplateColumns: { md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          
          {/* Left Column - Branding */}
          <Box
            sx={{
              gridColumn: { md: '1' },
            }}
          >
            <Box
              sx={{
                pl: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Image src="/philosophy_logo_white.png" alt="UNC Philosophy Logo" width={150} height={200} />
            </Box>
          </Box>

          {/* Middle Column - Contact Information */}
          <Box
            sx={{
              gridColumn: { md: '2' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
                fontSize: '0.875rem',
              }}
            >
              <Box>Philosophy Department • UNC Chapel Hill</Box>
              <Box>Caldwell Hall • CB# 3125 240 East Cameron Ave.</Box>
              <Box>Chapel Hill, NC 27599-3125</Box>
              <Box>phone: (919) 962-7291</Box>
              <Box>fax: (919) 843-3929</Box>
              <Box>email: philosophy@unc.edu</Box>
            </Box>
          </Box>

          {/* Right Column - Quick Links */}
          <Box
            sx={{
              gridColumn: { md: '3' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Quick Links
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.25,
                  fontSize: '0.875rem',
                }}
              >
                <Box>XXXXXXXXXXXXXXXXXXX</Box>
                <Box>XXXXXXXX</Box>
                <Box>XXXXXXXXXXXXXXXXXX</Box>
                <Box>XXXXXX</Box>
                <Box>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</Box>
              </Box>
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

