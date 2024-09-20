import { Fab } from '@mui/material';
import React from 'react';
import ROUTES from '../../routes/routesModel';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../users/providers/UserProvider';

export default function AddNewCardButton() {
    const navigate = useNavigate();
    const { user } = useCurrentUser();


    return (
        <>
            {user && (user.isAdmin || user.isBusiness) && (
                <Fab
                    aria-label="add"
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        backgroundColor: '#F1E8CF',
                        '&:hover': {
                            backgroundColor: '#918A87',
                        },
                    }}
                    onClick={() => navigate(ROUTES.ADD_CARD)}
                >
                    <AddIcon
                        sx={{
                            color: '#000000',
                        }}
                    />
                </Fab>
            )}
        </>
    );
}
