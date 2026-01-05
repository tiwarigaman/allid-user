// src/pages/TourDetails.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import Header from "../components/Header";
import Footer from "../components/Footer";
import DetailsBanner from "../assets/tourdetail-banner.webp";

// 🔹 Public API helpers
import {
  getPublicTourBySlugOrId,
  getPublicToursByCategoryPage,
} from "../api/publicTours";

const ACCENT = "#ff6b6b";

/* =========================
   RelevantTourCard (no dummy data)
========================= */
export function RelevantTourCard({
  tours = [],
  title = "First Timer Tours Packages",
  moreBtnText = "More Tour Packages",
  moreBtnTo = "/tours",
}) {
  const list = (tours || []).slice(0, 6);

  if (!list.length) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: "static",
        borderRadius: 3,
        border: "1px solid rgba(15,23,42,0.10)",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#f17171",
          py: 1.3,
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 15,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Items */}
      <Stack divider={<Divider sx={{ borderColor: "rgba(15,23,42,0.10)" }} />}>
        {list.map((item) => {
          const slugOrId = item.slug || item.id;
          return (
            <Box
              key={slugOrId}
              component={RouterLink}
              to={`/tour/${slugOrId}`}
              sx={{
                display: "flex",
                gap: 1.5,
                p: 1.6,
                textDecoration: "none",
                color: "inherit",
                alignItems: "center",
                "&:hover .rt-title": { textDecoration: "underline" },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: 74,
                  height: 54,
                  borderRadius: 1,
                  border: "1px solid rgba(15,23,42,0.15)",
                  bgcolor: "#f1f5f9",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={
                    item.featureImageUrl ||
                    item.image ||
                    (Array.isArray(item.imageUrls) && item.imageUrls[0]) ||
                    "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=800&q=70"
                  }
                  alt={item.title}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>

              {/* Title */}
              <Typography
                className="rt-title"
                sx={{
                  fontSize: 14,
                  lineHeight: 1.15,
                  fontWeight: 500,
                  color: "#0f172a",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          );
        })}
      </Stack>

      {/* Bottom Button */}
      <Button
        component={RouterLink}
        to={moreBtnTo}
        fullWidth
        disableElevation
        sx={{
          borderRadius: 0,
          bgcolor: "#ebaa48ff",
          color: "#fff",
          fontWeight: 600,
          py: 1.3,
          fontSize: 14,
          textTransform: "none",
          "&:hover": { bgcolor: "#e2a645ff", color: "#fff" },
        }}
      >
        {moreBtnText}
      </Button>
    </Paper>
  );
}

function Pill({ icon, text }) {
  return (
    <Chip
      icon={icon}
      label={text}
      sx={{
        bgcolor: "#fff",
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: 2,
        fontWeight: 400,
        px: 0.5,
        "& .MuiChip-icon": { color: ACCENT },
      }}
    />
  );
}

/* =========================
   Booking Modal (same UI)
========================= */
function BookTourModal({ open, onClose, tourTitle }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    people: "1 Person",
    date: "",
    requests: "",
  });

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Request:", { tourTitle, ...form });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: 3, overflow: "hidden" },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Modal Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: "1px solid rgba(15,23,42,0.10)",
            bgcolor: "#fff",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 20, color: "#0f172a" }}>
            Book Tour
          </Typography>

          <IconButton onClick={onClose} sx={{ color: "rgba(15,23,42,0.75)" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Stack spacing={2.2}>
            <TextField
              label="Full Name *"
              value={form.fullName}
              onChange={onChange("fullName")}
              fullWidth
              required
            />

            <TextField
              label="Email *"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              fullWidth
              required
            />

            <TextField
              label="Phone *"
              value={form.phone}
              onChange={onChange("phone")}
              fullWidth
              required
            />

            <TextField
              select
              label="Number of People"
              value={form.people}
              onChange={onChange("people")}
              fullWidth
            >
              {[
                "1 Person",
                "2 People",
                "3 People",
                "4 People",
                "5+ People",
              ].map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Preferred Date"
              type="date"
              value={form.date}
              onChange={onChange("date")}
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <CalendarMonthOutlinedIcon
                    sx={{ color: "rgba(15,23,42,0.55)" }}
                  />
                ),
              }}
            />

            <TextField
              label="Special Requests"
              value={form.requests}
              onChange={onChange("requests")}
              fullWidth
              multiline
              minRows={3}
              placeholder="Any special requirements or questions..."
            />

            <Button
              type="submit"
              variant="contained"
              disableElevation
              fullWidth
              sx={{
                bgcolor: ACCENT,
                borderRadius: 2,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: "#ff5252" },
              }}
            >
              Submit Booking Request
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function TourDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 🔹 Firestore-loaded tour & related
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  const [relatedTours, setRelatedTours] = useState([]);

  // gallery index + modal
  const [activeImg, setActiveImg] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);

  // 🔹 Load tour from publicTours API
  useEffect(() => {
    let cancelled = false;

    async function fetchTour() {
      if (!slug) return;
      setLoading(true);

      try {
        const data = await getPublicTourBySlugOrId(slug);
        if (cancelled) return;
        setTour(data || null);
        setActiveImg(0);
      } catch (err) {
        console.error("Error loading tour details:", err);
        if (!cancelled) setTour(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTour();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // 🔹 Load related tours (same category) when tour is loaded
  useEffect(() => {
    let cancelled = false;

    async function fetchRelated() {
      if (!tour?.categoryId) {
        setRelatedTours([]);
        return;
      }

      try {
        const { items } = await getPublicToursByCategoryPage({
          categoryId: tour.categoryId,
          pageSize: 6,
        });

        if (cancelled) return;
        // exclude current tour
        const filtered = items.filter((t) => t.id !== tour.id);
        setRelatedTours(filtered);
      } catch (err) {
        console.error("Error loading related tours:", err);
        if (!cancelled) setRelatedTours([]);
      }
    }

    if (tour) {
      fetchRelated();
    }

    return () => {
      cancelled = true;
    };
  }, [tour]);

  // 🔹 Gallery (JSON fields + Firestore fields)
  const gallery = useMemo(() => {
    if (!tour) return [];

    const fromFields =
      (Array.isArray(tour.galleryImageUrls) && tour.galleryImageUrls.length
        ? tour.galleryImageUrls
        : []) ||
      (Array.isArray(tour.gallery) && tour.gallery.length
        ? tour.gallery
        : []) ||
      (Array.isArray(tour.images) && tour.images.length
        ? tour.images
        : []) ||
      (Array.isArray(tour.imageUrls) && tour.imageUrls.length
        ? tour.imageUrls
        : []);

    const fallback =
      tour.featureImageUrl || tour.image ? [tour.featureImageUrl || tour.image] : [];

    const result = fromFields.length ? fromFields : fallback;
    return result;
  }, [tour]);

  const activeImage = gallery.length
    ? gallery[Math.min(activeImg, gallery.length - 1)]
    : null;

  const iframeSrc = useMemo(() => {
    if (tour?.mapEmbedUrl) return tour.mapEmbedUrl;

    const q = encodeURIComponent(
      tour?.mapQuery || tour?.location || tour?.pickup || "India"
    );
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [tour]);

  // 🔹 Loading state
  if (loading) {
    return (
      <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#0f172a" }}>
            Loading tour…
          </Typography>
          <Typography sx={{ mt: 1, color: "rgba(15,23,42,0.7)" }}>
            Please wait while we fetch the tour details.
          </Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  // 🔹 Not found state
  if (!tour) {
    return (
      <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 10, textAlign: "center" }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#0f172a" }}>
            Tour not found
          </Typography>
          <Typography sx={{ mt: 1, color: "rgba(15,23,42,0.7)" }}>
            This tour does not exist or is not available.
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

  // 🔹 badges
  const badges = [
    {
      icon: <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />,
      text: tour.duration || "—",
    },
    {
      icon: <GroupOutlinedIcon sx={{ fontSize: 16 }} />,
      text:
        tour.people ||
        (tour.maxGroupSize
          ? `Max ${tour.maxGroupSize} People`
          : "Max 20 People"),
    },
    {
      icon: <ChildCareOutlinedIcon sx={{ fontSize: 16 }} />,
      text: tour.minAge ? `Min Age ${tour.minAge}+` : "Min Age 10+",
    },
    {
      icon: <EventAvailableOutlinedIcon sx={{ fontSize: 16 }} />,
      text: tour.season || "October to March",
    },
  ];

  const highlights =
    tour.highlights && tour.highlights.length
      ? tour.highlights
      : [
          "Professional tour guide",
          "Comfortable accommodation",
          "All meals included",
          "Transportation included",
          "24/7 support",
        ];

  const includes =
    tour.included && tour.included.length
      ? tour.included
      : [
          "Professional tour guide",
          "Comfortable accommodation",
          "All meals included",
          "Transportation included",
          "24/7 support",
        ];

  const excludes =
    tour.excluded && tour.excluded.length
      ? tour.excluded
      : [
          "Professional tour guide",
          "Comfortable accommodation",
          "All meals included",
          "Transportation included",
          "24/7 support",
        ];

  const itinerary = tour.itinerary || [];

  const heroBg =
    activeImage ||
    tour.heroImage ||
    tour.featureImageUrl ||
    tour.image ||
    (gallery.length ? gallery[0] : DetailsBanner);

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 260, md: 340 },
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${DetailsBanner})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
                fontWeight: 600,
                letterSpacing: -0.4,
                lineHeight: 1.1,
                mb: 0.7,
              }}
            >
              {tour.title}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ opacity: 0.95 }}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontSize: 13.5, fontWeight: 400 }}>
                {tour.location || "—"}
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* TOP PILLS */}
        <Stack
          direction="row"
          spacing={1.25}
          useFlexGap
          flexWrap="wrap"
          sx={{ mb: 3 }}
        >
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
              <Typography sx={{ fontWeight: 600, color: "#0f172a", mb: 1 }}>
                About This Tour
              </Typography>
              <Typography sx={{ color: "rgba(15,23,42,0.72)", fontSize: 14.5 }}>
                {tour.about || tour.description || "—"}
              </Typography>

              <Typography
                sx={{ fontWeight: 600, color: "#0f172a", mt: 3, mb: 1.5 }}
              >
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
                    backgroundImage: activeImage
                      ? `url(${activeImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    bgcolor: activeImage ? "transparent" : "#e5e7eb",
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
              <Typography sx={{ fontWeight: 600, color: "#0f172a", mb: 1.5 }}>
                Day-wise Itinerary
              </Typography>

              {itinerary.length === 0 ? (
                <Typography sx={{ color: "rgba(15,23,42,0.7)", fontSize: 14 }}>
                  No itinerary available.
                </Typography>
              ) : (
                <Stack spacing={1.25}>
                  {itinerary.map((it, idx) => {
                    const title =
                      it.dayTitle ||
                      it.day ||
                      (it.dayNumber ? `Day ${it.dayNumber}` : `Day ${idx + 1}`);
                    const body =
                      it.description || it.text || it.desc || "";

                    return (
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
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "#0f172a",
                              fontSize: 14,
                            }}
                          >
                            {title}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography
                            sx={{
                              color: "rgba(15,23,42,0.72)",
                              fontSize: 14,
                            }}
                          >
                            {body}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              )}
            </Paper>

            {/* Included / Excluded */}
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
              <Typography sx={{ fontWeight: 600, color: "#0f172a", mb: 1.5 }}>
                Included
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
                  <Typography
                    sx={{ fontWeight: 700, color: "#0f172a" }}
                  >
                    Included
                  </Typography>
                  <Box sx={{ mt: 0.8 }}>
                    {includes.map((h, idx) => (
                      <Stack
                        key={h + idx}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CheckCircleOutlineIcon
                          sx={{ color: "#16a34a", fontSize: 18 }}
                        />
                        <Typography
                          sx={{
                            color: "rgba(15,23,42,0.75)",
                            fontSize: 13.5,
                          }}
                        >
                          {h}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
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
                  <Typography
                    sx={{ fontWeight: 700, color: "#0f172a" }}
                  >
                    Excluded
                  </Typography>
                  <Box sx={{ mt: 0.8 }}>
                    {excludes.map((h, idx) => (
                      <Stack
                        key={h + idx}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CloseIcon
                          sx={{ color: "#d51c1cff", fontSize: 18 }}
                        />
                        <Typography
                          sx={{
                            color: "rgba(15,23,42,0.75)",
                            fontSize: 13.5,
                          }}
                        >
                          {h}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
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
              <Typography sx={{ fontWeight: 600, color: "#0f172a", mb: 1.5 }}>
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
          <Stack spacing={2} sx={{ alignSelf: "flex-start" }}>
            {/* Pricing / CTA card */}
            <Box
              sx={{
                position: { xs: "static", md: "" },
                top: 92,
                zIndex: 2,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(15,23,42,0.08)",
                  bgcolor: "#fff",
                  overflow: "hidden",
                }}
              >
                <Box sx={{ p: 2.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
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
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": { bgcolor: "#ff5252" },
                    }}
                    onClick={() => setBookOpen(true)}
                  >
                    Book Now
                  </Button>

                  <Button
                    fullWidth
                    variant="text"
                    sx={{
                      mt: 1.2,
                      color: "#0f172a",
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                    onClick={() =>
                      console.log("Enquire:", tour.slug || tour.id)
                    }
                  >
                    Enquire Now
                  </Button>
                </Box>

                <Divider sx={{ borderColor: "rgba(15,23,42,0.08)" }} />

                <Box sx={{ p: 2.5 }}>
                  <Typography
                    sx={{ fontWeight: 700, color: "#0f172a", mb: 1.25 }}
                  >
                    Tour Highlights
                  </Typography>

                  <Stack spacing={1.1}>
                    {highlights.map((h, idx) => (
                      <Stack
                        key={h + idx}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <CheckCircleOutlineIcon
                          sx={{ color: "#16a34a", fontSize: 18 }}
                        />
                        <Typography
                          sx={{
                            color: "rgba(15,23,42,0.75)",
                            fontSize: 13.5,
                          }}
                        >
                          {h}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Paper>
            </Box>

            {/* Related tours (from Firestore, no dummy) */}
            <Box sx={{ position: "static" }}>
              <RelevantTourCard
                tours={relatedTours}
                title="Similar Tour Packages"
                moreBtnText="More Tour Packages"
                moreBtnTo="/tours"
              />
            </Box>
          </Stack>
        </Box>
      </Container>

      <BookTourModal
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        tourTitle={tour.title}
      />

      <Footer />
    </Box>
  );
}
