import { Container, Typography, Box } from '@mui/material';

export default function ProfilePage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1">
          This is the profile page. Add your profile content here.
        </Typography>
      </Box>
    </Container>
  );
}
