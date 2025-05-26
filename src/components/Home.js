import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Bem-vindo(a)
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Este é o sistema de consulta de dados. Utilize o menu acima para navegar entre as páginas.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/consulta"
          sx={{ mt: 3 }}
        >
          Ir para Consulta
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
