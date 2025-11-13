import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlashcardModal from "./FlashcardModal";
import moduleVideos, { ModuleVideo } from "@/data/moduleVideos";
import Link from 'next/link';
import { Video } from "./Video";

interface ModuleContentProps {
  moduleId: number;
  content?: { title: string; subtitle?: string; overview: string; };
}

export default function ModuleContentMUI({ moduleId, content }: ModuleContentProps) {
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [showVideoView, setShowVideoView] = useState(false);
  
  // Reset video view when module changes
  useEffect(() => {
    setShowVideoView(false);
  }, [moduleId]);

  if (!content) {
    return (
      <Box>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{
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
          }}
        >
          No content available for this module yet.
        </Typography>
      </Box>
    );
  }

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds?: number): string => {
    if (!seconds) return "";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Video View
  if (showVideoView) {
    return (
      <Video moduleId={moduleId} />
    );
  }

  // Overview View
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
          fontSize: '3rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-secondary)',
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
          fontSize: '3rem',
          fontWeight: 'bold',
          fontFamily: 'var(--font-secondary)',
          color: (t) => t.palette.error.main,
          mb: 1,
        }}
      >
        {content.title}
      </Typography>

      <Typography
        sx={{
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
          onClick={() => setShowVideoView(true)}
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: '16px',
            bgcolor: (t) => t.palette.common.black,
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
        <Link href={`/modules/${moduleId}/journal`} passHref>
          <Button
            variant="contained"
            component="a"
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: '16px',
              bgcolor: (t) => t.palette.common.black,
              color: 'white',
              fontSize: '1.25rem',
              '&:hover': {
                bgcolor: (t) => t.palette.common.black,
              },
            }}
          >
            View Journal
          </Button>
        </Link>

        <Button
          onClick={() => setFlashcardModalOpen(true)}
          variant="contained"
          sx={{
            py: 1.5,
            px: 2,
            borderRadius: '16px',
            bgcolor: (t) => t.palette.common.black,
            color: 'white',
            fontSize: '1.25rem',
            '&:hover': {
              bgcolor: (t) => t.palette.common.black,
            },
          }}
        >
          View Flashcards
        </Button>
      </Box>

      <Box
        sx={{
          mb: 8,
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

      <FlashcardModal
        open={flashcardModalOpen}
        onClose={() => setFlashcardModalOpen(false)}
        moduleId={moduleId}
      />
    </Box>
  );
}
