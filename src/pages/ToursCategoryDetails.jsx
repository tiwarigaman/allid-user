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
} from "@mui/material";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import toursBanner from "../assets/sub-banner.webp";

// public APIs
import {
  getPublicToursByCategoryPage,
} from "../api/publicTours";
import { getPublicTourCategories } from "../api/publicCategories";

const ACCENT = "#ff6b6b";

/* ---------- Re-use the same Tour Card style as Tours.jsx ---------- */

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
          {desc}
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

        <Divider
          sx={{
            my: 1.75,
            borderColor: "rgba(15, 23, 42, 0.08)",
          }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(15, 23, 42, 0.70)" }}
          >
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

/* ----------------- Category Details Page ----------------- */

export default function ToursCategoryDetails() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);

  const [tours, setTours] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingTours, setLoadingTours] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [notFound, setNotFound] = useState(false);

  // 1) Resolve slug → category object (using publicCategories API)
  useEffect(() => {
    let active = true;

    async function loadCategory() {
      setLoadingCategory(true);
      setNotFound(false);
      setCategory(null);
      setCategoryId(null);
      setTours([]);
      setLastDoc(null);
      setHasMore(true);

      try {
        const cats = await getPublicTourCategories(); // returns all active tour categories
        if (!active) return;

        const match =
          cats.find((c) => c.slug === slug) ||
          cats.find((c) => c.id === slug);

        if (!match) {
          setNotFound(true);
          setLoadingCategory(false);
          return;
        }

        setCategory(match);
        setCategoryId(match.id);
        setLoadingCategory(false);
      } catch (err) {
        console.error("Error loading category:", err);
        if (!active) return;
        setNotFound(true);
        setLoadingCategory(false);
      }
    }

    loadCategory();
    return () => {
      active = false;
    };
  }, [slug]);

  // 2) Once we know categoryId → load first page of tours in this category
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

  // 3) “View More Tours” pagination
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

  const heroImage = category?.imageUrl || toursBanner;
  const title = category?.name || (notFound ? "Category Not Found" : "Loading…");

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* Hero with breadcrumb */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 220, md: 280 },
          overflow: "hidden",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.82) 100%)",
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
          <Box sx={{ color: "#fff" }}>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                color: "rgba(255,255,255,0.80)",
                mb: 1,
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
              >
                Home
              </MuiLink>
              <MuiLink
                component={RouterLink}
                underline="hover"
                color="inherit"
                to="/category"
              >
                Categories
              </MuiLink>
              <Typography color="inherit">
                {category?.name || "Category"}
              </Typography>
            </Breadcrumbs>

            <Typography
              sx={{
                fontWeight: 800,
                letterSpacing: -0.8,
                fontSize: { xs: 26, sm: 32, md: 40 },
                lineHeight: 1.05,
              }}
            >
              {title}
            </Typography>

            {category?.description && (
              <Typography
                sx={{
                  mt: 1,
                  maxWidth: 620,
                  fontSize: { xs: 13.5, sm: 15 },
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {category.description}
              </Typography>
            )}
          </Box>
        </Container>
      </Box>

      {/* Tours list */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {notFound ? (
          <Typography
            sx={{ textAlign: "center", mt: 4, color: "rgba(15,23,42,0.7)" }}
          >
            We couldn&apos;t find this category. Please check the URL or explore
            other tours.
          </Typography>
        ) : (
          <>
            <Typography
              sx={{
                fontWeight: 500,
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
                  md: "repeat(3, minmax(0, 1fr))",
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

            {/* Pagination button */}
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
                    fontWeight: 500,
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
          </>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
