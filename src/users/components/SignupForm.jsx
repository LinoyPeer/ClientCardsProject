import React from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Grid, FormControlLabel, Checkbox, IconButton, Avatar, Box, Typography } from "@mui/material";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";

export default function SignupForm({

  onSubmit,
  onReset,
  validateForm,
  title,
  errors,
  data,
  onInputChange,
  handleChangeCheckBox,
}) {
  const setSnack = useSnack();
  const navigate = useNavigate();

  return (
    <Form
      onSubmit={async () => {
        let token = localStorage.getItem('my token');
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          if (token) {
            myHeaders.append("Authorization", `Bearer ${token}`);
          }

          const userData = {
            "name": {
              "first": data.first,
              "middle": data.middle || "",
              "last": data.last,
            },
            "phone": data.phone,
            "email": data.email,
            "password": data.password,
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
            "isAdmin": false,
            "isBusiness": data.isBusiness,
          };

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(userData),
            redirect: "follow",
          };

          const response = await fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", requestOptions);

          if (response.ok) {
            setSnack("success", "New user created successfully!");
            navigate(ROUTES.LOGIN);
          } else {
            let errorData;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
              errorData = await response.json();
            } else {
              errorData = await response.text();
            }
            setSnack("error", `Error: ${errorData.message || errorData}`);
          }
        } catch (error) {
          console.error("Unexpected error:", error);
        }
      }}

      onReset={onReset}
      validateForm={validateForm}
      title={title}
      styles={{ maxWidth: "800px" }}
    >
      <Input
        name="first"
        label="first name"
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="middle"
        label="middle name"
        error={errors.middle}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="last"
        label="last name"
        error={errors.last}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="password"
        label="password"
        type="password"
        error={errors.password}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="url"
        label="image url"
        error={errors.url}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="alt"
        label="image alt"
        error={errors.alt}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        name="state"
        label="state"
        error={errors.state}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={false}
      />
      <Input
        label="country"
        name="country"
        error={errors.country}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="houseNumber"
        label="house Number"
        type="number"
        error={errors.houseNumber}
        onChange={onInputChange}
        data={data}
        sm={6}
      />
      <Input
        name="zip"
        label="zip"
        error={errors.zip}
        onChange={onInputChange}
        data={data}
        sm={6}
        required={true}
      />
      <Box sx={{
        display: "flex", flexDirection: "row", gap: "rem", marginTop: "6em",
      }}>
        <Typography sx={{
          marginTop: "-2em",
        }}>Choose your avatar:</Typography>
        <IconButton>
          <Avatar
            src="/images/AvatarChoose2.jpg"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
        <IconButton>
          <Avatar
            src="/images/AvatarChoose2.jpg"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
        <IconButton>
          <Avatar
            src="/images/AvatarChoose3.jpg"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
        <IconButton>
          <Avatar
            src="/images/AvatarChoose4.jpg"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
        <IconButton>
          <Avatar
            src="/images/AvatarChoose5.jpg"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
        <IconButton>
          <Avatar
            src="/images/AvatarChoose6.jpg"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </IconButton>
      </Box>
      <Grid item>
        <FormControlLabel
          onChange={handleChangeCheckBox}
          name="isBusiness"
          control={<Checkbox value={data.isBusiness} color="primary" />}
          label="Signup as business"
          sx={{ direction: "ltr" }}
        />
      </Grid>
    </Form>
  );
}