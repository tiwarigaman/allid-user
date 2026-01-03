import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionTitle from "../components/SectionTitle";
import { BlogCard, CategoryCard, TourCard } from "../components/Cards";
import { blogs, categories, tours } from "../data/dummy";

// ✅ Use MORE images + mosaic layout (this is what fixes those big vertical panels)
const collage = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1600&auto=format&fit=crop", // Taj
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop", // Arch
  "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?q=80&w=1600&auto=format&fit=crop", // Temple
  "https://images.unsplash.com/photo-1463694775559-eea25626346b?q=80&w=1600&auto=format&fit=crop", // Nature
  "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop", // Mountains
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop", // Water
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop", // City
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop", // Landscape
];

const mosaic = [
  { srcIndex: 0, area: "a" },
  { srcIndex: 1, area: "b" },
  { srcIndex: 2, area: "c" },
  { srcIndex: 3, area: "d" },
  { srcIndex: 4, area: "e" },
  { srcIndex: 5, area: "f" },
  { srcIndex: 6, area: "g" },
  { srcIndex: 7, area: "h" },
];

const why = [
  {
    icon: <WorkspacePremiumOutlinedIcon />,
    title: "15+ Years Experience",
    desc: "Trusted by thousands of travelers worldwide",
  },
  {
    icon: <HeadsetMicOutlinedIcon />,
    title: "24/7 Support",
    desc: "Round-the-clock assistance for your peace of mind",
  },
  {
    icon: <VerifiedUserOutlinedIcon />,
    title: "Safe & Secure",
    desc: "Your safety is our top priority",
  },
  {
    icon: <PaidOutlinedIcon />,
    title: "Best Prices",
    desc: "Competitive rates with no hidden costs",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <Box sx={{ position: "relative", height: { xs: 560, md: 700 }, overflow: "hidden" }}>
        {/* ✅ Collage Mosaic Background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gap: "2px",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gridTemplateAreas: `
              "a a a a b b b b c c c c"
              "a a a a b b b b c c c c"
              "d d d e e e e f f f f f"
              "d d d e e e e f f f f f"
              "g g g g g h h h h h h h"
              "g g g g g h h h h h h h"
            `,
          }}
        >
          {mosaic.map((x) => (
            <Box
              key={x.area}
              sx={{
                gridArea: x.area,
                backgroundImage: `url(${collage[x.srcIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.05)",
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
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        <Container maxWidth={false} className="wrap" sx={{ position: "relative", height: "100%" }}>
          <Box sx={{ pt: { xs: 10, md: 14 }, textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontSize: { xs: 44, md: 72 },
                fontWeight: 900,
                lineHeight: 1.05,
              }}
            >
              Discover <span style={{ color: "#FF6B6B" }}>Incredible India</span>
            </Typography>

            <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.92)", fontSize: 16, maxWidth: 820, mx: "auto" }}>
              Experience the magic of India with our carefully curated tours and authentic local experiences
            </Typography>

            {/* search */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              sx={{
                mt: 6,
                mx: "auto",
                maxWidth: 900,
                bgcolor: "rgba(255,255,255,0.96)",
                borderRadius: 999,
                p: 1.2,
                boxShadow: "0 24px 70px rgba(0,0,0,0.25)",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                placeholder="Where do you want to go?"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: <PlaceIcon sx={{ mr: 1, opacity: 0.7 }} />,
                }}
                sx={{ px: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                sx={{
                  bgcolor: "#FF6B6B",
                  "&:hover": { bgcolor: "#ff5656" },
                  borderRadius: 999,
                  px: 3,
                  py: 1.3,
                  minWidth: 140,
                  boxShadow: "0 10px 24px rgba(255,107,107,0.35)",
                }}
              >
                Search
              </Button>
            </Stack>

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Button
                variant="contained"
                startIcon={<PlaceIcon />}
                sx={{
                  bgcolor: "#FF6B6B",
                  "&:hover": { bgcolor: "#ff5656" },
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                }}
              >
                Explore Tours
              </Button>
              <Button
                variant="outlined"
                startIcon={<PhoneInTalkIcon />}
                sx={{
                  borderColor: "rgba(255,255,255,0.65)",
                  color: "white",
                  "&:hover": { borderColor: "white" },
                  px: 3,
                  py: 1.2,
                  borderRadius: 2,
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* CATEGORIES */}
      <Box sx={{ py: { xs: 7, md: 9 }, bgcolor: "#F6F7FB" }}>
        <Container maxWidth={false} className="wrap">
          <SectionTitle
            title="Explore by Category"
            subtitle="Choose from our diverse range of travel experiences designed to suit every traveler's passion"
          />
          <Grid container spacing={3}>
            {categories.map((c) => (
              <Grid key={c.id} item xs={12} md={4}>
                <CategoryCard item={c} />
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
            {tours.map((t) => (
              <Grid key={t.id} item xs={12} md={4}>
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
          <Typography variant="h2" sx={{ color: "white", textAlign: "center", fontSize: { xs: 30, md: 42 }, fontWeight: 900 }}>
            Why Choose All India Destination?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", textAlign: "center", mt: 1, maxWidth: 720, mx: "auto" }}>
            We create unforgettable travel experiences with our expertise, passion, and commitment to excellence
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
                  <Typography sx={{ color: "white", fontWeight: 900, fontSize: 18 }}>{x.title}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.78)", mt: 1 }}>{x.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* BLOGS */}
      <Box sx={{ py: { xs: 7, md: 9 } }}>
        <Container maxWidth={false} className="wrap">
          <SectionTitle
            title="Travel Stories & Tips"
            subtitle="Get inspired by our latest travel stories, tips, and destination guides"
          />
          <Grid container spacing={3}>
            {blogs.map((b) => (
              <Grid key={b.id} item xs={12} md={4}>
                <BlogCard item={b} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button variant="text" endIcon={<ArrowRightAltIcon />} sx={{ fontWeight: 900 }}>
              Read More Stories
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 8, md: 10 }, background: "linear-gradient(90deg, #ff6b6b 0%, #ff8a8a 55%, #ff6b6b 100%)" }}>
        <Container maxWidth={false} className="wrap">
          <Typography variant="h2" sx={{ color: "white", textAlign: "center", fontSize: { xs: 34, md: 48 }, fontWeight: 900 }}>
            Ready for Your Next Adventure?
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", textAlign: "center", mt: 1 }}>
            Let us help you create memories that will last a lifetime. Contact our travel experts today!
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="center" sx={{ mt: 5 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
                "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                borderRadius: 999,
                px: 3,
              }}
            >
              Get Free Quote
            </Button>

            <TextField
              placeholder="Your Phone / Email"
              sx={{
                minWidth: { xs: "100%", md: 340 },
                "& .MuiOutlinedInput-root": { borderRadius: 999, bgcolor: "white" },
              }}
            />
          </Stack>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
