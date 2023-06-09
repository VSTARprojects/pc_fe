import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import BiotechIcon from '@mui/icons-material/Biotech';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AuthService from '../services/AuthService';
import { useSelector, useDispatch } from 'react-redux';
import { sign_out } from '../actions';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 
  const settings = ['Profile', 'Logout'];
  var pages = ['Predict', 'Stats']
  const private_pages = ['Upload', 'Samples']

  const isLogged =  useSelector(state => state.isLogged)
  if(!isLogged) {
    pages.push("Login")
    // pages.push("Home")
  } else {
    pages = pages.concat(private_pages)
  }
  const dispath = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavMenuItemClick = (element) => {
    if(element == "Login") {
      navigate("/login", {replace:true})
    } else if(element == "Predict") {
      navigate("/predict", {replace:true})
    } else if(element == "Stats") {
      navigate("/barGraph", {replace:true})
    }else if(element == "Upload") {
      navigate("/upload", {replace:true})
    } else if(element == "Home") {
      navigate("/home", {replace:true})
    } else if(element == "Samples") {
      navigate("/samples", {replace:true})
    }
    handleCloseNavMenu()
  }

  const handleUserMenuItemClick = (element) => {
    if(element == "Logout") {
      AuthService.logout()
      dispath(sign_out())
      navigate("/login")
    } else if(element == "Profile") {
      navigate("/profile")
    }
    handleCloseUserMenu()
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BiotechIcon sx={{ fontSize: '50px', display: { xs: 'max', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >

            <Link to={(isLogged ? ("/samples") : "/home")} style={{textDecoration: "none", color:"white"}}>
               STARS PATHO
            </Link> 

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="white"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={(e)=>handleNavMenuItemClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end'} }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => handleNavMenuItemClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            
          {isLogged &&
            <Box sx={{ flexGrow: 0, justifyContent: 'flex-end' }}>
              <Tooltip title="Open account">
                <IconButton
                  onClick={handleOpenUserMenu} 
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="white"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={(e) => handleUserMenuItemClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
            
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;