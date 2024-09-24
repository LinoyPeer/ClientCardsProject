import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from '../../forms/components/Form';
import { Container, TextField, useMediaQuery } from '@mui/material';
import useForm from '../../forms/hooks/useForm.js';
import addCardObj from '../../users/helpers/initialForms/initialCardForm.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cardSchema from '../../users/models/cardSchema.js';
import { useSnack } from '../../providers/SnackbarProvider.jsx';
import ROUTES from '../../routes/routesModel.js';
import { useTheme } from '@emotion/react';

export default function EditCardPage() {
    const [initialData, setInitialData] = useState(addCardObj);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const {
        errors,
        handleReset,
        validateForm,
        onSubmit,
        data,
        setData,
        handleChange,
    } = useForm(initialData, cardSchema, handleSubmit);
    const setSnack = useSnack();
    const navigate = useNavigate();

    const location = useLocation();
    const cardId = location.state?.cardId || '';

    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    useEffect(() => {
        fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                const formattedData = {
                    title: result.title,
                    subtitle: result.subtitle,
                    description: result.description,
                    phone: result.phone,
                    email: result.email,
                    webUrl: result.web,
                    imageUrl: result.image.url,
                    imageAlt: result.image.alt,
                    state: result.address.state,
                    country: result.address.country,
                    city: result.address.city,
                    street: result.address.street,
                    houseNumber: result.address.houseNumber,
                    zip: result.address.zip
                };
                setInitialData(formattedData);
                setData(formattedData);
                console.log(result);
            })
            .catch((error) => console.error('There was a problem with the fetch operation:', error));
    }, [cardId, setData]);

    const fields = [
        { name: 'title', label: 'Title', required: true },
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

    function handleSubmit() {
        let token = localStorage.getItem('my token');
        try {
            const myHeaders = new Headers();
            myHeaders.append("x-auth-token", token);
            myHeaders.append("Content-Type", "application/json");

            const convertedObjectToTheServer = JSON.stringify({
                "title": data.title,
                "subtitle": data.subtitle,
                "description": data.description,
                "phone": data.phone,
                "email": data.email,
                "web": data.webUrl,
                "image": {
                    "url": data.imageUrl,
                    "alt": data.imageAlt
                },
                "address": {
                    "state": data.state,
                    "country": data.country,
                    "city": data.city,
                    "street": data.street,
                    "houseNumber": data.houseNumber,
                    "zip": data.zip
                }
            });
            setSnack("success", "current card updated successfully !");
            navigate(ROUTES.MY_CARDS)
            console.log("Sending data:", convertedObjectToTheServer);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: convertedObjectToTheServer,
                redirect: "follow"
            };

            fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, requestOptions)
                .then((response) => {
                    console.log("Response status:", response.status);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then((result) => {
                    console.log("Submit result:", result);
                })
                .catch((error) => console.error('There was a problem with the fetch operation:', error));

        } catch (error) {
            console.log('Submit error:', error);
        }

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
                EDIT CARD
            </Typography>
            <Form
                onSubmit={onSubmit}
                onReset={handleReset}
                validateForm={validateForm}
                styles={!isDesktop && { width: '16em' }}
            >

                <Grid container spacing={2} justifyContent="center">
                    {fields.map((field) => (
                        <Grid
                            key={field.name}
                            item xs={12} sm={6}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <TextField
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