import React, { useContext } from "react";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const BackgroundWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: -1,
  background: "linear-gradient(45deg, #f5f5f5, #d1c4e9)",
  overflow: "hidden",
}));

const MovingObject = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "200px",
  height: "200px",
  background: "rgba(63, 81, 181, 0.6)",
  borderRadius: "50%",
  animation: "move 10s ease-in-out infinite",
  "@keyframes move": {
    "0%": { transform: "translate(0, 0)" },
    "50%": { transform: "translate(300px, 500px)" },
    "100%": { transform: "translate(0, 0)" },
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#007bff', 
    color: 'white',
    padding: '12px 24px',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'none', 
    boxShadow: '0 4px 20px rgba(0, 123, 255, 0.4)',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    
    '&:hover': {
      backgroundColor: '#0056b3',
      transform: 'translateY(-2px)',
    },
  
    '&:active': {
      transform: 'translateY(1px)', 
    },
  }));

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLoginClick = () => {
    if(user != null){
      navigate("/calendar");
    }
    else {
      navigate("/login");
    } 
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Motion Background */}
      <BackgroundWrapper>
        <MovingObject style={{ top: "10%", left: "10%" }} />
        <MovingObject style={{ top: "60%", left: "40%" }} />
        <MovingObject style={{ top: "30%", left: "80%" }} />
      </BackgroundWrapper>

      {/* Big headline */}
      <Typography variant="h1" sx={{ fontWeight: 600, color: "#3f51b5" }}>
        Welcome to Calendly
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 4, color: "#3f51b5" }}>
        Schedule your events with ease
      </Typography>

      {/* Custom Styled button */}
      <CustomButton onClick={handleLoginClick}>Get Started</CustomButton>;
    </Container>
  );
}
