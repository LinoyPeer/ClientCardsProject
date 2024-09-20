import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, CardActions, Tooltip } from "@mui/material";
import { useCurrentUser } from "../../../users/providers/UserProvider";
import ROUTES from "../../../routes/routesModel";
import { useNavigate } from "react-router-dom";

export default function CardActionBar({
  userId,
  cardId,
  handleDelete,
  handleEdit,
  handleLike,
  likes,
  phone,
}) {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      <Box>
        <Tooltip title="delete card">
          {user && (user.isAdmin || user._id === userId) && (
            <IconButton onClick={() => handleDelete(cardId)}>
              <DeleteIcon sx={{ fontSize: "20px", color: "#918A87" }} />
            </IconButton>
          )}
        </Tooltip>
        <Tooltip title="edit card">
          {user && (user.isAdmin || user._id === userId) && (
            <IconButton
              onClick={() => {
                handleEdit(cardId);
                navigate(ROUTES.EDIT_CARD, { state: { cardId: cardId } });
              }}
            >
              <ModeEditIcon sx={{ fontSize: "20px", color: "#918A87" }} />
            </IconButton>
          )}
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="call company">
          <a href={`tel:${phone}`} style={{ textDecoration: "none" }}>
            <IconButton
              aria-label="call"
            >
              <CallIcon sx={{ fontSize: "20px", color: "#918A87" }} />
            </IconButton>
          </a>
        </Tooltip>
        <Tooltip title="like card">
          {user && (
            <IconButton onClick={() => handleLike(cardId)} >
              <FavoriteIcon
                sx={{
                  fontSize: "20px",
                  color: likes.includes(user._id) ? "red" : "#918A87",
                  "&:hover": {
                    color: likes.includes(user._id) ? "red" : "#918A87",
                  },
                }}
              />
            </IconButton>
          )}
        </Tooltip>
      </Box>
    </CardActions>
  );
}
