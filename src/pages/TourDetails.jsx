// src/pages/TourDetails.jsx
import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Typography,
  Paper,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";

import Header from "../components/Header";
import Footer from "../components/Footer";

// ✅ import your JSON data
// change this path to your file location
import toursData from "../data/tour.json";

const ACCENT = "#ff6b6b";

function Pill({ icon, text }) {
  return (
    <Chip
      icon={icon}
      label={text}
      sx={{
        bgcolor: "#fff",
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: 2,
        fontWeight: 600,
        px: 0.5,
        "& .MuiChip-icon": { color: ACCENT },
      }}
    />
  );
}

export default function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // ✅ Find tour by slug OR id
  const tour = useMemo(() => {
    return (
      toursData.find((t) => t.slug === slug) ||
      toursData.find((t) => t.id === slug)
    );
  }, [slug]);

  // ✅ fallback state
  const [activeImg, setActiveImg] = useState(0);

  const gallery = tour?.gallery?.length
    ? tour.gallery
    : tour?.images?.length
    ? tour.images
    : tour?.image
    ? [tour.image]
    : [];

  const iframeSrc = useMemo(() => {
    const q = encodeURIComponent(
      tour?.mapQuery || tour?.location || tour?.pickup || "India"
    );
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [tour]);

  // ✅ Not found page
  if (!tour) {
    return (
      <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
          <Typography sx={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>
            Tour not found
          </Typography>
          <Typography sx={{ mt: 1, color: "rgba(15,23,42,0.7)" }}>
            This tour slug does not match any tour in your JSON.
          </Typography>

          <Button
            sx={{ mt: 3, bgcolor: ACCENT, "&:hover": { bgcolor: "#ff5252" } }}
            variant="contained"
            onClick={() => navigate("/tours")}
          >
            Back to Tours
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  // ✅ badges like your screenshot
  const badges = [
    { icon: <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />, text: tour.duration || "—" },
    { icon: <GroupOutlinedIcon sx={{ fontSize: 16 }} />, text: tour.people || "Max 20 People" },
    { icon: <ChildCareOutlinedIcon sx={{ fontSize: 16 }} />, text: tour.minAge || "Min Age 10+" },
    { icon: <EventAvailableOutlinedIcon sx={{ fontSize: 16 }} />, text: tour.season || "October to March" },
  ];

  const highlights = tour.highlights || [
    "Professional tour guide",
    "Comfortable accommodation",
    "All meals included",
    "Transportation included",
    "24/7 support",
  ];

  const itinerary = tour.itinerary || [];

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 340 },
          backgroundImage: `url(${tour.heroImage || tour.image || gallery[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.30) 0%, rgba(2,6,23,0.78) 100%)",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            pb: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ color: "#fff", maxWidth: 820 }}>
            <Typography sx={{ opacity: 0.85, fontSize: 12, mb: 1 }}>
              Home &nbsp;&nbsp;›&nbsp;&nbsp; Tours &nbsp;&nbsp;›&nbsp;&nbsp;{" "}
              <Box component="span" sx={{ opacity: 0.9 }}>
                {tour.title}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 26, md: 34 },
                fontWeight: 800,
                letterSpacing: -0.4,
                lineHeight: 1.1,
                mb: 0.7,
              }}
            >
              {tour.title}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ opacity: 0.95 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>
                {tour.location || "—"}
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* TOP PILLS */}
        <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap" sx={{ mb: 3 }}>
          {badges.map((b, idx) => (
            <Pill key={idx} icon={b.icon} text={b.text} />
          ))}
        </Stack>

        {/* MAIN GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 360px" },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <Box>
            {/* About + Gallery */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: { xs: 2, md: 2.5 },
                border: "1px solid rgba(15,23,42,0.08)",
                bgcolor: "#fff",
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}>
                About This Tour
              </Typography>
              <Typography sx={{ color: "rgba(15,23,42,0.72)", fontSize: 14.5 }}>
                {tour.about || tour.description || "—"}
              </Typography>

              <Typography sx={{ fontWeight: 800, color: "#0f172a", mt: 3, mb: 1.5 }}>
                Gallery
              </Typography>

              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <Box
                  sx={{
                    height: { xs: 220, md: 320 },
                    backgroundImage: `url(${gallery[activeImg]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Box>

              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                {gallery.slice(0, 5).map((src, i) => (
                  <Box
                    key={src + i}
                    onClick={() => setActiveImg(i)}
                    sx={{
                      width: 96,
                      height: 58,
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        i === activeImg
                          ? `2px solid ${ACCENT}`
                          : "1px solid rgba(15,23,42,0.10)",
                      opacity: i === activeImg ? 1 : 0.92,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Itinerary */}
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                borderRadius: 3,
                p: { xs: 2, md: 2.5 },
                border: "1px solid rgba(15,23,42,0.08)",
                bgcolor: "#fff",
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}>
                Day-wise Itinerary
              </Typography>

              {itinerary.length === 0 ? (
                <Typography sx={{ color: "rgba(15,23,42,0.7)", fontSize: 14 }}>
                  No itinerary available in JSON.
                </Typography>
              ) : (
                <Stack spacing={1.25}>
                  {itinerary.map((it, idx) => (
                    <Accordion
                      key={idx}
                      disableGutters
                      elevation={0}
                      sx={{
                        border: "1px solid rgba(15,23,42,0.08)",
                        borderRadius: 2,
                        overflow: "hidden",
                        "&:before": { display: "none" },
                      }}
                    >
                      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                        <Typography sx={{ fontWeight: 800, color: "#0f172a", fontSize: 14 }}>
                          {it.day || `Day ${idx + 1}`}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ color: "rgba(15,23,42,0.72)", fontSize: 14 }}>
                          {it.text || it.desc || ""}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              )}
            </Paper>

            {/* Pickup & Drop */}
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                borderRadius: 3,
                p: { xs: 2, md: 2.5 },
                border: "1px solid rgba(15,23,42,0.08)",
                bgcolor: "#fff",
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}>
                Pickup & Drop Points
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid rgba(15,23,42,0.08)",
                    bgcolor: "#fff",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <LocalTaxiOutlinedIcon sx={{ color: "#16a34a" }} />
                    <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>
                      Pickup Point
                    </Typography>
                  </Stack>
                  <Typography sx={{ mt: 0.8, color: "rgba(15,23,42,0.72)", fontSize: 14 }}>
                    {tour.pickup || "—"}
                  </Typography>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid rgba(15,23,42,0.08)",
                    bgcolor: "#fff",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <PinDropOutlinedIcon sx={{ color: ACCENT }} />
                    <Typography sx={{ fontWeight: 900, color: "#0f172a" }}>
                      Drop Point
                    </Typography>
                  </Stack>
                  <Typography sx={{ mt: 0.8, color: "rgba(15,23,42,0.72)", fontSize: 14 }}>
                    {tour.drop || "—"}
                  </Typography>
                </Paper>
              </Box>
            </Paper>

            {/* Map */}
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                borderRadius: 3,
                p: { xs: 2, md: 2.5 },
                border: "1px solid rgba(15,23,42,0.08)",
                bgcolor: "#fff",
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#0f172a", mb: 1.5 }}>
                Location Map
              </Typography>

              <Box
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid rgba(15,23,42,0.08)",
                  height: { xs: 260, md: 320 },
                }}
              >
                <Box
                  component="iframe"
                  title="map"
                  src={iframeSrc}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sx={{ border: 0 }}
                />
              </Box>
            </Paper>
          </Box>

          {/* RIGHT */}
          <Box>
            <Paper
              elevation={0}
              sx={{
                position: { xs: "static", md: "sticky" },
                top: 92,
                borderRadius: 3,
                border: "1px solid rgba(15,23,42,0.08)",
                bgcolor: "#fff",
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    color: ACCENT,
                    textAlign: "center",
                    mb: 0.5,
                  }}
                >
                  {tour.pricingText || "Contact for Pricing"}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(15,23,42,0.65)",
                    fontSize: 12.5,
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Get personalized quote
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  sx={{
                    bgcolor: ACCENT,
                    borderRadius: 2,
                    py: 1.1,
                    fontWeight: 800,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#ff5252" },
                  }}
                  onClick={() => console.log("Book now:", tour.slug || tour.id)}
                >
                  Book Now
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  sx={{
                    mt: 1.2,
                    color: "#0f172a",
                    fontWeight: 800,
                    textTransform: "none",
                  }}
                  onClick={() => console.log("Enquire:", tour.slug || tour.id)}
                >
                  Enquire Now
                </Button>
              </Box>

              <Divider sx={{ borderColor: "rgba(15,23,42,0.08)" }} />

              <Box sx={{ p: 2.5 }}>
                <Typography sx={{ fontWeight: 900, color: "#0f172a", mb: 1.25 }}>
                  Tour Highlights
                </Typography>

                <Stack spacing={1.1}>
                  {highlights.map((h, idx) => (
                    <Stack key={h + idx} direction="row" spacing={1} alignItems="center">
                      <CheckCircleOutlineIcon sx={{ color: "#16a34a", fontSize: 18 }} />
                      <Typography sx={{ color: "rgba(15,23,42,0.75)", fontSize: 13.5 }}>
                        {h}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
