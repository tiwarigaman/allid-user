// src/pages/Tours.jsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

// ✅ your existing header/footer components (keep your paths)
import Header from "../components/Header";
import Footer from "../components/Footer";

// ✅ Use ONE banner image from assets (update path/file-name as per your project)
import toursBanner from "../assets/sub-banner.webp";

const ACCENT = "#ff6b6b";

const categoriesList = [
  "All Categories",
  "Cultural Heritage",
  "Beach Holidays",
  "Mountain Treks",
  "Wildlife Safari",
  "Spiritual Tours",
  "Adventure Tours",
];

const sortList = [
  "Most Popular",
  "Newest",
  "Alphabetical",
  "Duration: Low to High",
  "Duration: High to Low",
];

// ✅ Replace this with your real tours data when ready
const dummyTours = [
  {
    id: "goa-beach-paradise",
    category: "Beach Holidays",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
    location: "North & South Goa",
    title: "Goa Beach Paradise",
    desc: "Relax on pristine beaches, enjoy water sports, explore Portuguese heritage, and experience vibrant nightlife...",
    duration: "4 Days 3 Nights",
    people: "Max 25",
    season: "November to February",
  },
  {
    id: "golden-triangle-adventure",
    category: "Cultural Heritage",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=70",
    location: "Delhi, Agra, Jaipur",
    title: "Golden Triangle Adventure",
    desc: "Experience the magnificent Golden Triangle circuit covering Delhi's historical monuments, Agra's Taj Mahal, and Jaipur's royal palaces...",
    duration: "6 Days 5 Nights",
    people: "Max 15",
    season: "October to March",
  },
  {
    id: "himalayan-trek-adventure",
    category: "Mountain Treks",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1558980394-0c1b2b8f9b4f?auto=format&fit=crop&w=1200&q=70",
    location: "Manali, Rohtang Pass",
    title: "Himalayan Trek Adventure",
    desc: "Challenge yourself with this thrilling Himalayan trek through pristine valleys, snow-capped peaks, and breathtaking landscapes...",
    duration: "8 Days 7 Nights",
    people: "Max 10",
    season: "May to September",
  },
  {
    id: "kerala-backwaters-cruise",
    category: "Beach Holidays",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70",
    location: "Alleppey, Kumarakom",
    title: "Kerala Backwaters Cruise",
    desc: "Sail through the serene backwaters of Kerala on a traditional houseboat. Experience the tranquil beauty of palm-lined canals...",
    duration: "4 Days 3 Nights",
    people: "Max 12",
    season: "November to February",
  },
  {
    id: "rajasthan-desert-safari",
    category: "Adventure Tours",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1450071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=70",
    location: "Jaisalmer, Jodhpur",
    title: "Rajasthan Desert Safari",
    desc: "Experience the magic of the Thar Desert with camel safaris, sand dunes, and nights under the starlit sky...",
    duration: "5 Days 4 Nights",
    people: "Max 20",
    season: "October to March",
  },
  {
    id: "spiritual-varanasi-journey",
    category: "Spiritual Tours",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=70",
    location: "Varanasi, Sarnath",
    title: "Spiritual Varanasi Journey",
    desc: "Experience the spiritual heart of India in the ancient city of Varanasi. Witness sacred rituals on the ghats of the Ganges...",
    duration: "3 Days 2 Nights",
    people: "Max 15",
    season: "October to March",
  },
];

