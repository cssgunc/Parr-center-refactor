import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FlashcardModal from "./FlashcardModal";
import moduleVideos, { ModuleVideo } from "@/data/moduleVideos";
import Link from 'next/link';

interface ModuleContentProps {
  moduleId: number;
  content?: { title: string; subtitle?: string; overview: string; };
}

export default function ModuleContentMUI({ moduleId, content }: ModuleContentProps) {
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [showVideoView, setShowVideoView] = useState(false);
  
  const videoData: ModuleVideo | undefined = moduleVideos[moduleId];

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
  if (showVideoView && videoData) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          m: '10',
        }}
      >
        {/* Back Button */}
        <Box sx={{ mb: 3 }}>
          <IconButton
            onClick={() => setShowVideoView(false)}
            sx={{
              color: (t) => t.palette.common.black,
              '&:hover': {
                bgcolor: (t) => t.palette.grey[100],
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3,
          }}
        >
          {videoData.title}
        </Typography>

        {/* Progress Indicator */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          {[1, 2, 3, 4].map((step) => (
            <Box key={step} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: (t) => `2px solid ${t.palette.grey[300]}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  bgcolor: step === 1 ? (t) => t.palette.grey[800] : 'transparent',
                  color: step === 1 ? 'white' : (t) => t.palette.grey[800],
                }}
              >
                {step}
              </Box>
              {step < 4 && (
                <Box
                  sx={{
                    width: 80,
                    height: 2,
                    bgcolor: (t) => t.palette.grey[200],
                    mx: 1,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>

        {/* Watch the Video Heading */}
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Watch the Video
        </Typography>

        {/* YouTube Video Embed */}
        <Box
          sx={{
            position: 'relative',
            width: '85%',
            maxWidth: '1200px',
            mx: 'auto',
            mb: 4,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: (t) => `0 4px 6px ${t.palette.grey[300]}`,
            '&::before': {
              content: '""',
              display: 'block',
              paddingTop: '56.25%', // 16:9 aspect ratio
            },
          }}
        >
          <Box
            component="iframe"
            src={videoData.youtubeUrl}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>

        {/* Action Buttons - Bottom Right */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 2,
            mt: 'auto',
          }}
        >
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: '16px',
              bgcolor: (t) => t.palette.common.black,
              fontWeight: 'bold',
              color: 'white',
              fontSize: '1.25rem',
              minWidth: '150px',
              '&:hover': {
                bgcolor: (t) => t.palette.common.black,
              },
            }}
          >
            Continue
          </Button>
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: '16px',
              bgcolor: (t) => t.palette.common.black,
              color: 'white',
              fontSize: '1.25rem',
              minWidth: '150px',
              '&:hover': {
                bgcolor: (t) => t.palette.common.black,
              },
            }}
          >
            View Journal
          </Button>
        </Box>

        <FlashcardModal
          open={flashcardModalOpen}
          onClose={() => setFlashcardModalOpen(false)}
          moduleId={moduleId}
        />
      </Box>
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
