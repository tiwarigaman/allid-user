// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomTourCTA from "../components/CustomTourCTA";
import TripPlanSidebar from "../components/TripPlanSidebar";
import subBanner from "../assets/sub-banner.webp";

import { useNavigate } from "react-router-dom";
import { getPublicTourCategoriesPage } from "../api/publicCategories";

const ACCENT = "#ff6b6b";

/* ----------------- Category Card ----------------- */

function CategoryCard({ category }) {
  const navigate = useNavigate();

  const image =
    category.imageUrl ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=70";

  const toursAvailable =
    typeof category.itemCount === "number"
      ? `${category.itemCount} Tours Available`
      : "Tours Available";

  const handleExplore = () => {
    const slugOrId = category.slug || category.id;
    if (!slugOrId) return;
    navigate(`/tours?category=${encodeURIComponent(String(slugOrId))}`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(15,23,42,0.06)",
        backgroundColor: "#fff",
        boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
      }}
    >
      <Box sx={{ position: "relative", height: 220, overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: "center",
            transition: "transform 220ms ease",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.88) 100%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 18,
            left: 18,
            width: 40,
            height: 40,
            borderRadius: "999px",
            backgroundColor: "rgba(15,23,42,0.72)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 20, color: "#fff" }} />
        </Box>

        <Box sx={{ position: "absolute", left: 20, right: 20, bottom: 18 }}>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              mb: 0.5,
            }}
          >
            {category.name || "Category Name"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.86)", fontWeight: 500 }}
          >
            {toursAvailable}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ p: 2.75 }}>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(15,23,42,0.72)",
            mb: 2.5,
            minHeight: 60,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {category.description || ""}
        </Typography>

        <Button
          size="small"
          color="error"
          endIcon={<span style={{ fontSize: 18 }}>→</span>}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            fontSize: 14,
            "& .MuiButton-endIcon": { ml: 0.5 },
          }}
          onClick={handleExplore}
        >
          Explore Tours
        </Button>
      </CardContent>
    </Card>
  );
}

/* ----------------- Page ----------------- */

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadFirst() {
      setLoading(true);
      try {
        const { items, lastDoc: cursor, hasMore } =
          await getPublicTourCategoriesPage({
            pageSize: 6,
          });

        if (!active) return;

        setCategories(items);
        setAllCategories(items);
        setLastDoc(cursor);
        setHasMore(hasMore);
      } catch (err) {
        console.error("Error loading public tour categories:", err);
        if (!active) return;
        setCategories([]);
        setAllCategories([]);
        setLastDoc(null);
        setHasMore(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFirst();
    return () => {
      active = false;
    };
  }, []);

  const handleViewMore = async () => {
    if (loadingMore || !hasMore || !lastDoc) return;

    setLoadingMore(true);
    try {
      const { items, lastDoc: cursor, hasMore: more } =
        await getPublicTourCategoriesPage({
          pageSize: 6,
          lastDoc,
        });

      setCategories((prev) => [...prev, ...items]);
      setAllCategories((prev) => [...prev, ...items]);
      setLastDoc(cursor);
      setHasMore(more);
    } catch (err) {
      console.error("Error loading more categories:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 240, md: 375 },
          overflow: "hidden",
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
          backgroundImage: `url(${subBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.80) 100%)",
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
            zIndex: 1,
          }}
        >
          <Box sx={{ maxWidth: 780, px: 2 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                letterSpacing: -0.8,
                mb: 1,
                fontSize: { xs: 26, sm: 32, md: 40 },
                lineHeight: 1.04,
              }}
            >
              Explore Tour Categories
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.86)",
                fontSize: { xs: 13.5, sm: 15, md: 17 },
              }}
            >
              Discover amazing destinations across India. From thrilling
              adventures to peaceful spiritual journeys, find the perfect tour
              category that matches your travel dreams.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* 2 Column Layout */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
          {/* LEFT */}
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                display: "grid",
                gap: 3.5,
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(2, minmax(0, 1fr))",
                },
              }}
            >
              {!loading &&
                categories.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} />
                ))}
            </Box>

            {!loading && categories.length === 0 && (
              <Typography
                sx={{
                  textAlign: "center",
                  mt: 6,
                  color: "rgba(15,23,42,0.6)",
                }}
              >
                No tour categories found. Please check back soon.
              </Typography>
            )}

            {!loading && hasMore && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    px: 3.5,
                    py: 1.2,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: ACCENT,
                    boxShadow: "0 16px 40px rgba(255,107,107,0.45)",
                    "&:hover": { backgroundColor: "#ff5252" },
                  }}
                  onClick={handleViewMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? "Loading..." : "View More Categories"}
                </Button>
              </Box>
            )}
          </Box>

          {/* RIGHT */}
          <Box>
            <TripPlanSidebar categories={allCategories} />
          </Box>
        </Box>
      </Container>

      <CustomTourCTA />
      <Footer />
    </Box>
  );
}
