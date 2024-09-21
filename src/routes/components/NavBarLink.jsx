import React from "react";
import { Link } from "react-router-dom";

export default function NavBarLink({ to, disabled, children, sx }) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "#000",
        pointerEvents: disabled ? 'none' : 'auto',
        ...sx
      }}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
