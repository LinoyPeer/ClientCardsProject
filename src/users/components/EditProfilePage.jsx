import React, { useEffect } from 'react';
import useForm from '../../forms/hooks/useForm';
import Input from '../../forms/components/Input';
import signupSchema from '../models/signupSchema';
import { useSnack } from '../../providers/SnackbarProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { Container, Button, Typography, useMediaQuery } from '@mui/material';
import { useCurrentUser } from '../providers/UserProvider';
import Form from '../../forms/components/Form';
import { useTheme } from '@emotion/react';
import { flattenUser } from '../forms/utils/transformUser';
import useUsers from '../hooks/useUsers';

export default function EditProfilePage() {
    const {
        errors,
        handleReset,
        validateForm,
        onSubmit,
        data,
        setData,
        handleChange,
    } = useForm({}, signupSchema, () => { });

    const { editUser } = useUsers()

    const setSnack = useSnack();
    const navigate = useNavigate();
    const { user } = useCurrentUser();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    useEffect(() => {
        if (user && user._id) {
            let token = localStorage.getItem('my token');
            const myHeaders = new Headers();
            myHeaders.append("x-auth-token", token);

            fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}?=${token}`, {
                method: "GET",
                headers: myHeaders,
            })
                .then((response) => response.json())
                .then((userData) => {
                    setData(flattenUser(userData));
                })
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, [user, setData]);


    const handleFormSubmit = async () => {
        await editUser(data, user._id);
    };

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
                EDIT PROFILE
            </Typography>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                        handleFormSubmit();
                    }
                }}
                onReset={handleReset}
                validateForm={validateForm}
                showSubmitButton={false}
                styles={!isDesktop && { width: '16em' }}
            >
                <Input
                    name="first"
                    label="First Name"
                    error={errors.first}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                />
                <Input
                    name="middle"
                    label="Middle Name"
                    error={errors.middle}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                    required={false}
                />
                <Input
                    name="last"
                    label="Last Name"
                    error={errors.last}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                />
                <Input
                    name="phone"
                    label="Phone"
                    type="phone"
                    error={errors.phone}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                />
                <Input
                    name="url"
                    label="Image URL"
                    error={errors.url}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                    required={false}
                />
                <Input
                    name="alt"
                    label="Image Alt"
                    error={errors.alt}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                    required={false}
                />
                <Input
                    name="state"
                    label="State"
                    error={errors.state}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                    required={false}
                />
                <Input
                    label="Country"
                    name="country"
                    error={errors.country}
                    onChange={handleChange}
                    data={data}
                    sx={!isDesktop ? { mb: 1.5 } : { mb: 2 }}
                    sm={6}
                />
                <Button onClick={handleFormSubmit} variant="contained" sx={{
                    mt: 3,
                    ml: 1,
                    color: "black",
                }}>
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}
