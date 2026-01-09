// src/pages/Tours.jsx
import React, { useEffect, useMemo, useState } from "react";
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

import Header from "../components/Header";
import Footer from "../components/Footer";

import toursBanner from "../assets/sub-banner.webp";

// 🔹 public APIs (read-only)
import {
  getPublicToursPage,
  getPublicToursByCategoryPage,
} from "../api/publicTours";
import { getPublicTourCategories } from "../api/publicCategories";

// ✅ navigation + query params
import { useNavigate, useSearchParams } from "react-router-dom";

const ACCENT = "#ff6b6b";

// keep sort list same
const sortList = [
  "Most Popular",
  "Newest",
  "Alphabetical",
  "Duration: Low to High",
  "Duration: High to Low",
];

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

export default function Tours() {
  // ✅ URL query params
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "all"; // now treated as slug
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "Most Popular";

  // 🔹 data from Firestore (paginated)
  const [tours, setTours] = useState([]);
  const [categories, setCategories] = useState([]);

  // pagination state
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // 🔹 UI controls (initialised from URL)
  // category = slug (or "all")
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);

  // 🔁 whenever filters change, sync them to URL
  useEffect(() => {
    const params = {};

    if (category && category !== "all") {
      // store slug in URL
      params.category = category;
    }
    if (search.trim()) {
      params.q = search.trim();
    }
    if (sort && sort !== "Most Popular") {
      params.sort = sort;
    }

    setSearchParams(params, { replace: true });
  }, [category, search, sort, setSearchParams]);

  // ---- load categories once ----
  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const cats = await getPublicTourCategories();
        if (!active) return;
        setCategories(cats);
      } catch (err) {
        console.error("Error loading public tour categories:", err);
      }
    }

    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  // 🔹 map slug → Firestore categoryId
  const activeCategoryId = useMemo(() => {
    if (category === "all") return null;
    if (!categories || !categories.length) return null;

    const match = categories.find(
      (c) => c.slug === category || c.id === category
    );
    return match ? match.id : null;
  }, [category, categories]);

  // ---- load first page of tours whenever category/slug changes ----
  useEffect(() => {
    let active = true;

    async function loadFirstPage() {
      setLoading(true);
      setTours([]);
      setLastDoc(null);
      setHasMore(true);

      try {
        let result;

        if (category === "all" || !activeCategoryId) {
          // all published tours, page 1
          result = await getPublicToursPage({ pageSize: 9 });
        } else {
          // category-wise published tours, page 1 (by id)
          result = await getPublicToursByCategoryPage({
            pageSize: 9,
            categoryId: activeCategoryId,
          });
        }

        const { items, lastDoc: newLastDoc, hasMore: more } = result;

        if (!active) return;
        setTours(items);
        setLastDoc(newLastDoc);
        setHasMore(more);
      } catch (err) {
        console.error("Error loading public tours page:", err);
        if (!active) return;
        setTours([]);
        setLastDoc(null);
        setHasMore(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFirstPage();
    return () => {
      active = false;
    };
  }, [category, activeCategoryId]);

  // "View More" → next page from Firestore
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore || !lastDoc) return;

    setLoadingMore(true);
    try {
      let result;

      if (category === "all" || !activeCategoryId) {
        result = await getPublicToursPage({
          pageSize: 9,
          lastDoc,
        });
      } else {
        result = await getPublicToursByCategoryPage({
          pageSize: 9,
          categoryId: activeCategoryId,
          lastDoc,
        });
      }

      const { items, lastDoc: newLastDoc, hasMore: more } = result;

      setTours((prev) => [...prev, ...items]);
      setLastDoc(newLastDoc);
      setHasMore(more);
    } catch (err) {
      console.error("Error loading more tours:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // build category options (All + Firestore categories)
  const categoryOptions = useMemo(() => {
    const base = [
      { label: "All Categories", value: "all" },
      ...(categories || []).map((c) => ({
        label: c.name || "Category",
        // 🔹 use slug for value (and URL), fallback to id if slug missing
        value: c.slug || c.id,
      })),
    ];
    return base;
  }, [categories]);

  // search + sort on the currently loaded tours
  const filtered = useMemo(() => {
    let list = [...tours];

    // search by title/location/categoryName (client-side)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((t) => {
        const title = (t.title || "").toLowerCase();
        const loc = (t.location || "").toLowerCase();
        const catName = (t.categoryName || "").toLowerCase();
        return (
          title.includes(q) || loc.includes(q) || catName.includes(q)
        );
      });
    }

    // sort
    if (sort === "Newest") list = [...list].reverse();
    if (sort === "Alphabetical")
      list = [...list].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );

    const parseDays = (str) => {
      const m = String(str || "").match(/(\d+)\s*Days?/i);
      return m ? Number(m[1]) : 999;
    };

    if (sort === "Duration: Low to High")
      list = [...list].sort(
        (a, b) => parseDays(a.duration) - parseDays(b.duration)
      );
    if (sort === "Duration: High to Low")
      list = [...list].sort(
        (a, b) => parseDays(b.duration) - parseDays(a.duration)
      );

    return list;
  }, [search, sort, tours]);

  return (
    <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh" }}>
      <Header />

      {/* Hero */}
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
              Discover amazing destinations across India with our
              curated tour packages
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Search strip */}
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
              gridTemplateColumns: {
                xs: "1fr",
                md: "1.8fr 0.55fr 0.55fr",
              },
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
                    <SearchRoundedIcon
                      sx={{ color: "rgba(15, 23, 42, 0.55)" }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 0 }}>
                    <IconButton
                      sx={{
                        bgcolor: ACCENT,
                        color: "#fff",
                        borderRadius: 2,
                        width: 54,
                        height: 44,
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
                  height: 45,
                  borderRadius: 2.25,
                  bgcolor: "#fff",
                  pr: 0,
                  "& .MuiInputAdornment-positionEnd": {
                    marginRight: 0,
                  },
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
                {categoryOptions.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
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
                  height: 44,
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
          {loading ? "Loading tours..." : `${filtered.length} Tours Found`}
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
          {!loading &&
            filtered.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </Box>

        {/* Pagination button */}
        {!loading && hasMore && (
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
              {loadingMore ? "Loading..." : "View More"}
            </Button>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
