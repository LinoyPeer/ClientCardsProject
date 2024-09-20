import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/loginSchema";
import { Button, Container, Grid } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useUsers from "../hooks/useUsers";



export default function LoginPage() {
  const { isLoading, error, handleLogin } = useUsers();
  const { data, errors, handleChange, handleReset, validateForm, onSubmit } =
    useForm(initialLoginForm, loginSchema, handleLogin);

  const { user } = useCurrentUser();

  const MAX_LOGIN_ATTEMPTS = 3;
  // const BLOCK_DURATION = 24 * 60 * 60 * 1000;
  const BLOCK_DURATION = 24 * 60 * 60 * 1000;

  const loginAttempts = JSON.parse(localStorage.getItem("loginAttempts")) || [];
  const recentAttempts = loginAttempts.filter(
    (attempt) => new Date().getTime() - attempt < BLOCK_DURATION
  );
  const isBlocked = recentAttempts.length >= MAX_LOGIN_ATTEMPTS;

  if (user) return <Navigate to={ROUTES.ROOT} replace />;
  // console.log("loginAttempts:", loginAttempts);
  // console.log("recentAttempts:", recentAttempts);
  // console.log("isBlocked:", isBlocked);

  return (
    <Container>
      <PageHeader
        title="Welcome to Login page"
        subtitle="here you can log in"
      />
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          title="login"
          styles={{ maxWidth: "450px" }}
          to={ROUTES.ROOT}
          onSubmit={onSubmit}
          onReset={handleReset}
          validateForm={validateForm}
          isBlocked={isBlocked}
          error={error}
          isLoading={isLoading}
        >
          <Input
            label="email"
            name="email"
            type="email"
            error={errors.email}
            onChange={handleChange}
            data={data}
            disabled={isBlocked}
          />
          <Input
            label="password"
            name="password"
            type="password"
            error={errors.password}
            onChange={handleChange}
            data={data}
            disabled={isBlocked}
          />
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component={Link}
              to={ROUTES.SIGNUP}
              startIcon={<AccountBoxIcon />}
              sx={{ width: "100%" }}
            >
              Sign Up
            </Button>
          </Grid>
          {isBlocked && (
            <p style={{ color: "red" }}>
              You have been blocked for 24 hours due to too many failed login attempts.
            </p>
          )}
        </Form>
      </Container>
    </Container>
  );
}
