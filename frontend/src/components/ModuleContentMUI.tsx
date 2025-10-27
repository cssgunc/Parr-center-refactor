import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ModuleContentProps {
  moduleId: number;
  content?: { title: string; subtitle?: string; overview: string; };
}

export default function ModuleContentMUI({ moduleId, content }: ModuleContentProps) {
  const theme = useTheme();

  if (!content) {
    return (
      <Box>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 'bold',
            color: '#1f2937',
          }}
        >
          Module {moduleId}
        </Typography>
        <Typography 
          sx={{
            mt: 2,
            color: '#374151',
            fontFamily: 'var(--font-secondary)',
          }}
        >
          No content available for this module yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: '8vw',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontFamily: 'var(--font-primary)',
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#B14C59',
          mb: 0.5,
        }}
      >
        Welcome to Module {moduleId}
      </Typography>
      
      <Typography
        variant="h3"
        component="h2"
        sx={{
          fontFamily: 'var(--font-secondary)',
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#B14C59',
          mb: 1,
        }}
      >
        {content.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-secondary)',
          color: '#BE897E',
          fontSize: '1.25rem',
          mb: 1,
        }}
      >
        {content.subtitle}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 8,
        }}
      >
        <Button
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: 4,
            bgcolor: '#13294B',
            fontFamily: 'var(--font-secondary)',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.25rem',
            '&:hover': {
              bgcolor: '#1a3457',
            },
          }}
        >
          Start Module
        </Button>
        <Button
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: 4,
            bgcolor: '#13294B',
            fontFamily: 'var(--font-secondary)',
            color: 'white',
            fontSize: '1rem',
            '&:hover': {
              bgcolor: '#1a3457',
            },
          }}
        >
          View Journal
        </Button>
      </Box>

      <Box
        sx={{
          mb: 8,
          fontFamily: 'var(--font-secondary)',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
          }}
        >
          Current Progress
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1,
            ml: '10vw',
          }}
        >
          {[1, 2, 3, 4].map((step) => (
            <Box key={step} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  minWidth: 32,
                  p: 0,
                  '&:hover': {
                    bgcolor: '#f3f4f6',
                  },
                }}
              >
                {step}
              </Button>
              {step < 4 && (
                <Box
                  sx={{
                    width: 64,
                    height: 1,
                    bgcolor: '#e5e7eb',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          fontFamily: 'var(--font-secondary)',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            mb: 1,
          }}
        >
          Module Overview
        </Typography>
        <Typography
          sx={{
            color: 'black',
            lineHeight: 'relaxed',
            ml: '5vw',
          }}
        >
          {content.overview}
        </Typography>
      </Box>
    </Box>
  );
}

