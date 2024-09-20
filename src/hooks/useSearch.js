import { useSearchParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useState } from "react";

export default function useSearch() {
    const showSearchOn = [ROUTES.CARDS, ROUTES.FAV_CARDS, ROUTES.MY_CARDS]
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
    };

    const handleSearch = (query) => {
        console.log('Search query:', query);
        handleSearchClose();
    };
    return {
        isSearchOpen,
        setIsSearchOpen,
        searchParams,
        handleSearchClick,
        setSearchParams,
        handleSearch,
        showSearchOn,
        handleSearchClose,
    }
}
