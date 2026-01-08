// src/pages/ToursCategoryDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  Paper,
  TextField,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomTourCTA from "../components/CustomTourCTA";

import toursBanner from "../assets/sub-banner.webp";

// public APIs (LOGIC SAME)
import { getPublicToursByCategoryPage } from "../api/publicTours";
import { getPublicTourCategories } from "../api/publicCategories";

const ACCENT = "#ff6b6b";

/* ---------- Tour Card ---------- */

function TourCard({ tour }) {
  const navigate = useNavigate();

  const image =
    tour.image ||
    tour.featureImageUrl ||
    (Array.isArray(tour.imageUrls) && tour.imageUrls[0]) ||
    "https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1200&q=70";

  const desc = tour.desc || tour.description || "";
  const peopleText =
    tour.people || (tour.maxGroupSize ? `Max ${tour.maxGroupSize}` : "—");
  const categoryLabel = tour.category || tour.categoryName || "Category";

  const handleViewDetails = () => {
    const slugOrId = tour.slug || tour.id;
    if (!slugOrId) return;
    navigate(`/tour/${slugOrId}`);
  };

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
      {/* ✅ Card image only (NO banner inside card) */}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            height: 220,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Chip
          label={categoryLabel}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            bgcolor: "rgba(15, 23, 42, 0.78)",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 999,
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
            fontWeight: 700,
            borderRadius: 999,
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
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {tour.location || "—"}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            lineHeight: 1.18,
            mb: 1,
            color: "#0f172a",
            fontSize: 18,
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
          {desc}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "rgba(15, 23, 42, 0.70)",
            mb: 1.75,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "#0f172a" }}
            >
              {tour.duration || "—"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              ml: "auto",
            }}
          >
            <GroupOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "#0f172a" }}
            >
              {peopleText}
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
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

/* ----------------- Right Sidebar Form + Categories ----------------- */

