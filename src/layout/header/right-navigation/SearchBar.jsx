import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@emotion/react";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const { isDark } = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChange = ({ target }) => setSearchParams({ q: target.value });

    return (
        <Box>
            <FormControl variant="standard" >
                <OutlinedInput
                    sx={{ backgroundColor: isDark ? "#333333" : "e3f2fd" }}
                    placeholder="Search"
                    size="small"
                    value={searchParams.get("q") ?? ""}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
};

export default SearchBar;