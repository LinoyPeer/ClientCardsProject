import React, { useEffect } from 'react';
import useForm from '../../forms/hooks/useForm';
import Input from '../../forms/components/Input';
import signupSchema from '../models/signupSchema';
import { useSnack } from '../../providers/SnackbarProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { Container, Button } from '@mui/material';
import { useCurrentUser } from '../providers/UserProvider';
import Form from '../../forms/components/Form';

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

    const setSnack = useSnack();
    const navigate = useNavigate();
    const { user } = useCurrentUser();
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
                    setData({
                        first: userData.name.first,
                        middle: userData.name.middle,
                        last: userData.name.last,
                        phone: userData.phone,
                        url: userData.image.url,
                        alt: userData.image.alt,
                        state: userData.address.state,
                        country: userData.address.country,
                        city: userData.address.city,
                        street: userData.address.street,
                        houseNumber: userData.address.houseNumber,
                        zip: userData.address.zip,
                    });
                })
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, [user, setData]);


    const handleFormSubmit = async () => {
        let token = localStorage.getItem('my token');
        const myHeaders = new Headers();
        myHeaders.append("x-auth-token", token);
        myHeaders.append("Content-Type", "application/json");

        const userData = {
            "name": {
                "first": data.first,
                "middle": data.middle || "",
                "last": data.last,
            },
            "phone": data.phone,
            "image": {
                "url": data.url || "",
                "alt": data.alt || "",
            },
            "address": {
                "state": data.state || "",
                "country": data.country,
                "city": data.city,
                "street": data.street,
                "houseNumber": data.houseNumber,
                "zip": data.zip,
            },
        };

        try {
            const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}?=${token}`, {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    console.log("Error data:", errorData);
                    setSnack("error", `Error: ${errorData.message || "Failed to update profile"}`);
                } else {
                    const errorText = await response.text();
                    console.log("Error text:", errorText);
                    setSnack("error", `Error: ${errorText || "Failed to update profile"}`);
                }
            } else {
                setSnack("success", "Profile updated successfully!");
                navigate(ROUTES.ROOT);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setSnack("error", "Unexpected error occurred");
        }

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
            <h1>Edit Profile</h1>

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
            >
                <Input
                    name="first"
                    label="First Name"
                    error={errors.first}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                />
                <Input
                    name="middle"
                    label="Middle Name"
                    error={errors.middle}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                    required={false}
                />
                <Input
                    name="last"
                    label="Last Name"
                    error={errors.last}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                />
                <Input
                    name="phone"
                    label="Phone"
                    type="phone"
                    error={errors.phone}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                />
                <Input
                    name="url"
                    label="Image URL"
                    error={errors.url}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                    required={false}
                />
                <Input
                    name="alt"
                    label="Image Alt"
                    error={errors.alt}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                    required={false}
                />
                <Input
                    name="state"
                    label="State"
                    error={errors.state}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                    required={false}
                />
                <Input
                    label="Country"
                    name="country"
                    error={errors.country}
                    onChange={handleChange}
                    data={data}
                    sm={6}
                />
                <Button onClick={handleFormSubmit} variant="contained" sx={{ mt: 3 }}>
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
}
