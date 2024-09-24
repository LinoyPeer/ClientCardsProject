import { useSearchParams } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import { useState } from "react";

export default function useSearch() {
    const showSearchOn = [ROUTES.CARDS, ROUTES.FAV_CARDS, ROUTES.MY_CARDS]
    const hiddenSearch = [ROUTES.ABOUT, ROUTES.CRM_ADMIN]
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    return {
        isSearchOpen,
        setIsSearchOpen,
        searchParams,
        handleSearchClick,
        setSearchParams,
        showSearchOn,
        hiddenSearch,
    }
}
