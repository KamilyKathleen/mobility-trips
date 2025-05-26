import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
      <Toolbar>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Consulta
        </Typography>

        {/* Ícones para telas pequenas */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
              Início
            </MenuItem>
            <MenuItem component={Link} to="/consulta" onClick={handleMenuClose}>
              Consulta
            </MenuItem>
            <MenuItem component={Link} to="/inclusao" onClick={handleMenuClose}>
              Inclusão
            </MenuItem>
          </Menu>
        </Box>

        {/* Botões para telas grandes */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">
            Início
          </Button>
          <Button color="inherit" component={Link} to="/consulta">
            Consulta
          </Button>
          <Button color="inherit" component={Link} to="/inclusao">
            Inclusão
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
