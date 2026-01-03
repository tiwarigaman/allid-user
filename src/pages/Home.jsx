import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ShieldIcon from "@mui/icons-material/Shield";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import Header from "../components/Header";
import Footer from "../components/Footer";

// ✅ your separate search component (adjust path/name if different)
import SearchArea from "../components/ToursSearchBar.jsx";

import { categories, tours, blogs } from "../data/dummy";
import { TourCard, BlogCard } from "../components/Cards";
import CategoryCard from "../components/CategoryCard.jsx";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
      <Typography
        sx={{
          fontSize: { xs: 34, md: 52 },
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#0F172A",
          lineHeight: 1.1,
          fontSize: "42px",
        }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography
          sx={{
            mt: 1.2,
            color: "#64748B",
            fontSize: { xs: 13, md: 16 },
            maxWidth: 780,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
};

export default function Home() {
  const why = [
    {
      title: "15+ Years Experience",
      desc: "Trusted by thousands of travelers worldwide",
      icon: <WorkspacePremiumIcon />,
    },
    {
      title: "24/7 Support",
      desc: "Round-the-clock assistance for your peace of mind",
      icon: <HeadsetMicIcon />,
    },
    {
      title: "Safe & Secure",
      desc: "Your safety is our top priority",
      icon: <ShieldIcon />,
    },
    {
      title: "Best Prices",
      desc: "Competitive rates with no hidden costs",
      icon: <CurrencyRupeeIcon />,
    },
  ];

  return (
    <>
      <Header />

      {/* HERO (collage background + exact vibe) */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 520, md: 680 },
          overflow: "hidden",
          borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
        }}
      >
        {/* collage grid */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gap: "2px",
          }}
        >
          {[
            // top row
            {
              col: "1 / span 4",
              row: "1 / span 2",
              url: "https://images.unsplash.com/photo-1586088422111-1e1dbd3c8d1e?q=80&w=1600&auto=format&fit=crop",
            },
            {
              col: "5 / span 4",
              row: "1 / span 2",
              url: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
            },
            {
              col: "9 / span 4",
              row: "1 / span 2",
              url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop",
            },

            // middle
            {
              col: "1 / span 6",
              row: "3 / span 2",
              url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
            },
            {
              col: "7 / span 6",
              row: "3 / span 2",
              url: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop",
            },

            // bottom
            {
              col: "1 / span 4",
              row: "5 / span 2",
              url: "https://images.unsplash.com/photo-1463694775559-eea25626346b?q=80&w=1600&auto=format&fit=crop",
            },
            {
              col: "5 / span 4",
              row: "5 / span 2",
              url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
            },
            {
              col: "9 / span 4",
              row: "5 / span 2",
              url: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop",
            },
          ].map((x, i) => (
            <Box
              key={i}
              sx={{
                gridColumn: x.col,
                gridRow: x.row,
                backgroundImage: `url(${x.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </Box>

        {/* overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.45) 50%, rgba(2,6,23,0.55) 100%)",
          }}
        />

        {/* content */}
        <Container
          maxWidth={false}
          className="wrap"
          sx={{ position: "relative", height: "100%" }}
        >
          <Box
            sx={{
              pt: { xs: "130px", md: "200px" },
              pb: { xs: 8, md: 10 },
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ maxWidth: 980, width: "100%", px: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: 44, md: 78 },
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.02,
                  color: "white",
                }}
              >
                Discover{" "}
                <Box component="span" sx={{ color: "#FF6B6B" }}>
                  Incredible India
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,0.9)",
                  fontSize: { xs: 14, md: 18 },
                  lineHeight: 1.7,
                  maxWidth: 820,
                  mx: "auto",
                }}
              >
                Experience the magic of India with our carefully curated tours
                and authentic local experiences
              </Typography>

              {/* ✅ your separate SearchArea component */}
              <Box
                sx={{
                  mt: { xs: 4, md: 5 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 980 }}>
                  <SearchArea />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CATEGORIES */}
      {/* CATEGORIES */}
      <Box
        sx={{
          py: { xs: 7, md: 9 },
          bgcolor: "#F6F7FB",
        }}
      >
        <Container maxWidth="lg">
          <SectionTitle
            title="Explore by Category"
            subtitle="Choose from our diverse range of travel experiences designed to suit every traveler's passion"
          />

          <Grid
            container
            spacing={4} // more breathing space
            justifyContent="center" // center grid
          >
            {categories?.map((c) => (
              <Grid
                key={c?.id || c?.slug || c?.name}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center", // center card inside column
                }}
              >
                {/* 👇 width control */}
                <Box sx={{ width: "100%", maxWidth: 360 }}>
                  <CategoryCard item={c} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FEATURED TOURS */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "white" }}>
        <Container maxWidth={false} className="wrap">
          <SectionTitle
            title="Featured Tours"
            subtitle="Handpicked destinations and experiences that showcase the best of India"
          />
          <Grid container spacing={3}>
            {tours?.slice(0, 6)?.map((t) => (
              <Grid key={t?.id || t?.slug || t?.title} item xs={12} md={6}>
                <TourCard item={t} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              endIcon={<ArrowRightAltIcon />}
              sx={{
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656" },
                borderRadius: 999,
                px: 3,
                py: 1.2,
                boxShadow: "0 10px 24px rgba(255,107,107,0.35)",
                fontWeight: 900,
              }}
            >
              View All Tours
            </Button>
          </Box>
        </Container>
      </Box>

      {/* WHY CHOOSE */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#0F4C4F" }}>
        <Container maxWidth={false} className="wrap">
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: { xs: 30, md: 48 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Why Choose All India Destination?
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              mt: 1,
              maxWidth: 780,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            We create unforgettable travel experiences with our expertise,
            passion, and commitment to excellence
          </Typography>

          <Grid container spacing={3} sx={{ mt: 6 }}>
            {why.map((x) => (
              <Grid key={x.title} item xs={12} md={3}>
                <Paper
                  sx={{
                    p: 3,
                    bgcolor: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "none",
                    textAlign: "center",
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#FF6B6B",
                      mx: "auto",
                      mb: 2,
                      "& svg": { color: "white" },
                    }}
                  >
                    {x.icon}
                  </Box>
                  <Typography
                    sx={{ color: "white", fontWeight: 900, fontSize: 18 }}
                  >
                    {x.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.78)", mt: 1 }}>
                    {x.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* BLOGS */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "#F6F7FB" }}>
        <Container maxWidth={false} className="wrap">
          <SectionTitle
            title="Travel Stories & Tips"
            subtitle="Get inspired by our latest travel stories, tips, and destination guides"
          />
          <Grid container spacing={3}>
            {blogs?.slice(0, 3)?.map((b) => (
              <Grid key={b?.id || b?.slug || b?.title} item xs={12} md={4}>
                <BlogCard item={b} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="text"
              endIcon={<ArrowRightAltIcon />}
              sx={{ fontWeight: 900 }}
            >
              Read More Stories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background:
            "linear-gradient(90deg, #ff6b6b 0%, #ff8a8a 55%, #ff6b6b 100%)",
        }}
      >
        <Container maxWidth={false} className="wrap">
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: { xs: 34, md: 56 },
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Ready for Your Next Adventure?
          </Typography>

          <Typography
            sx={{ color: "rgba(255,255,255,0.9)", textAlign: "center", mt: 1 }}
          >
            Let us help you create memories that will last a lifetime. Contact
            our travel experts today!
          </Typography>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                borderRadius: 999,
                px: 3,
                py: 1.2,
                fontWeight: 900,
              }}
            >
              Get Free Quote
            </Button>

            <TextField
              placeholder="Your Phone / Email"
              sx={{
                minWidth: { xs: "100%", md: 380 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 999,
                  bgcolor: "white",
                  height: 52,
                },
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
