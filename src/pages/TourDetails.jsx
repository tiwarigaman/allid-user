// src/pages/TourDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
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
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import Header from "../components/Header";
import Footer from "../components/Footer";
import DetailsBanner from "../assets/tourdetail-banner.webp";

import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const ACCENT = "#fb6376";

// Small pill chip used across the page (duration, people, etc.)
function Pill({ icon, text }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.6,
        borderRadius: 999,
        border: "1px solid rgba(15,23,42,0.08)",
        bgcolor: "rgba(15,23,42,0.02)",
        columnGap: 1,
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "999px",
            bgcolor: "rgba(15,23,42,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>
      )}
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "rgba(15,23,42,0.68)",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

// Simple “Book This Tour” modal – kept same UI
function BookTourModal({ open, onClose, tourTitle }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travellers: "2",
    date: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔔 For now just console.log – later you can wire to Firestore "enquiries"
    console.log("Booking enquiry:", { tourTitle, ...form });
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          bgcolor: "#0b1120",
          background:
            "radial-gradient(circle at top, rgba(251,99,118,0.32), transparent 55%)",
        }}
      >
        <Box sx={{ p: { xs: 3, sm: 4 }, position: "relative" }}>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: "absolute",
              top: 18,
              right: 18,
              bgcolor: "rgba(15,23,42,0.72)",
              color: "#e5e7eb",
              "&:hover": {
                bgcolor: "rgba(15,23,42,0.92)",
              },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(226,232,240,0.78)",
              mb: 1,
            }}
          >
            Quick enquiry
          </Typography>

          <Typography
            sx={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#f9fafb",
              mb: 0.5,
            }}
          >
            Book “{tourTitle || "Your Tour"}”
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(148,163,184,0.9)",
              mb: 3,
            }}
          >
            Share your details and our travel specialist will call you within a
            few hours to customize this trip for you.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              label="Full Name"
              value={form.name}
              onChange={handleChange("name")}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Phone / WhatsApp"
              value={form.phone}
              onChange={handleChange("phone")}
              fullWidth
              required
              size="small"
            />
            <TextField
              label="Travellers"
              select
              fullWidth
              size="small"
              value={form.travellers}
              onChange={handleChange("travellers")}
            >
              {["1", "2", "3", "4", "5-7", "8+"].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt} People
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Preferred Start Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={handleChange("date")}
            />
            <Box />
            <TextField
              label="Tell us anything specific?"
              multiline
              minRows={3}
              fullWidth
              size="small"
              sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}
              value={form.message}
              onChange={handleChange("message")}
            />

            <Box
              sx={{
                gridColumn: "1 / -1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 0.5,
                flexWrap: "wrap",
                rowGap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: "rgba(148,163,184,0.9)",
                  maxWidth: 280,
                }}
              >
                By submitting, you agree to be contacted over call / WhatsApp
                regarding this enquiry.
              </Typography>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 999,
                  px: 3,
                  py: 1.1,
                  fontWeight: 800,
                  fontSize: 14,
                  background: ACCENT,
                  boxShadow:
                    "0 18px 40px rgba(251,99,118,0.45), 0 0 0 1px rgba(248,250,252,0.06)",
                  "&:hover": {
                    background: "#fb4b63",
                    boxShadow:
                      "0 20px 46px rgba(251,99,118,0.55), 0 0 0 1px rgba(248,250,252,0.1)",
                  },
                }}
              >
                Send Enquiry
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);

  // ------- Load tour from Firestore by slug (or id fallback) -------
  useEffect(() => {
    let cancelled = false;

    async function fetchTour() {
      setLoading(true);
      try {
        const colRef = collection(db, "tours");

        // 1) Try matching slug field
        const slugQuery = query(colRef, where("slug", "==", slug));
        const slugSnap = await getDocs(slugQuery);

        if (!cancelled) {
          if (!slugSnap.empty) {
            const docSnap = slugSnap.docs[0];
            setTour({ id: docSnap.id, ...docSnap.data() });
          } else {
            // 2) Fallback: treat slug as Firestore document id
            const docRef = doc(db, "tours", slug);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setTour({ id: docSnap.id, ...docSnap.data() });
            } else {
              setTour(null);
            }
          }
          setActiveImg(0);
        }
      } catch (err) {
        console.error("Error loading tour details:", err);
        if (!cancelled) {
          setTour(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchTour();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ------- Derived visuals from Firestore data -------

  const gallery = useMemo(() => {
    if (!tour) return [];

    // Prefer explicit galleryImageUrls if present
    if (Array.isArray(tour.galleryImageUrls) && tour.galleryImageUrls.length) {
      return tour.galleryImageUrls;
    }
    if (Array.isArray(tour.gallery) && tour.gallery.length) {
      return tour.gallery;
    }
    if (Array.isArray(tour.images) && tour.images.length) {
      return tour.images;
    }
    if (Array.isArray(tour.imageUrls) && tour.imageUrls.length) {
      return tour.imageUrls;
    }
    if (tour.featureImageUrl) {
      return [tour.featureImageUrl];
    }
    if (tour.image) {
      return [tour.image];
    }
    return [];
  }, [tour]);

  const iframeSrc = useMemo(() => {
    const q = encodeURIComponent(
      tour?.mapQuery || tour?.location || tour?.pickup || "India"
    );
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [tour]);

  // ------- Loading & not-found states -------

  if (loading) {
    return (
      <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
          <Typography
            sx={{ fontSize: 26, fontWeight: 800, color: "#0f172a", mb: 1 }}
          >
            Loading tour…
          </Typography>
          <Typography sx={{ color: "rgba(15,23,42,0.7)" }}>
            Please wait while we fetch the tour details.
          </Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="md" sx={{ py: 12 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 3, sm: 4 },
              textAlign: "center",
              bgcolor: "#0b1120",
              background:
                "radial-gradient(circle at top, rgba(251,99,118,0.28), transparent 60%)",
              color: "#e5e7eb",
              border: "1px solid rgba(148,163,184,0.25)",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(148,163,184,0.9)",
                mb: 1,
              }}
            >
              Tour not found
            </Typography>
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                mb: 1.5,
              }}
            >
              This tour does not exist anymore
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: "rgba(148,163,184,0.9)",
                mb: 3,
              }}
            >
              It may have been removed or is no longer available for booking.
              Please explore other tours from our catalogue.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/tours")}
              sx={{
                borderRadius: 999,
                px: 3,
                py: 1,
                fontWeight: 800,
                fontSize: 14,
                background: ACCENT,
                "&:hover": {
                  background: "#fb4b63",
                },
              }}
            >
              Browse All Tours
            </Button>
          </Paper>
        </Container>
        <Footer />
      </Box>
    );
  }

  // ------- Content using Firestore tour data -------

  const groupText =
    typeof tour.maxGroupSize === "number" && tour.maxGroupSize > 0
      ? `Max ${tour.maxGroupSize} People`
      : tour.people || "Max 20 People";

  const badges = [
    {
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />,
      text: tour.duration || "—",
    },
    {
      icon: <GroupOutlinedIcon sx={{ fontSize: 16 }} />,
      text: groupText,
    },
    {
      icon: <ChildCareOutlinedIcon sx={{ fontSize: 16 }} />,
      text: tour.minAge || "Min Age 10+",
    },
    {
      icon: <EventAvailableOutlinedIcon sx={{ fontSize: 16 }} />,
      text: tour.season || "October to March",
    },
  ];

  const highlights =
    Array.isArray(tour.highlights) && tour.highlights.length
      ? tour.highlights
      : [
          "Professional tour guide",
          "Comfortable accommodation",
          "All meals included",
          "Transportation included",
          "24/7 support",
        ];

  const itinerary = Array.isArray(tour.itinerary)
    ? tour.itinerary.map((d, idx) => ({
        dayNumber: d.dayNumber || idx + 1,
        title: d.dayTitle || d.day || `Day ${d.dayNumber || idx + 1}`,
        description: d.description || d.text || d.desc || "",
      }))
    : [];

  const primaryImage =
    gallery[activeImg] ||
    tour.featureImageUrl ||
    gallery[0] ||
    DetailsBanner;

  return (
    <Box sx={{ bgcolor: "#0b1120", minHeight: "100vh" }}>
      <Header />

      {/* HERO */}
      <Box
        sx={{
          pt: { xs: 14, md: 16 },
          pb: { xs: 8, md: 10 },
          backgroundImage: `linear-gradient(180deg, #020617 0%, #020617 45%, #020617 75%, #020617 100%), url(${DetailsBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: { xs: 2.4, sm: 3, md: 3.4 },
              bgcolor: "rgba(15,23,42,0.92)",
              border: "1px solid rgba(148,163,184,0.45)",
              backdropFilter: "blur(22px)",
              boxShadow:
                "0 32px 64px rgba(15,23,42,0.78), 0 0 0 1px rgba(15,23,42,0.65)",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.7fr 1.1fr" },
              columnGap: { xs: 3, md: 4 },
              rowGap: 3,
            }}
          >
            {/* LEFT: title + meta */}
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(148,163,184,0.9)",
                  mb: 1.1,
                }}
              >
                {tour.categoryName || "Guided Tour"} •{" "}
                {tour.location || "India"}
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 28, sm: 32, md: 36 },
                  lineHeight: 1.08,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  color: "#f9fafb",
                  mb: 1.3,
                }}
              >
                {tour.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "rgba(203,213,225,0.92)",
                  maxWidth: 620,
                  mb: 2.6,
                }}
              >
                {tour.shortDescription || tour.description || tour.about}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 2.8, rowGap: 1 }}
              >
                {badges.map((b, idx) => (
                  <Pill key={idx} icon={b.icon} text={b.text} />
                ))}
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Button
                  variant="contained"
                  onClick={() => setBookOpen(true)}
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    py: 1.1,
                    fontWeight: 800,
                    fontSize: 14,
                    alignSelf: "flex-start",
                    background: ACCENT,
                    boxShadow:
                      "0 18px 40px rgba(251,99,118,0.6), 0 0 0 1px rgba(248,250,252,0.18)",
                    "&:hover": {
                      background: "#fb4b63",
                      boxShadow:
                        "0 20px 48px rgba(251,99,118,0.75), 0 0 0 1px rgba(248,250,252,0.28)",
                    },
                  }}
                >
                  Book This Tour
                </Button>

                <Stack
                  direction="row"
                  spacing={1.2}
                  alignItems="center"
                  sx={{ mt: { xs: 0.5, sm: 0 } }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "999px",
                      bgcolor: "#22c55e",
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "rgba(148,163,184,0.9)",
                    }}
                  >
                    Few seats left for the next batch
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* RIGHT: image + stats */}
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                bgcolor: "#020617",
                border: "1px solid rgba(30,64,175,0.35)",
                boxShadow:
                  "0 18px 38px rgba(15,23,42,0.85), 0 0 24px rgba(37,99,235,0.45)",
                position: "relative",
                minHeight: 220,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${primaryImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.95)",
                  transform: "scale(1.02)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(15,23,42,0.18), rgba(15,23,42,0.9))",
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2.4,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "rgba(226,232,240,0.92)",
                      mb: 0.6,
                      fontWeight: 700,
                    }}
                  >
                    Starts from
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#f9fafb",
                    }}
                  >
                    {tour.pricingText || "Contact for Pricing"}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  sx={{
                    mt: 2,
                    pt: 1.2,
                    borderTop: "1px solid rgba(148,163,184,0.4)",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "rgba(148,163,184,0.9)",
                        mb: 0.5,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      Starting Point
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        columnGap: 0.7,
                      }}
                    >
                      <LocationOnOutlinedIcon
                        sx={{ fontSize: 16, opacity: 0.9 }}
                      />
                      {tour.pickup || tour.location || "As per itinerary"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "rgba(148,163,184,0.9)",
                        mb: 0.5,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        textAlign: "right",
                      }}
                    >
                      Best Season
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e5e7eb",
                        textAlign: "right",
                      }}
                    >
                      {tour.season || "Oct – Mar"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* BODY */}
      <Box sx={{ bgcolor: "#f5f7fb", pt: { xs: 6, md: 7 }, pb: 8 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 4, lg: 5 }}
            alignItems="flex-start"
          >
            {/* LEFT column */}
            <Box sx={{ flex: 1.7, minWidth: 0 }}>
              {/* Highlights / overview */}
              <Box
                sx={{
                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "#0f172a",
                    mb: 1.5,
                  }}
                >
                  Highlights & Trip Overview
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "rgba(15,23,42,0.75)",
                    maxWidth: 680,
                    mb: 2.5,
                  }}
                >
                  Hand-picked experiences to cover the spiritual, cultural and
                  scenic sides of this destination. Here’s what makes this trip
                  special:
                </Typography>

                <Stack
                  component="ul"
                  sx={{
                    pl: 0,
                    m: 0,
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 1.2,
                  }}
                >
                  {highlights.map((h, idx) => (
                    <Box
                      key={idx}
                      component="li"
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        columnGap: 1.2,
                      }}
                    >
                      <Box
                        sx={{
                          mt: 0.5,
                          width: 6,
                          height: 6,
                          borderRadius: "999px",
                          bgcolor: ACCENT,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "rgba(15,23,42,0.82)",
                        }}
                      >
                        {h}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Itinerary */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "#0f172a",
                    mb: 1.5,
                  }}
                >
                  Travel Plan & Itinerary
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "rgba(15,23,42,0.75)",
                    mb: 2.4,
                  }}
                >
                  A day-by-day breakdown of your journey so you know exactly
                  what to expect.
                </Typography>

                <Box
                  sx={{
                    borderRadius: 3,
                    border: "1px solid rgba(15,23,42,0.08)",
                    bgcolor: "#fff",
                    overflow: "hidden",
                  }}
                >
                  {itinerary.length === 0 ? (
                    <Box sx={{ p: 3 }}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          color: "rgba(15,23,42,0.6)",
                        }}
                      >
                        Detailed day-wise itinerary will be shared with you
                        after booking.
                      </Typography>
                    </Box>
                  ) : (
                    itinerary.map((day, idx) => (
                      <Accordion
                        key={idx}
                        defaultExpanded={idx === 0}
                        disableGutters
                        sx={{
                          "&:before": { display: "none" },
                          borderBottom:
                            idx === itinerary.length - 1
                              ? "none"
                              : "1px solid rgba(15,23,42,0.06)",
                          "& .MuiAccordionSummary-root": {
                            px: 3,
                            py: 2,
                            minHeight: 0,
                          },
                          "& .MuiAccordionDetails-root": {
                            px: 3,
                            pb: 3,
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<KeyboardArrowDownIcon />}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.16em",
                                color: "rgba(15,23,42,0.55)",
                                mb: 0.3,
                              }}
                            >
                              Day {day.dayNumber || idx + 1}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              {day.title}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: "rgba(15,23,42,0.78)",
                              lineHeight: 1.7,
                            }}
                          >
                            {day.description}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))
                  )}
                </Box>
              </Box>

              {/* Pickup & Drop */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "#0f172a",
                    mb: 1.5,
                  }}
                >
                  Pickup & Drop Details
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 2.5,
                    border: "1px solid rgba(15,23,42,0.08)",
                    bgcolor: "#fff",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2.5,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "rgba(15,23,42,0.58)",
                        mb: 0.5,
                      }}
                    >
                      Pickup Point
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#0f172a",
                        mb: 0.4,
                      }}
                    >
                      {tour.pickup || "As per itinerary / discussion"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(15,23,42,0.7)",
                      }}
                    >
                      Our team will share exact pickup time and vehicle details
                      before the trip.
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "rgba(15,23,42,0.58)",
                        mb: 0.5,
                      }}
                    >
                      Drop Point
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#0f172a",
                        mb: 0.4,
                      }}
                    >
                      {tour.drop || "Same as pickup / nearest point"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(15,23,42,0.7)",
                      }}
                    >
                      Flexible drop options can be discussed with your trip
                      coordinator.
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              {/* Gallery */}
              {gallery.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#0f172a",
                      mb: 1.5,
                    }}
                  >
                    Trip Gallery
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "2fr 1.2fr" },
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 3,
                        overflow: "hidden",
                        border: "1px solid rgba(15,23,42,0.08)",
                        minHeight: 220,
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: `url(${gallery[activeImg]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          transform: "scale(1.02)",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 1,
                      }}
                    >
                      {gallery.slice(0, 4).map((img, idx) => (
                        <Box
                          key={idx}
                          onClick={() => setActiveImg(idx)}
                          sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            border:
                              activeImg === idx
                                ? `2px solid ${ACCENT}`
                                : "1px solid rgba(15,23,42,0.08)",
                            cursor: "pointer",
                            minHeight: 80,
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Map */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "#0f172a",
                    mb: 1.5,
                  }}
                >
                  Location & Map
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: "rgba(15,23,42,0.75)",
                    mb: 2,
                  }}
                >
                  Explore where this experience takes place. Exact meeting
                  points will be shared after confirmation.
                </Typography>

                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid rgba(15,23,42,0.08)",
                  }}
                >
                  <Box
                    component="iframe"
                    src={iframeSrc}
                    title="Tour Map"
                    width="100%"
                    height="360"
                    sx={{
                      border: 0,
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Box>
            </Box>

            {/* RIGHT column – sticky summary / CTA */}
            <Box
              sx={{
                flex: 1,
                position: { xs: "static", lg: "sticky" },
                top: { lg: 96 },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  p: 2.5,
                  border: "1px solid rgba(15,23,42,0.08)",
                  bgcolor: "#ffffff",
                  mb: 2.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(15,23,42,0.6)",
                    mb: 0.8,
                  }}
                >
                  Quick Info
                </Typography>

                <Stack spacing={1.4} sx={{ mb: 2.4 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(15,23,42,0.7)",
                      }}
                    >
                      Duration
                    </Typography>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}
                    >
                      {tour.duration || "—"}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(15,23,42,0.7)",
                      }}
                    >
                      Group Size
                    </Typography>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}
                    >
                      {groupText}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(15,23,42,0.7)",
                      }}
                    >
                      Difficulty
                    </Typography>
                    <Chip
                      label={tour.difficultyLevel || "Easy"}
                      size="small"
                      sx={{
                        height: 22,
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 700,
                        bgcolor: "rgba(22,163,74,0.08)",
                        color: "#15803d",
                      }}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        color: "rgba(15,23,42,0.7)",
                      }}
                    >
                      Minimum Age
                    </Typography>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}
                    >
                      {tour.minAge || "10+ years"}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                  sx={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(15,23,42,0.6)",
                    mb: 0.8,
                  }}
                >
                  Need help deciding?
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    color: "rgba(15,23,42,0.78)",
                    mb: 2.2,
                  }}
                >
                  Talk to our travel expert to customise this itinerary, add
                  extra days or combine with other destinations.
                </Typography>

                <Stack spacing={1.2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setBookOpen(true)}
                    sx={{
                      borderRadius: 999,
                      py: 1.05,
                      fontWeight: 800,
                      fontSize: 14,
                      background: ACCENT,
                      "&:hover": {
                        background: "#fb4b63",
                      },
                    }}
                  >
                    Send Enquiry
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/tours")}
                    sx={{
                      borderRadius: 999,
                      py: 1,
                      fontWeight: 700,
                      fontSize: 13,
                      borderColor: "rgba(15,23,42,0.12)",
                    }}
                  >
                    View More Tours
                  </Button>
                </Stack>
              </Paper>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />

      {/* Booking modal */}
      <BookTourModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        tourTitle={tour.title}
      />
    </Box>
  );
}
