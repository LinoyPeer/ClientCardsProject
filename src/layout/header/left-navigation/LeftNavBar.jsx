import React, { useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ROUTES from "../../../routes/routesModel";
import LogoIcon from "../logo/LogoIcon";
import Logo from "../logo/Logo";
import NavBarItem from "../../../routes/components/NavBarItem";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import useSearch from "../../../hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../right-navigation/SearchBar";

export default function LeftNavBar() {
  const { user } = useCurrentUser();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [openMenu, setOpenMenu] = useState(false);
  const { isSearchOpen, handleSearchClick, handleSearch, showSearchOn } = useSearch();

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleNavItemClick = () => {
    setOpenMenu(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        maxWidth: isDesktop ? '100%' : '375px',
        margin: isDesktop ? '0' : '0 auto',
        padding: '0 1rem',
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LogoIcon />
          <Logo />
        </Box>
        {!isDesktop && showSearchOn.some(route => location.pathname.includes(route)) && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '3em' }}>
            {isSearchOpen ? (
              <SearchBar sx={{ borderRadius: '10px' }} onSearch={handleSearch} />
            ) : (
              <IconButton title="Search" onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            )}
          </Box>
        )}
        {!isDesktop && (
          <IconButton
            onClick={toggleMenu}
            sx={{
              backgroundColor: '#E1DCD9',
              position: 'relative',
              right: '16rem',
            }}
          >
            <MenuIcon
              sx={{
                color: 'black',
              }}
            />
          </IconButton>
        )}
      </Box>

      <Box
        sx={{
          maxHeight: !isDesktop && openMenu ? "200px" : "0",
          overflow: "hidden",
          transition: !isDesktop ? "max-height 0.3s ease-in-out" : "none",
          position: isDesktop ? "static" : "absolute",
          top: !isDesktop ? "60px" : "0",
          left: "25px",
          width: isDesktop ? "1300px" : "150px",
          marginLeft: isDesktop ? '-30rem' : '0',
          backgroundColor: isDesktop ? "transparent" : "white",
          boxShadow: !isDesktop ? "0px 4px 8px rgba(0, 0, 0, 0.1)" : "none",
          borderRadius: !isDesktop ? "8px" : "0",
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          gap: isDesktop ? '1.3rem' : '0',
        }}
      >
        {user && <NavBarItem to={ROUTES.CARDS} label={"Cards"} onClick={handleNavItemClick} />}
        <NavBarItem to={ROUTES.ABOUT} label={"About"} onClick={handleNavItemClick} />
        {user && <NavBarItem to={ROUTES.FAV_CARDS} label={"Favorites"} onClick={handleNavItemClick} />}
        {user && user.isBusiness && (
          <NavBarItem to={ROUTES.MY_CARDS} label={"My Cards"} onClick={handleNavItemClick} />
        )}
        {user && user.isAdmin && (
          <NavBarItem to={ROUTES.CRM_ADMIN} label={"CRM"} onClick={handleNavItemClick} />
        )}
      </Box>
    </Box>
  );
}
