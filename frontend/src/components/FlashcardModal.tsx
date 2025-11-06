'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { flashcardsByModule } from '@/data/mockFlashcards';
import modulesContent from '@/data/modulesContent';

interface FlashcardModalProps {
  open: boolean;
  onClose: () => void;
  moduleId: number;
}

export default function FlashcardModal({ open, onClose, moduleId }: FlashcardModalProps) {
  const theme = useTheme();
  
  // Get flashcards for the current module
  const moduleFlashcards = flashcardsByModule[moduleId] || {};
  
  // Convert the object structure to an array for easier rendering
  const flashcardsArray = Object.entries(moduleFlashcards).map(([cardKey, cardData]) => ({
    id: cardKey,
    term: cardData[0],
    definition: cardData[1],
  }));

  // Get module title for the header
  const moduleTitle = modulesContent[moduleId]?.title || `Module ${moduleId}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxWidth: '1200px',
          maxHeight: '90vh',
          m: 2,
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header with back arrow and title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              mr: 2,
              color: theme.palette.common.black,
              '&:hover': {
                bgcolor: theme.palette.grey[100],
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              flex: 1,
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-primary)',
              color: theme.palette.common.black,
            }}
          >
            Flashcard Deck: Key Ethical Concepts
          </Typography>
        </Box>

        {/* Flashcards and Test buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 3,
            pt: 2,
            pb: 1,
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: '16px',
              bgcolor: theme.palette.common.black,
              color: 'white',
              px: 3,
              py: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: theme.palette.common.black,
              },
            }}
          >
            Flashcards
          </Button>
          <Button
            variant="outlined"
            disabled
            sx={{
              borderRadius: '16px',
              borderColor: theme.palette.grey[300],
              color: theme.palette.grey[400],
              px: 3,
              py: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&.Mui-disabled': {
                borderColor: theme.palette.grey[300],
                color: theme.palette.grey[400],
              },
            }}
          >
            Test
          </Button>
        </Box>

        {/* Flashcards section heading */}
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: theme.palette.common.black,
            }}
          >
            Flashcards
          </Typography>
        </Box>

        {/* Flashcards list */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            px: 3,
            pb: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {flashcardsArray.length === 0 ? (
            <Typography
              sx={{
                color: theme.palette.grey[600],
                textAlign: 'center',
                py: 4,
              }}
            >
              No flashcards available for this module.
            </Typography>
          ) : (
            flashcardsArray.map((flashcard, index) => (
              <Paper
                key={flashcard.id}
                elevation={0}
                sx={{
                  borderRadius: '16px',
                  bgcolor: theme.palette.info.light,
                  border: `1px solid ${theme.palette.info.main}`,
                  p: 2.5,
                  display: 'flex',
                  gap: 3,
                  '&:hover': {
                    borderColor: theme.palette.info.main,
                    boxShadow: `0 2px 8px rgba(0, 0, 0, 0.1)`,
                  },
                }}
              >
                {/* Term/Question column */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.common.black,
                      lineHeight: 1.6,
                    }}
                  >
                    {flashcard.term}
                  </Typography>
                </Box>

                {/* Definition/Answer column */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: theme.palette.common.black,
                      lineHeight: 1.6,
                    }}
                  >
                    {flashcard.definition}
                  </Typography>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