function TripPlanSidebar({ categories }) {
  const [form, setForm] = useState({
    arrivalDate: "",
    days: "",
    adults: "",
    children: "",
    accommodation: "",
    info: "",
    name: "",
    email: "",
    country: "",
    phone: "",
  });

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    // UI only
  };

  return (
    <Box
      sx={{
        position: { lg: "sticky" },
        top: { lg: 92 },
      }}
    >
      {/* Form */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(15,23,42,0.10)",
          boxShadow: "0 12px 26px rgba(15,23,42,0.06)",
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.2,
            bgcolor: "#111827",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
            Plan Your Trip Now
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit} sx={{ p: 2, bgcolor: "#f3edde" }}>
          <TextField
            fullWidth
            type="date"
            value={form.arrivalDate}
            onChange={(e) => update("arrivalDate", e.target.value)}
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
            InputLabelProps={{ shrink: true }}
            label="Date of Arrival"
          />

          <TextField
            fullWidth
            select
            value={form.days}
            onChange={(e) => update("days", e.target.value)}
            label="No. of Days"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          >
            {["1-3", "4-6", "7-10", "10+"].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            value={form.adults}
            onChange={(e) => update("adults", e.target.value)}
            label="Adults"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((v) => (
              <MenuItem key={v} value={String(v)}>
                {v}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            value={form.children}
            onChange={(e) => update("children", e.target.value)}
            label="Childrens (5-12 Yr)"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((v) => (
              <MenuItem key={v} value={String(v)}>
                {v}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            value={form.accommodation}
            onChange={(e) => update("accommodation", e.target.value)}
            label="Select Accommodation"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          >
            {["Budget", "3 Star", "4 Star", "5 Star", "Luxury"].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            minRows={4}
            value={form.info}
            onChange={(e) => update("info", e.target.value)}
            label="Additional Information"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          />

          <TextField
            fullWidth
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            label="Name"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          />

          <TextField
            fullWidth
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            label="Email"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          />

          <TextField
            fullWidth
            select
            value={form.country}
            onChange={(e) => update("country", e.target.value)}
            label="Country of Residence"
            sx={{
              mb: 1.5,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          >
            {["India", "United Kingdom", "United States", "Canada", "Australia", "Other"].map(
              (v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            fullWidth
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            label="Contact Number"
            sx={{
              mb: 1.75,
              bgcolor: "#fff",
              "& .MuiOutlinedInput-root": { borderRadius: 1 },
            }}
          />

          <Button
            type="submit"
            fullWidth
            startIcon={<MailOutlineRoundedIcon />}
            sx={{
              bgcolor: "#F97316",
              color: "#fff",
              borderRadius: 1,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#ea6a10" },
              boxShadow: "0 12px 26px rgba(249,115,22,0.30)",
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>

      {/* Category list */}
      <Paper
        elevation={0}
        sx={{
          mt: 2.5,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(15,23,42,0.10)",
          boxShadow: "0 12px 26px rgba(15,23,42,0.06)",
          bgcolor: "#fff",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1.2,
            bgcolor: "#ff5656",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
            Tours Packages
          </Typography>
        </Box>

        <List disablePadding>
          {(categories || []).map((c, idx) => {
            const to = c.slug ? `/category/${c.slug}` : `/category/${c.id}`;
            return (
              <React.Fragment key={c.id || c.slug || idx}>
                <ListItemButton
                  component={RouterLink}
                  to={to}
                  sx={{
                    py: 1.1,
                    "&:hover": { bgcolor: "rgba(15,23,42,0.04)" },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={{ fontWeight: 500, color: "#0f172a" }}>
                        {c.name || "Category"}
                      </Typography>
                    }
                  />
                </ListItemButton>
                <Divider sx={{ borderColor: "rgba(15,23,42,0.08)" }} />
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}

/* ----------------- Page ----------------- */

export default function ToursCategoryDetails() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const [tours, setTours] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [notFound, setNotFound] = useState(false);

  // categories for sidebar (dynamic)
  const [allCategories, setAllCategories] = useState([]);

  // 1) Resolve slug → category object (LOGIC SAME)
  useEffect(() => {
    let active = true;

    async function loadCategory() {
      setNotFound(false);
      setCategory(null);
      setCategoryId(null);
      setTours([]);
      setLastDoc(null);
      setHasMore(true);

      try {
        const cats = await getPublicTourCategories();
        if (!active) return;

        setAllCategories(cats || []);

        const match =
          cats.find((c) => c.slug === slug) || cats.find((c) => c.id === slug);

        if (!match) {
          setNotFound(true);
          return;
        }

        setCategory(match);
        setCategoryId(match.id);
      } catch (err) {
        console.error("Error loading category:", err);
        if (!active) return;
        setNotFound(true);
      }
    }

    loadCategory();
    return () => {
      active = false;
    };
  }, [slug]);

  // 2) Load first page tours (LOGIC SAME)
  useEffect(() => {
    if (!categoryId) {
      setLoadingTours(false);
      return;
    }

    let active = true;

    async function loadFirstTours() {
      setLoadingTours(true);

      try {
        const { items, lastDoc: cursor, hasMore } =
          await getPublicToursByCategoryPage({
            categoryId,
            pageSize: 9,
          });

        if (!active) return;

        setTours(items);
        setLastDoc(cursor);
        setHasMore(hasMore);
      } catch (err) {
        console.error("Error loading tours by category:", err);
        if (!active) return;
        setTours([]);
        setLastDoc(null);
        setHasMore(false);
      } finally {
        if (active) setLoadingTours(false);
      }
    }

    loadFirstTours();
    return () => {
      active = false;
    };
  }, [categoryId]);

  // 3) Load more (LOGIC SAME)
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || !lastDoc || !categoryId) return;

    setLoadingMore(true);
    try {
      const { items, lastDoc: cursor, hasMore: more } =
        await getPublicToursByCategoryPage({
          categoryId,
          pageSize: 9,
          lastDoc,
        });

      setTours((prev) => [...prev, ...items]);
      setLastDoc(cursor);
      setHasMore(more);
    } catch (err) {
      console.error("Error loading more tours:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // ✅ FIX: hero image must be defined (your code was missing this)
  // const heroImage = category?.imageUrl || toursBanner;

  const title =
    category?.name || (notFound ? "Category Not Found" : "Loading…");

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* ✅ Banner (ONLY HERE) */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 240, sm: 280, md: 375 },
          overflow: "hidden",
          borderBottom: "1px solid rgba(15, 23, 42, 0.10)",
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
              "linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.78) 70%, rgba(15,23,42,0.86) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(800px 380px at 50% 45%, rgba(37,99,235,0.20) 0%, rgba(0,0,0,0) 60%)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              color: "#fff",
              px: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
                fontSize: { xs: 34, sm: 44, md: 56 },
                lineHeight: 1.05,
                textShadow: "0 14px 40px rgba(0,0,0,0.55)",
              }}
            >
              {title}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2.5 }}>
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  color: "rgba(255,255,255,0.80)",
                  "& .MuiBreadcrumbs-separator": {
                    color: "rgba(255,255,255,0.65)",
                  },
                }}
              >
                <MuiLink
                  component={RouterLink}
                  underline="hover"
                  color="inherit"
                  to="/"
                  sx={{ fontWeight: 500 }}
                >
                  Home
                </MuiLink>
                <MuiLink
                  component={RouterLink}
                  underline="hover"
                  color="inherit"
                  to="/category"
                  sx={{ fontWeight: 500 }}
                >
                  Categories
                </MuiLink>
                <Typography color="inherit" sx={{ fontWeight: 500 }}>
                  {category?.name || "Category"}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ✅ Layout */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {notFound ? (
          <Typography
            sx={{ textAlign: "center", mt: 4, color: "rgba(15,23,42,0.7)" }}
          >
            We couldn&apos;t find this category. Please check the URL or explore
            other tours.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 3,
              alignItems: "start",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 1fr) 380px",
              },
            }}
          >
            {/* LEFT: Tours */}
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#0f172a",
                  mb: 3,
                  fontSize: { xs: 18, md: 22 },
                }}
              >
                {loadingTours
                  ? "Loading tours..."
                  : `${tours.length} Tours Found in this Category`}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                  },
                }}
              >
                {!loadingTours &&
                  tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
              </Box>

              {!loadingTours && tours.length === 0 && (
                <Typography
                  sx={{
                    textAlign: "center",
                    mt: 4,
                    color: "rgba(15,23,42,0.65)",
                  }}
                >
                  No tours are currently listed under this category.
                </Typography>
              )}

              {!loadingTours && hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                  <Button
                    variant="contained"
                    disableElevation
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      bgcolor: ACCENT,
                      borderRadius: 999,
                      textTransform: "none",
                      fontWeight: 700,
                      px: 3,
                      py: 1.25,
                      boxShadow: "0 12px 26px rgba(255, 107, 107, 0.35)",
                      "&:hover": { bgcolor: "#ff5252" },
                    }}
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading..." : "View More Tours"}
                  </Button>
                </Box>
              )}
            </Box>

            {/* RIGHT: Sidebar */}
            <Box>
              <TripPlanSidebar categories={allCategories} />
            </Box>
          </Box>
        )}
      </Container>

      <CustomTourCTA />
      <Footer />
    </Box>
  );
}
