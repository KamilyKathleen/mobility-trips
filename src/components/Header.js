import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Consulta
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/">
            Início
          </Button>
          <Button color="inherit" component={Link} to="/consulta">
            Consulta
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
