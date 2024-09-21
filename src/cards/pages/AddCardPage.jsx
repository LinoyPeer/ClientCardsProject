import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from '../../forms/components/Form';
import cardSchema from '../../users/models/cardSchema';
import { Box, Container, TextField, useMediaQuery } from '@mui/material';
import useForm from '../../forms/hooks/useForm.js';
import addCardObj from '../../users/helpers/initialForms/initialCardForm.js';
import { useSnack } from '../../providers/SnackbarProvider.jsx';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel.js';
import { useCurrentUser } from '../../users/providers/UserProvider.jsx';
import axios from 'axios';
import { useTheme } from '@emotion/react';

export default function AddCardPage() {
    const setSnack = useSnack();
    const { token } = useCurrentUser();
    const {
        data,
        errors,
        handleChange,
        handleResetForEdit,
        validateForm,
    } = useForm(addCardObj, cardSchema, () => { });
    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const fields = [
        { name: 'title', label: 'Title', required: true, required: true },
        { name: 'subtitle', label: 'Subtitle', required: true },
        { name: 'description', label: 'Description', required: true },
        { name: 'phone', label: 'Phone', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'webUrl', label: 'Website', required: false },
        { name: 'imageUrl', label: 'Image URL', required: false },
        { name: 'imageAlt', label: 'Image Alt', required: false },
        { name: 'state', label: 'State', required: false },
        { name: 'country', label: 'Country', required: true },
        { name: 'city', label: 'City', required: true },
        { name: 'street', label: 'Street', required: true },
        { name: 'houseNumber', label: 'House Number', required: true },
        { name: 'zip', label: 'ZIP Code', required: true },
    ];

    const handleSubmit = () => {
        let formData = JSON.stringify({
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            phone: data.phone,
            email: data.email,
            web: data.webUrl,
            image: {
                url: data.imageUrl,
                alt: data.altUrl
            },
            address: {
                state: data.state,
                country: data.country,
                city: data.city,
                street: data.street,
                houseNumber: data.houseNumber,
                zip: data.zip
            }
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
            headers: {
                'x-auth-token': `${token}`,
                'Content-Type': 'application/json'
            },
            data: formData
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container
            sx={{
                paddingTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '600px',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                ADD NEW CARD
            </Typography>

            <Form
                onSubmit={handleSubmit}
                onReset={handleResetForEdit}
                validateForm={validateForm}
                styles={!isDesktop && { width: '16em' }}
            >
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                >
                    {fields.map((field) => (
                        <Grid
                            key={field.name}
                            item
                            xs={12}
                            sm={6}
                            alignItems='center'
                            justifyContent='center'
                            textAlign={!isDesktop && 'center'}
                        >
                            <TextField
                                sx={{
                                    ...(isDesktop ? {} : { width: '16em' })
                                }}
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                onChange={handleChange}
                                value={data[field.name] || ""}
                                required={field.required}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </Form>
        </Container>

    );
}
