import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

const CustomTourCTA = () => {
  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 6, md: 9 },
        background:
          "linear-gradient(90deg, #FF6B6B 0%, #38D9C8 100%)",
        overflow: "hidden",
      }}
    >
      {/* Soft overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "40px" },
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            mb: 2,
          }}
        >
          Can&apos;t Find What You&apos;re Looking For?
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: 620,
            mx: "auto",
            mb: 4,
            opacity: 0.95,
          }}
        >
          We offer customized tour packages tailored to your preferences.
          Contact us to create your perfect journey.
        </Typography>

        <Button
          startIcon={<MailOutlineRoundedIcon />}
          sx={{
            bgcolor: "#fff",
            color: "#FF6B6B",
            px: 4,
            py: 1.4,
            borderRadius: 999,
            fontWeight: 600,
            fontSize: "14px",
            textTransform: "none",
            boxShadow: "0 12px 26px rgba(15,23,42,0.18)",
            "&:hover": {
              bgcolor: "#fff",
              transform: "translateY(-1px)",
              boxShadow: "0 16px 30px rgba(15,23,42,0.25)",
            },
            transition: "all 0.25s ease",
          }}
          onClick={() => {
            // open enquiry modal OR scroll to contact form
          }}
        >
          Contact Us
        </Button>
      </Container>
    </Box>
  );
};

export default CustomTourCTA;
