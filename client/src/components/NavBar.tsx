import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FactoryIcon from "@mui/icons-material/Factory";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RootState, store } from "../redux/Store";
import { setLogoutAction } from "../redux/UserReducer";
import { useSelector } from "react-redux";
import { Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import useDataFetching from "../hooks/useDataFetching";

const pages = ["Departments", "Employees", "Shifts"];
const settings = ["Logout"];

function ResponsiveAppBar() {
  const user = useSelector((state: RootState) => state.users.user);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    store.dispatch(setLogoutAction());
    handleCloseUserMenu();
    navigate("/");
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  //if redux states are empty get all from database and save in redux
  useDataFetching();

  const location = useLocation();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FactoryIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Moroz-Factory
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <NavLink
                    key={page}
                    to={`/${page.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        color={
                          location.pathname === `/${page.toLowerCase()}`
                            ? "primary"
                            : "white"
                        }
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box>
            <FactoryIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Moroz Factory
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <NavLink
                  key={page}
                  to={`/${page.toLowerCase()}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color:
                        location.pathname === `/${page.toLowerCase()}`
                          ? "primary"
                          : "white",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                </NavLink>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Chip
                  icon={<PersonIcon />}
                  label={`${user?.fullName} `}
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenUserMenu}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    marginLeft: "20px",
                  }}
                />
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={logOut}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
