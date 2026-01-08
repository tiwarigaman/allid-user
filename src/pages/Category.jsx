// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Paper,
  TextField,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomTourCTA from "../components/CustomTourCTA";
import subBanner from "../assets/sub-banner.webp";

import { useNavigate, Link as RouterLink } from "react-router-dom";
import { getPublicTourCategoriesPage } from "../api/publicCategories";

const ACCENT = "#ff6b6b";

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
            bgcolor: "#b30000",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
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

  // first page load
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
        setAllCategories(items); // ✅ used by sidebar list
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

  // View more
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
      setAllCategories((prev) => [...prev, ...items]); // ✅ sidebar gets full list too
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

      {/* ✅ 2 Column Layout */}
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
          {/* LEFT: Category cards */}
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

          {/* RIGHT: Sidebar */}
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
