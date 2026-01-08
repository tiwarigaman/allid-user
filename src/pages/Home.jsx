// src/pages/Home.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import ShieldIcon from "@mui/icons-material/Shield";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import { Link as RouterLink } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

// ✅ Your separate search component
import SearchArea from "../components/ToursSearchBar.jsx";

// ✅ Blogs still from dummy for now
import { blogs } from "../data/dummy";
import CategoryCard from "../components/CategoryCard.jsx";
import TourCard from "../components/TourCard.jsx";
import BlogCard from "../components/BlogCard.jsx";

// ✅ NEW: public Firestore API for home page
import { getPublicTourCategories } from "../api/publicCategories";
import { getFeaturedTours } from "../api/publicTours";

// ✅ Use your asset background (single image)
import heroBg from "../assets/banner-grid.webp";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
      <Typography
        sx={{
          fontSize: { xs: 28, sm: 35, md: 45 },
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "#0F172A",
          lineHeight: 1.08,
        }}
      >
        {title}
      </Typography>

      {subtitle ? (
        <Typography
          sx={{
            mt: 1.2,
            color: "#64748B",
            fontSize: { xs: 14, md: 16 },
            maxWidth: 820,
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
  // search state (already used by SearchArea)
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("popular");

  // 🔹 NEW: data coming from Firestore via public APIs
  const [homeCategories, setHomeCategories] = useState([]);
  const [featuredTours, setFeaturedToursState] = useState([]);
  const [loadingHome, setLoadingHome] = useState(true);

  // 🔹 Load categories + featured tours once on mount
  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      try {
        const [cats, feats] = await Promise.all([
          getPublicTourCategories(),
          getFeaturedTours(6), // only 6 for homepage
        ]);

        if (!isMounted) return;

        setHomeCategories(cats);
        setFeaturedToursState(feats);
      } catch (err) {
        console.error("Error loading home data:", err);
      } finally {
        if (isMounted) {
          setLoadingHome(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔹 For search dropdown – built from Firestore categories now
  const categoryOptions = useMemo(() => {
    const opts = (homeCategories || []).map((c) => ({
      label: c?.name || "Category",
      value: c?.slug || (c?.name || "").toLowerCase().replace(/\s+/g, "-"),
    }));
    return [{ label: "All Categories", value: "" }, ...opts];
  }, [homeCategories]);

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

  // shared container sizing
  const sectionContainerSx = {
    maxWidth: 1240,
    mx: "auto",
    px: { xs: 2, sm: 3, md: 4 },
  };

  return (
    <>
      <Header />

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 520, md: 680 },
          overflow: "hidden",
          borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
        }}
      >
        {/* background image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.02)",
          }}
        />

        {/* overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.45) 0%, rgba(2,6,23,0.45) 50%, rgba(2,6,23,0.58) 100%)",
          }}
        />

        <Container
          maxWidth={false}
          sx={{ position: "relative", height: "100%" }}
        >
          <Box
            sx={{
              pt: { xs: "120px", sm: "140px", md: "190px" },
              pb: { xs: 7, md: 10 },
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ maxWidth: 1040, width: "100%", px: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: 38, sm: 48, md: 78 },
                  fontWeight: 700,
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
                  color: "rgba(255,255,255,0.92)",
                  fontSize: { xs: 14, md: 18 },
                  lineHeight: 1.7,
                  maxWidth: 860,
                  mx: "auto",
                }}
              >
                Experience the magic of India with our carefully curated tours
                and authentic local experiences
              </Typography>

              {/* Search Area */}
              <Box
                sx={{
                  mt: { xs: 3.5, md: 5 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%", maxWidth: 980 }}>
                  <SearchArea
                    q={q}
                    setQ={setQ}
                    cat={cat}
                    setCat={setCat}
                    sort={sort}
                    setSort={setSort}
                    categoryOptions={categoryOptions}
                  />

                  {/* Buttons under search */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    sx={{ mt: 2.2 }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<LocationOnIcon />}
                      sx={{
                        bgcolor: "#FF6B6B",
                        "&:hover": { bgcolor: "#ff5656" },
                        borderRadius: 2,
                        px: 3,
                        py: 1.25,
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: "0 12px 26px rgba(255,107,107,0.35)",
                      }}
                    >
                      Explore Tours
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<CallIcon />}
                      sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1.25,
                        fontWeight: 600,
                        textTransform: "none",
                        color: "white",
                        borderColor: "rgba(255,255,255,0.35)",
                        "&:hover": {
                          borderColor: "rgba(255,255,255,0.65)",
                          bgcolor: "rgba(255,255,255,0.08)",
                        },
                      }}
                    >
                      Contact Us
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CATEGORIES */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "#F6F7FB" }}>
        <Container maxWidth={false} sx={sectionContainerSx}>
          <SectionTitle
            title="Explore by Category"
            subtitle="Choose from our diverse range of travel experiences designed to suit every traveler's passion"
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 3, md: 4 },
              alignItems: "stretch",
            }}
          >
            {(homeCategories || []).map((c) => (
              <Box key={c?.id || c?.slug || c?.name} sx={{ minWidth: 0 }}>
                <CategoryCard item={c} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FEATURED TOURS (from Firestore, only 3 featured & published) */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "white" }}>
        <Container maxWidth={false} sx={sectionContainerSx}>
          <SectionTitle
            title="Featured Tours"
            subtitle="Handpicked destinations and experiences that showcase the best of India"
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 3, md: 4 },
              alignItems: "stretch",
            }}
          >
            {(featuredTours || []).map((t) => (
              <Box key={t?.id || t?.slug || t?.title} sx={{ minWidth: 0 }}>
                <TourCard item={t} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              component={RouterLink}
              to="/tours"
              variant="contained"
              endIcon={<ArrowRightAltIcon />}
              sx={{
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656", color:"#fff" },
                borderRadius: 999,
                px: 3,
                py: 1.2,
                boxShadow: "0 10px 24px rgba(255,107,107,0.35)",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              View All Tours
            </Button>
          </Box>
        </Container>
      </Box>

      {/* WHY CHOOSE */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 8, md: 10 },
          bgcolor: "#0F4C4F",
          overflow: "hidden",
        }}
      >
        {/* decoration circles */}
        <Box
          sx={{
            position: "absolute",
            top: 55,
            left: 44,
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)",
            opacity: 0.45,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 240,
            left: 315,
            width: 78,
            height: 78,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)",
            opacity: 0.35,
            pointerEvents: "none",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 90,
            right: 64,
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)",
            opacity: 0.45,
            pointerEvents: "none",
            display: { xs: "none", md: "block" },
          }}
        />

        <Container maxWidth={false} sx={sectionContainerSx}>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: { xs: 24, sm: 28, md: 35 },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Why Choose All India Destination?
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              mt: 1.2,
              maxWidth: 820,
              mx: "auto",
              lineHeight: 1.6,
              fontSize: { xs: 14.5, md: 16 },
            }}
          >
            We create unforgettable travel experiences with our expertise,
            passion, and commitment to excellence
          </Typography>

          <Grid
            container
            spacing={{ xs: 5, md: 3 }}
            sx={{ mt: { xs: 6, md: 8 } }}
            justifyContent="center"
          >
            {why.map((x) => (
              <Grid key={x.title} item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#FF6B6B",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "0 14px 30px rgba(255,107,107,0.25)",
                      "& svg": { color: "white", fontSize: 28 },
                    }}
                  >
                    {x.icon}
                  </Box>

                  <Typography
                    sx={{ color: "white", fontWeight: 700, fontSize: 20 }}
                  >
                    {x.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.78)",
                      mt: 1.2,
                      maxWidth: 260,
                      mx: "auto",
                      lineHeight: 1.55,
                      fontSize: { xs: 14, md: 15 },
                    }}
                  >
                    {x.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* BLOGS (still dummy for now) */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "#F6F7FB" }}>
        <Container maxWidth={false} sx={sectionContainerSx}>
          <SectionTitle
            title="Travel Stories & Tips"
            subtitle="Get inspired by our latest travel stories, tips, and destination guides"
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: { xs: 3, md: 4 },
              alignItems: "stretch",
              mt: 1,
            }}
          >
            {(blogs || []).slice(0, 3).map((b) => (
              <Box key={b?.id || b?.slug || b?.title} sx={{ minWidth: 0 }}>
                <BlogCard item={b} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              variant="text"
              endIcon={<ArrowRightAltIcon />}
              sx={{
                fontWeight: 700,
                color: "#0B1220",
                textTransform: "none",
                fontSize: 16,
                "&:hover": { bgcolor: "transparent", opacity: 0.9 },
              }}
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
        <Container maxWidth={false} sx={sectionContainerSx}>
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontSize: { xs: 28, md: 35 },
              fontWeight: 600,
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

            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                borderRadius: 999,
                px: 3,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Get Free Quote
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
