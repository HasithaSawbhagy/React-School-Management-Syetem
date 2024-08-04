import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Box, Button } from "@mui/material";
import styled from "styled-components";
import { LightPurpleButton } from "../components/buttonStyles";
import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie Player
import animationData from "../assets/Animation - 1720358483865.json";

const Homepage = () => {
  return (
    <StyledContainer>
      <Grid container spacing={0}>
        <StyledGridItem item xs={12} md={6}>
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: "100%", width: "100%" }}
          />
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <StyledTitle>
              Welcome to
              <br />
              School Base Marks Analysis(SBMAS)
              <br />
              System
            </StyledTitle>
            <StyledText>Western School Sri Lanka</StyledText>
            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Login
                </LightPurpleButton>
              </StyledLink>
              <StyledText>
                Don't have an account?{" "}
                <Link to="/Adminregister" style={{ color: "#550080" }}>
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </StyledGridItem>
      </Grid>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledGridItem = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; /* Ensure text alignment is centered */
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  text-align: center; /* Ensure text alignment is centered */
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
