import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moduleVideos, { ModuleVideo } from "@/data/moduleVideos";

export function Video({ moduleId }: { moduleId: number }) {
    const [showVideoView, setShowVideoView] = useState(false);
    const videoData: ModuleVideo | undefined = moduleVideos[moduleId];

    if (videoData) {
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
          </Box>
        );
      }
}

    