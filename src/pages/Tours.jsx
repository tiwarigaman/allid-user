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

const ACCENT = "#ff6b6b";

const heroImages = [
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=70", // Taj
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70", // Lake/fort
  "https://images.unsplash.com/photo-1558980394-0c1b2b8f9b4f?auto=format&fit=crop&w=1200&q=70", // Mountains
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=70", // Temple
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70", // Waterfall
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=70", // Autumn
];

const dummyCategories = [
  "All Categories",
  "Cultural Heritage",
  "Beach Holidays",
  "Mountain Treks",
  "Wildlife Safari",
  "Spiritual Tours",
  "Adventure Tours",
];

const dummySort = ["Most Popular", "Newest", "Duration: Low to High", "Duration: High to Low"];

const dummyTours = [
  {
    id: "golden-triangle-adventure",
    category: "Cultural Heritage",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=70",
    location: "Delhi, Agra, Jaipur",
    title: "Golden Triangle Adventure",
    desc: "Experience the magnificent Golden Triangle circuit covering Delhi's historical monuments...",
    duration: "6 Days 5 Nights",
    people: "Max 15",
    season: "October to March",
  },
  {
    id: "kerala-backwaters-cruise",
    category: "Beach Holidays",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=70",
    location: "Alleppey, Kumarakom",
    title: "Kerala Backwaters Cruise",
    desc: "Sail through the serene backwaters of Kerala on a traditional houseboat...",
    duration: "4 Days 3 Nights",
    people: "Max 12",
    season: "November to February",
  },
  {
    id: "himalayan-trek-adventure",
    category: "Mountain Treks",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1558980394-0c1b2b8f9b4f?auto=format&fit=crop&w=1200&q=70",
    location: "Manali, Rohtang Pass",
    title: "Himalayan Trek Adventure",
    desc: "Challenge yourself with this thrilling Himalayan trek through pristine valleys,...",
    duration: "8 Days 7 Nights",
    people: "Max 10",
    season: "May to September",
  },
  {
    id: "rajasthan-desert-safari",
    category: "Adventure Tours",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=70",
    location: "Jaisalmer, Jodhpur",
    title: "Rajasthan Desert Safari",
    desc: "Experience the magic of the Thar Desert with camel safaris, sand dunes, and nights...",
    duration: "5 Days 4 Nights",
    people: "Max 20",
    season: "October to March",
  },
  {
    id: "goa-beach-paradise",
    category: "Beach Holidays",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=70",
    location: "North & South Goa",
    title: "Goa Beach Paradise",
    desc: "Relax on pristine beaches, enjoy water sports, explore Portuguese heritage, and...",
    duration: "4 Days 3 Nights",
    people: "Max 25",
    season: "November to February",
  },
  {
    id: "spiritual-varanasi-journey",
    category: "Spiritual Tours",
    tagRight: "Contact for Pricing",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=70",
    location: "Varanasi, Sarnath",
    title: "Spiritual Varanasi Journey",
    desc: "Experience the spiritual heart of India in the ancient city of Varanasi. Witness sacred...",
    duration: "3 Days 2 Nights",
    people: "Max 15",
    season: "October to March",
  },
];

function HeroMosaic() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(6, 1fr)" },
        height: "100%",
      }}
    >
      {heroImages.map((src, idx) => (
        <Box
          key={src + idx}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRight: { md: idx !== heroImages.length - 1 ? "1px solid rgba(255,255,255,0.10)" : "none" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "saturate(1.05)",
              transform: "scale(1.02)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

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
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.05) 100%)",
            pointerEvents: "none",
          }}
        />

        <Chip
          label={tour.category}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            bgcolor: "rgba(15, 23, 42, 0.75)",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 999,
          }}
        />

        <Chip
          label={tour.tagRight}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            bgcolor: ACCENT,
            color: "#fff",
            fontWeight: 700,
            borderRadius: 999,
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", mb: 1 }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {tour.location}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 1 }}>
          {tour.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.2 }}>
          {tour.desc}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "text.secondary", mb: 1.75 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {tour.duration}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, ml: "auto" }}>
            <GroupOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {tour.people}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1.75, borderColor: "rgba(15, 23, 42, 0.08)" }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
              Best Season:
            </Box>{" "}
            {tour.season}
          </Typography>

          <Button
            variant="contained"
            disableElevation
            sx={{
              ml: "auto",
              bgcolor: ACCENT,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 800,
              px: 2,
              "&:hover": { bgcolor: "#ff5252" },
            }}
            onClick={() => {
              // dummy action
              // later: navigate(`/tour/${tour.id}`)
              console.log("View details:", tour.id);
            }}
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

    // Dummy sort (you can replace later)
    if (sort === "Newest") list = list.reverse();

    return list;
  }, [search, category, sort]);

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 340, md: 430 },
          overflow: "hidden",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
        }}
      >
        <HeroMosaic />

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
              variant="h2"
              sx={{
                color: "#fff",
                fontWeight: 900,
                letterSpacing: -0.5,
                mb: 1,
                fontSize: { xs: 42, md: 56 },
              }}
            >
              All Tours
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.85)",
                fontSize: { xs: 15, md: 18 },
                mb: 3,
              }}
            >
              Discover amazing destinations across India with our curated tour packages
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Search/Filter Bar */}
      <Container maxWidth="lg" sx={{ mt: -3.5, position: "relative", zIndex: 3 }}>
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid rgba(15, 23, 42, 0.10)",
            borderRadius: 3,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.10)",
            p: { xs: 2, md: 2.25 },
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: { xs: "1fr", md: "1.6fr 0.55fr 0.55fr" },
            alignItems: "center",
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
                      width: 46,
                      height: 46,
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
                fontWeight: 700,
              }}
            >
              {dummyCategories.map((c) => (
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
                fontWeight: 700,
              }}
            >
              {dummySort.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>

      {/* Results */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 900,
            color: "#0f172a",
            mb: 3,
          }}
        >
          {filtered.length} Tours Found
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
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
              fontWeight: 900,
              px: 3,
              py: 1.25,
              boxShadow: "0 12px 26px rgba(255, 107, 107, 0.35)",
              "&:hover": { bgcolor: "#ff5252" },
            }}
            onClick={() => console.log("Load more later (pagination)")}
          >
            View More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
