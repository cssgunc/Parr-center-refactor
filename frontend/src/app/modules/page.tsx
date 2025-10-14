import { Container, Typography, Box } from '@mui/material';

export default function ModulesPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Modules
        </Typography>
        <Typography variant="body1">
          This is the modules page. Add your modules content here.
        </Typography>
      </Box>
    </Container>
  );
}
