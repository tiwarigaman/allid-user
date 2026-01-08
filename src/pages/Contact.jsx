// src/pages/Contact.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  TextField,
  Alert,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomTourCTA from "../components/CustomTourCTA";
import toursBanner from "../assets/sub-banner.webp";

const TEAL = "#0E6B68";
const TEAL_DARK = "#0B5B58";
const CARD_BORDER = "1px solid rgba(15,23,42,0.08)";

function InfoRow({ icon, title, lines, iconBg }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: "999px",
          display: "grid",
          placeItems: "center",
          bgcolor: iconBg || "rgba(14,107,104,0.12)",
          color: TEAL,
          flex: "0 0 auto",
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 500, color: "#0f172a", fontSize: 15 }}>
          {title}
        </Typography>
        <Box sx={{ mt: 0.4 }}>
          {(lines || []).map((t, idx) => (
            <Typography
              key={idx}
              sx={{
                fontSize: 13.5,
                fontWeight: 500,
                color: "rgba(15,23,42,0.70)",
                lineHeight: 1.55,
              }}
            >
              {t}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const databaseConnected = false; // UI only (like screenshot)

  const canSend = useMemo(() => {
    // UI only: mimic enabled/disabled feel
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.message.trim().length > 0
    );
  }, [form]);

  const onSubmit = (e) => {
    e.preventDefault();
    // UI only
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

        {/* Hero */}
            <Box
              sx={{
                position: "relative",
                height: { xs: 260, md: 380 },
                overflow: "hidden",
                borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
                backgroundImage: `url(${toursBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.70) 100%)",
                }}
              />
      
              <Container
                maxWidth="lg"
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  zIndex: 2,
                }}
              >
                <Box sx={{ maxWidth: 820, px: 2 }}>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      letterSpacing: -0.6,
                      mb: 1,
                      fontSize: { xs: 28, sm: 35, md: 45 },
                      lineHeight: 1.05,
                    }}
                  >
                    Contact Us
                  </Typography>
      
                  {/* <Typography
                    sx={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: { xs: 13.5, sm: 15.5, md: 18 },
                      maxWidth: 760,
                      mx: "auto",
                    }}
                  >
                    Discover amazing destinations across India with our
                    curated tour packages
                  </Typography> */}
                </Box>
              </Container>
            </Box>

      {/* Main */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            alignItems: "start",
          }}
        >
          {/* Left: Form */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: CARD_BORDER,
              boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#0f172a",
                }}
              >
                Send us a Message
              </Typography>

              <Box sx={{ mt: 2 }}>

                <Box component="form" onSubmit={onSubmit}>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "rgba(15,23,42,0.70)",
                      mb: 0.7,
                    }}
                  >
                    Your Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      bgcolor: "#fff",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "rgba(15,23,42,0.70)",
                      mb: 0.7,
                    }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      bgcolor: "#fff",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "rgba(15,23,42,0.70)",
                      mb: 0.7,
                    }}
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      bgcolor: "#fff",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "rgba(15,23,42,0.70)",
                      mb: 0.7,
                    }}
                  >
                    Your Message
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    minRows={7}
                    placeholder="Tell us about your travel plans or questions..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    sx={{
                      mb: 2.2,
                      "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      bgcolor: "#fff",
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    startIcon={<SendRoundedIcon />}
                    disableElevation
                    disabled={!canSend}
                    sx={{
                      borderRadius: 2,
                      py: 1.35,
                      fontWeight: 500,
                      textTransform: "none",
                      bgcolor: "#ffb4b4",
                      color: "#fff",
                      "&:hover": { bgcolor: "#ffa3a3" },
                      "&.Mui-disabled": {
                        bgcolor: "#ffd0d0",
                        color: "rgba(255,255,255,0.85)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Right: Info + Follow */}
          <Box sx={{ display: "grid", gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: CARD_BORDER,
                boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
                bgcolor: "#fff",
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#0f172a",
                  mb: 2.5,
                }}
              >
                Contact Information
              </Typography>

              <Stack spacing={2.3}>
                <InfoRow
                  icon={<LocationOnRoundedIcon />}
                  title="Visit Us"
                  lines={["123 Travel Street", "New Delhi, India 110001"]}
                  iconBg="rgba(14,107,104,0.12)"
                />
                <InfoRow
                  icon={<CallRoundedIcon />}
                  title="Call Us"
                  lines={["+91 98765 43210", "+91 98765 43211"]}
                  iconBg="rgba(255,107,107,0.14)"
                />
                <InfoRow
                  icon={<EmailRoundedIcon />}
                  title="Email Us"
                  lines={["info@allindiadestination.com", "support@allindiadestination.com"]}
                  iconBg="rgba(14,107,104,0.12)"
                />
                <InfoRow
                  icon={<AccessTimeRoundedIcon />}
                  title="Working Hours"
                  lines={[
                    "Monday - Friday: 9:00 AM - 6:00 PM",
                    "Saturday: 10:00 AM - 4:00 PM",
                    "Sunday: Closed",
                  ]}
                  iconBg="rgba(255,107,107,0.14)"
                />
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid rgba(14,107,104,0.35)",
                boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
                bgcolor: TEAL_DARK,
              }}
            >
              <Box sx={{ p: 3, color: "#fff" }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  Follow Us
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.82)",
                    maxWidth: 520,
                  }}
                >
                  Stay connected with us on social media for the latest updates and travel
                  inspiration
                </Typography>

                <Box sx={{ mt: 2, display: "flex", gap: 1.2 }}>
                  {[
                    { icon: <FacebookRoundedIcon />, href: "#" },
                    { icon: <InstagramIcon />, href: "#" },
                    { icon: <TwitterIcon />, href: "#" },
                    { icon: <YouTubeIcon />, href: "#" },
                  ].map((s, idx) => (
                    <IconButton
                      key={idx}
                      component="a"
                      href={s.href}
                      aria-label="social"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "999px",
                        bgcolor: "rgba(255,255,255,0.12)",
                        color: "#fff",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.20)" },
                      }}
                    >
                      {s.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Map */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: CARD_BORDER,
              boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            <Box sx={{ p: 2 }}>

              <Box
                sx={{
                  width: "100%",
                  height: { xs: 260, md: 320 },
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <iframe
                  title="All India Destination Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=New%20Delhi%20110001&output=embed"
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
      <CustomTourCTA />
      <Footer />
    </Box>
  );
}