function TourCard({ tour }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            height: 220,
            backgroundImage: `url(${tour.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Chip
          label={tour.category || "Category"}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            bgcolor: "rgba(15, 23, 42, 0.78)",
            color: "#fff",
            fontWeight: 500,
            borderRadius: 999,
            fontFamily: "ui-sans-serif,system-ui,sans-serif",
          }}
        />

        <Chip
          label={tour.tagRight || "Contact for Pricing"}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            bgcolor: ACCENT,
            color: "#fff",
            fontWeight: 600,
            borderRadius: 999,
            fontFamily: "ui-sans-serif,system-ui,sans-serif",
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "text.secondary",
            mb: 1,
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {tour.location || "—"}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            lineHeight: 1.18,
            mb: 1,
            color: "#0f172a",
            fontFamily: "ui-sans-serif,system-ui,sans-serif",
          }}
        >
          {tour.title || "Tour Title"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(15, 23, 42, 0.70)",
            mb: 2.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tour.desc || ""}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "rgba(15, 23, 42, 0.70)",
            mb: 1.75,
            fontFamily: "ui-sans-serif,system-ui,sans-serif",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#0f172a" }}>
              {tour.duration || "—"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, ml: "auto" }}>
            <GroupOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#0f172a" }}>
              {tour.people || "—"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.75, borderColor: "rgba(15, 23, 42, 0.08)" }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="body2" sx={{ color: "rgba(15, 23, 42, 0.70)" }}>
            <Box component="span" sx={{ fontWeight: 500, color: "#0f172a" }}>
              Season:
            </Box>{" "}
            {tour.season || "—"}
          </Typography>

          <Button
            variant="contained"
            disableElevation
            sx={{
              ml: "auto",
              bgcolor: ACCENT,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              px: 2,
              "&:hover": { bgcolor: "#ff5252" },
            }}
            onClick={() => console.log("View details:", tour.id)}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Tours() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Most Popular");

  const filtered = useMemo(() => {
    let list = [...dummyTours];

    if (category !== "All Categories") {
      list = list.filter((t) => t.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (sort === "Newest") list = [...list].reverse();
    if (sort === "Alphabetical")
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));

    const parseDays = (str) => {
      const m = String(str).match(/(\d+)\s*Days/i);
      return m ? Number(m[1]) : 999;
    };

    if (sort === "Duration: Low to High")
      list = [...list].sort((a, b) => parseDays(a.duration) - parseDays(b.duration));
    if (sort === "Duration: High to Low")
      list = [...list].sort((a, b) => parseDays(b.duration) - parseDays(a.duration));

    return list;
  }, [search, category, sort]);

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* ✅ Hero (single banner image) */}
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
              All Tours
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: { xs: 13.5, sm: 15.5, md: 18 },
                maxWidth: 760,
                mx: "auto",
              }}
            >
              Discover amazing destinations across India with our curated tour packages
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ✅ Search strip BELOW banner (NOT overlapping) */}
      <Box
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          py: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              alignItems: "center",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "1.8fr 0.55fr 0.55fr" },
            }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tours, destinations..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "rgba(15, 23, 42, 0.55)" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        bgcolor: ACCENT,
                        color: "#fff",
                        borderRadius: 2,
                        width: 54,
                        height: 54,
                        "&:hover": { bgcolor: "#ff5252" },
                      }}
                      onClick={() => console.log("search:", search)}
                    >
                      <SearchRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 56,
                  borderRadius: 2.25,
                  bgcolor: "#fff",
                },
              }}
            />

            <FormControl fullWidth>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  borderRadius: 2,
                  height: 56,
                  fontWeight: 500,
                  bgcolor: "#fff",
                }}
              >
                {categoriesList.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{
                  borderRadius: 2,
                  height: 56,
                  fontWeight: 500,
                  bgcolor: "#fff",
                }}
              >
                {sortList.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Container>
      </Box>

      {/* Results */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          sx={{
            fontWeight: 500,
            color: "#0f172a",
            mb: 3,
            fontSize: { xs: 18, md: 22 },
          }}
        >
          {filtered.length} Tours Found
        </Typography>

        {/* ✅ 3 cards per row on desktop */}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              bgcolor: ACCENT,
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1.25,
              boxShadow: "0 12px 26px rgba(255, 107, 107, 0.35)",
              "&:hover": { bgcolor: "#ff5252" },
            }}
            onClick={() => console.log("View more")}
          >
            View More
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
