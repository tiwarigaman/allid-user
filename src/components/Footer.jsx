// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

// ✅ Use your real logo from assets (update path if different)
// import logo from "../assets/logo.png";

export default function Footer({
  categories = [], // pass categories from Home if you want dynamic list
}) {
  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#2F3F4F",
        color: "rgba(255,255,255,0.92)",
        pt: { xs: 6, md: 7 },
        pb: { xs: 3.5, md: 4 },
        overflow: "hidden",
        borderTop: "8px solid #FF6B6B", // ✅ top pink strip like reference
      }}
    >
      {/* big watermark text in background */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "52%",
          transform: "translate(-50%,-50%)",
          fontSize: { xs: 80, md: 160 },
          fontWeight: 800,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.06)",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          fontFamily:"ui-sans-serif,system-ui,sans-serif",
        }}
      >
       All INDIA DESTINATION
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 5, md: 6 }}
          sx={{ alignItems: "flex-start" }}
        >
          {/* LEFT BRAND */}
          <Box sx={{ flex: 1, minWidth: 260 }}>
            <Stack direction="row" spacing={1.6} alignItems="flex-start">
              <Box
                component="img"
                // src={logo}
                alt="All India Destination"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1.2,
                  objectFit: "contain",
                  bgcolor: "rgba(0,0,0,0.25)",
                }}
              />

              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}>
                  All India Destination
                </Typography>
                <Typography sx={{ opacity: 0.8, mt: 0.35, fontSize: 13.5 }}>
                  Discover Incredible India
                </Typography>
              </Box>
            </Stack>

            <Typography sx={{ mt: 2.2, opacity: 0.85, maxWidth: 360, lineHeight: 1.7 }}>
              Experience the magic of India with our carefully curated tours. From
              majestic mountains to pristine beaches, ancient temples to modern cities.
            </Typography>

            {/* social icons */}
            <Stack direction="row" spacing={1.2} sx={{ mt: 2.2 }}>
              {[FacebookIcon, TwitterIcon, InstagramIcon, YouTubeIcon].map((Ic, i) => (
                <IconButton
                  key={i}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(255,255,255,0.35)",
                    color: "rgba(255,255,255,0.92)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                  }}
                >
                  <Ic fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* QUICK LINKS */}
          <Box sx={{ minWidth: { xs: "100%", md: 190 } }}>
            <Typography sx={{ fontWeight: 700, mb: 1.4, fontSize: 18 }}>
              Quick Links
            </Typography>

            {["Home", "All Tours", "Travel Stories", "Contact Us", "About Us"].map((t) => (
              <Typography
                key={t}
                sx={{
                  opacity: 0.9,
                  py: 0.65,
                  cursor: "pointer",
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                {t}
              </Typography>
            ))}
          </Box>

          {/* CATEGORIES */}
          <Box sx={{ minWidth: { xs: "100%", md: 220 } }}>
            <Typography sx={{ fontWeight: 700, mb: 1.4, fontSize: 18 }}>
              Categories
            </Typography>

            {(categories?.length ? categories : [
              { name: "Adventure Tours" },
              { name: "Cultural Heritage" },
              { name: "Wildlife Safari" },
              { name: "Beach Holidays" },
              { name: "Mountain Treks" },
              { name: "Spiritual Tours" },
            ]).slice(0, 6).map((c, idx) => (
              <Typography
                key={c?.id || c?.slug || c?.name || idx}
                sx={{
                  opacity: 0.9,
                  py: 0.65,
                  cursor: "pointer",
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                {c?.name}
              </Typography>
            ))}
          </Box>

          {/* STAY UPDATED */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: 300 } }}>
            <Typography sx={{ fontWeight: 700, mb: 1.4, fontSize: 18 }}>
              Stay Updated
            </Typography>

            <Typography sx={{ opacity: 0.85, mb: 2 }}>
              Subscribe to our newsletter for the latest travel deals and destination guides.
            </Typography>

            {/* email input like reference (square input + pink button) */}
            <Box sx={{ display: "flex", width: "100%", maxWidth: 360 }}>
              <TextField
                placeholder="Enter your email"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: 46,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    bgcolor: "rgba(0,0,0,0.18)",
                    color: "#fff",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.35)",
                    },
                  },
                  "& input::placeholder": {
                    color: "rgba(255,255,255,0.65)",
                    opacity: 1,
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  minWidth: 56,
                  height: 46,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  bgcolor: "#FF6B6B",
                  "&:hover": { bgcolor: "#ff5656" },
                  boxShadow: "none",
                }}
                aria-label="Subscribe"
              >
                <ArrowRightAltIcon />
              </Button>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: "rgba(255,255,255,0.18)" }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={{ xs: 1.2, md: 0 }}
          sx={{ opacity: 0.78 }}
        >
          <Typography>© 2026 All India Destination. All rights reserved.</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
