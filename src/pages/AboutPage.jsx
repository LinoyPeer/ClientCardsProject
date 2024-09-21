import { Container, Divider, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";
import { useTheme } from "@emotion/react";

export default function AboutPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />
      <Container
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "space-between",

        }}
      >


        <Container sx={{ flex: 1, mr: 2 }} >
          <Typography variant="body1" paragraph mt={isDesktop ? 10 : 5}>
            <strong>Welcome to My Card Website</strong><br />
            Your go-to platform for creating, managing, and sharing business cards. Whether you're a business owner, freelancer, or just want to showcase your professional identity, we offer a seamless experience for all your card needs.
          </Typography>

          <Typography variant="h6" paragraph>
            Features
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Browse Cards:</strong> Explore a variety of cards from different industries. Browse as a guest or sign up for personalized features.<br />

            <strong>Like Your Favorite Cards:</strong> Show appreciation for cards you love by clicking the heart icon to save them to your profile.<br />

            <strong>Create & Edit Cards:</strong> Registered users can create custom cards with images and contact info. Editing is just a click away.<br />

            <strong>Detailed Card View:</strong> Click on any card to see more details, including images, addresses, and phone numbers.<br />

            <strong>User-Friendly Navigation:</strong> Navigate easily through sections like About, your favorite cards, and more with my intuitive menu.<br />

            <strong>Registration & Login:</strong> Sign up for an account to unlock features like card creation and editing. Already have an account? Log in to continue.
          </Typography>

          <Typography variant="h6" paragraph>
            My Mission
          </Typography>
          <Typography variant="body1" paragraph>
            my mission is to simplify professional networking by providing a platform to create, share, and manage business cards online. With a focus on simplicity and usability, we help you present your best self, whether networking in person or online.
          </Typography>

          <Typography variant="body1" paragraph>
            Thank you for choosing my website as your digital business card solution! This expanded text helps convey the value and features of your site, making it easier for users to understand what they can do.
          </Typography>

        </Container>
        <IconButton
          sx={{
            width: isDesktop ? '600px' : '300px',
            height: "300px",
            borderRadius: '0px',
          }}
        >
          <video
            width="100%"
            height="100%"
            autoPlay
            muted
            loop
            playsInline
            style={{ borderRadius: '10%' }}
          >
            <source src="/images/CardWeb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </IconButton>
      </Container>
    </Container >
  );
}
