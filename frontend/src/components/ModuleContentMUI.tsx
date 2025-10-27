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
            color: (t) => t.palette.grey[800],
          }}
        >
          Module {moduleId}
        </Typography>
        <Typography 
          sx={{
            mt: 2,
            color: (t) => t.palette.grey[700],
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
          color: (t) => t.palette.error.main,
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
          color: (t) => t.palette.error.main,
          mb: 1,
        }}
      >
        {content.title}
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-secondary)',
          color: (t) => t.palette.warning.main,
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
            bgcolor: (t) => t.palette.common.black,
            fontFamily: 'var(--font-secondary)',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.25rem',
            '&:hover': {
              bgcolor: (t) => t.palette.common.black,
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
            bgcolor: (t) => t.palette.common.black,
            fontFamily: 'var(--font-secondary)',
            color: 'white',
            fontSize: '1rem',
            '&:hover': {
              bgcolor: (t) => t.palette.common.black,
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
                  border: (t) => `1px solid ${t.palette.grey[300]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: (t) => t.palette.grey[800],
                  minWidth: 32,
                  p: 0,
                  '&:hover': {
                    bgcolor: (t) => t.palette.grey[100],
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
                    bgcolor: (t) => t.palette.grey[200],
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
            color: (t) => t.palette.common.black,
            lineHeight: '1.6',
            ml: '5vw',
          }}
        >
          {content.overview}
        </Typography>
      </Box>
    </Box>
  );
}

