import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import FlashcardModal from "./FlashcardModal";
import { getModuleById, getUserProgress, startUserProgress } from "@/lib/firebase/db-operations";
import { Module } from "@/lib/firebase/types";

interface ModuleContentProps {
  moduleId: number;
  userId: string;
}

export default function ModuleContentMUI({ moduleId, userId }: ModuleContentProps) {
  const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
  const [content, setContent] = useState<Module | null>(null);

  const handleStartModule = () => {
    const currProgress = getUserProgress(userId, moduleId.toString());
    if (!currProgress) {
      startUserProgress(userId, moduleId.toString());
    } else {
      // Module already started; maybe navigate to last viewed step
      // Navigate to page for last viewed step referencing currProgress
    }
  }

  useEffect(() => {
    const fetchContent = async () => {
      const content = await getModuleById(moduleId.toString());
      setContent(content);
    }
    fetchContent();
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

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mb: 8,
        }}
      >
        <Button
          onClick = {() => handleStartModule()}
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
        <Button
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
          View Journal
        </Button>

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
          {content.description}
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

