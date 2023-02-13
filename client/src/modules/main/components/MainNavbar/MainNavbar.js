import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import Logo from '@modules/common/components/Logo/Logo';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    sx={{ py: 1 }}
    {...props}
  >
    <Toolbar sx={{ height: 80 }}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Box sx={{ ml: 4 }}>
        <Typography variant='h5' sx={{ fontSize: 20 }}>НП "Ученически олимпиади и състезания"</Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
