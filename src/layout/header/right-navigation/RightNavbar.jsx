import React, { useState } from "react";
import { useTheme } from "../../../providers/CustomThemeProvider";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import Logged from "./Logged";
import NotLogged from "./NotLogged";
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "./SearchBar";
import { ManageAccounts } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import useSearch from "../../../hooks/useSearch";
import { useTheme as muiUseTheme } from "@mui/material/styles";


export default function RightNavbar({ mobileSize, isIconDispaly }) {
  const { user } = useCurrentUser();
  const { isDark, toggleDarkMode } = useTheme();
  const { isSearchOpen, handleSearchClick, handleSearch, showSearchOn, hiddenSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = muiUseTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box
      sx={{
        display: { xs: mobileSize, md: "inline-flex" },
        alignItems: "center",
      }}
    >


      {isDesktop && showSearchOn.some(route => location.pathname.endsWith(route)) && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isSearchOpen ? (
            <SearchBar onSearch={handleSearch} />
          ) : (
            <IconButton title="Search" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          )}
        </Box>
      )}
      {isDesktop && hiddenSearch.some(route => location.pathname.endsWith(route)) && (
        <Box sx={{ display: 'flex', visibility: 'hidden', alignItems: 'center' }}>
          {isSearchOpen ? (
            <SearchBar onSearch={handleSearch} />
          ) : (
            <IconButton title="Search" onClick={handleSearchClick}>
              <SearchIcon />
            </IconButton>
          )}
        </Box>
      )}


      {user && <IconButton title="Edit Profile" sx={{ ml: 1 }} onClick={() => navigate(ROUTES.EDIT_USER)} >
        <ManageAccounts />
      </IconButton>}
      <IconButton title="Accessabily" sx={{ ml: 1 }} onClick={toggleDarkMode}>
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {user && isIconDispaly ? <Logged /> : <NotLogged />}

    </Box>
  );
}
// import React from "react";
// import { useTheme as muiUseTheme } from "@mui/material/styles";  // useTheme של MUI
// import { useTheme } from "../../../providers/CustomThemeProvider"; // ה-hook שלך
// import { Box, IconButton, useMediaQuery } from "@mui/material";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import { useCurrentUser } from "../../../users/providers/UserProvider";
// import Logged from "./Logged";
// import NotLogged from "./NotLogged";
// import SearchIcon from '@mui/icons-material/Search';
// import SearchBar from "./SearchBar";
// import { ManageAccounts } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";
// import ROUTES from "../../../routes/routesModel";
// import useSearch from "../../../hooks/useSearch";

// export default function RightNavbar({ mobileSize, isIconDisplay }) {
//   const { isSearchOpen, handleSearchClick, handleSearch, showSearchOn } = useSearch();
//   const { user } = useCurrentUser();
//   const { isDark, toggleDarkMode } = useTheme();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const theme = muiUseTheme();  // שימוש ב-MUI theme
//   const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

//   return (
//     <Box
//       sx={{
//         display: { xs: mobileSize, md: "inline-flex" },
//         alignItems: "center",
//       }}
//     >
//       {isDesktop && showSearchOn.some(route => location.pathname.endsWith(route)) && (
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           {isSearchOpen ? (
//             <SearchBar onSearch={handleSearch} />
//           ) : (
//             <IconButton title="Search" onClick={handleSearchClick}>
//               <SearchIcon />
//             </IconButton>
//           )}
//         </Box>
//       )}

//       {user && (
//         <IconButton title="Edit Profile" sx={{ ml: 1 }} onClick={() => navigate(ROUTES.EDIT_USER)}>
//           <ManageAccounts />
//         </IconButton>
//       )}
//       <IconButton title="Accessibility" sx={{ ml: 1 }} onClick={toggleDarkMode}>
//         {isDark ? <LightModeIcon /> : <DarkModeIcon />}
//       </IconButton>

//       {user && isIconDisplay ? <Logged /> : <NotLogged />}
//     </Box>
//   );
// }
