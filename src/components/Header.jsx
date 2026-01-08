import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { categories } from "../data/dummy"; // ❌ no dummy now
import { getPublicTourCategories } from "../api/publicCategories"; // ✅ real tour categories

export default function Header() {
  const navigate = useNavigate();

  const [openCat, setOpenCat] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState(false);

  // real categories (tour type only)
  const [tourCategories, setTourCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catLoaded, setCatLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled ? "#0F172A" : "rgba(255,255,255,0.92)";
  const subColor = scrolled ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.72)";
  const hoverColor = scrolled ? "#2563EB" : "#FFFFFF";

  const go = (to) => {
    setOpenCat(false);
    setMobileCat(false);
    setMobileOpen(false);
    navigate(to);
  };

  const goCategory = (c) => {
    const key = c?.slug ?? c?.id ?? c?.name;
    go(`/category/${encodeURIComponent(String(key))}`);
  };

  const loadTourCategories = useCallback(async () => {
    if (catLoaded || catLoading) return;
    try {
      setCatLoading(true);
      const list = await getPublicTourCategories(); // only type = "tour"
      setTourCategories(list);
      setCatLoaded(true);
    } catch (err) {
      console.error("Error loading public tour categories:", err);
    } finally {
      setCatLoading(false);
    }
  }, [catLoaded, catLoading]);

  useEffect(() => {
    if (openCat) loadTourCategories();
  }, [openCat, loadTourCategories]);

  useEffect(() => {
    if (mobileCat) loadTourCategories();
  }, [mobileCat, loadTourCategories]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(15,23,42,0.06)"
            : "1px solid transparent",
          transition: "all 220ms ease",
        }}
      >
        <Toolbar sx={{ minHeight: 78 }}>
          <Container
            maxWidth={false}
            className="wrap"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* LOGO */}
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
              <Box
                onClick={() => go("/")}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: scrolled ? "#0F172A" : "rgba(0,0,0,0.35)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src="https://dummyimage.com/80x80/000/fff.png&text=AID"
                  alt="All India Destination"
                  sx={{ width: 28, height: 28, borderRadius: 1 }}
                />
              </Box>

              <Box sx={{ cursor: "pointer" }} onClick={() => go("/")}>
                <Typography sx={{ fontWeight: 900, color: linkColor }}>
                  All India Destination
                </Typography>
                <Typography variant="body2" sx={{ color: subColor }}>
                  Discover Incredible India
                </Typography>
              </Box>
            </Stack>

            {/* DESKTOP NAV */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" }, position: "relative" }}
            >
              <NavItem label="Home" to="/" color={linkColor} hover={hoverColor} />
              <NavItem
                label="All Tours"
                to="/tours"
                color={linkColor}
                hover={hoverColor}
              />

              {/* Categories (hover desktop) */}
              <Box
                onMouseEnter={() => setOpenCat(true)}
                onMouseLeave={() => setOpenCat(false)}
                sx={{ position: "relative" }}
              >
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                  onClick={() => go("/category")}
                >
                  <Typography sx={{ fontWeight: 500, color: linkColor }}>
                    Categories
                  </Typography>
                  <KeyboardArrowDownIcon fontSize="small" sx={{ color: linkColor }} />
                </Stack>

                {openCat && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%", // ✅ no gap → no flicker
                      left: -10,
                      width: 280,
                      p: 1,
                      borderRadius: 2,
                      boxShadow: "0 20px 50px rgba(15,23,42,0.18)",
                    }}
                  >
                    {catLoading && !tourCategories.length && (
                      <MenuItem disabled sx={{ fontWeight: 500 }}>
                        Loading...
                      </MenuItem>
                    )}

                    {!catLoading && tourCategories.length === 0 && (
                      <MenuItem disabled sx={{ fontWeight: 500 }}>
                        No categories found
                      </MenuItem>
                    )}

                    {tourCategories.map((c) => (
                      <MenuItem
                        key={c.id}
                        onClick={() => goCategory(c)}
                        sx={{ fontWeight: 500 }} // ✅ lighter
                      >
                        {c.name}
                      </MenuItem>
                    ))}
                  </Paper>
                )}
              </Box>

              {/* <NavItem label="Blogs" to="/blogs" color={linkColor} hover={hoverColor} /> */}
              <NavItem
                label="Contact"
                to="/contact"
                color={linkColor}
                hover={hoverColor}
              />

              <Button
                variant="contained"
                startIcon={<CallIcon />}
                onClick={() => go("https://rammandirayodhyatours.com/")}
                sx={{
                  bgcolor: "#FF6B6B",
                  "&:hover": { bgcolor: "#ff5656" },
                  boxShadow: "0 10px 26px rgba(255,107,107,0.32)",
                }}
              >
                Pilgrimage Tour
              </Button>
            </Stack>

            {/* MOBILE MENU ICON */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: "flex", md: "none" }, color: linkColor }}
            >
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={900}>Menu</Typography>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <MobileItem label="Home" onClick={() => go("/")} />
            <MobileItem label="All Tours" onClick={() => go("/tours")} />

            {/* Categories tap */}
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ cursor: "pointer" }}
              >
                {/* Tap text → /category */}
                <Typography
                  fontWeight={700}
                  onClick={() => go("/category")}
                >
                  Categories
                </Typography>
                {/* Tap arrow → expand list */}
                <KeyboardArrowDownIcon
                  onClick={() => setMobileCat((v) => !v)}
                  sx={{ cursor: "pointer" }}
                />
              </Stack>

              {mobileCat && (
                <Stack sx={{ pl: 2, mt: 1 }}>
                  {catLoading && !tourCategories.length && (
                    <Typography
                      sx={{
                        py: 0.5,
                        fontWeight: 500,
                        color: "text.secondary",
                      }}
                    >
                      Loading...
                    </Typography>
                  )}

                  {!catLoading && tourCategories.length === 0 && (
                    <Typography
                      sx={{
                        py: 0.5,
                        fontWeight: 500,
                        color: "text.secondary",
                      }}
                    >
                      No categories found
                    </Typography>
                  )}

                  {tourCategories.map((c) => (
                    <Typography
                      key={c.id}
                      onClick={() => goCategory(c)}
                      sx={{
                        py: 0.5,
                        cursor: "pointer",
                        fontWeight: 500, // ✅ lighter
                      }}
                    >
                      {c.name}
                    </Typography>
                  ))}
                </Stack>
              )}
            </Box>

            {/* <MobileItem label="Blogs" onClick={() => go("/blogs")} /> */}
            <MobileItem label="Contact" onClick={() => go("/contact")} />

            <Button
              variant="contained"
              startIcon={<CallIcon />}
              onClick={() => go("https://rammandirayodhyatours.com/")}
              sx={{
                mt: 2,
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656" },
              }}
            >
              Pilgrimage Tour
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

function NavItem({ label, to, color, hover }) {
  const navigate = useNavigate();

  return (
    <Typography
      onClick={() => navigate(to)}
      sx={{
        fontWeight: 500,
        color,
        cursor: "pointer",
        "&:hover": { color: hover },
      }}
    >
      {label}
    </Typography>
  );
}

function MobileItem({ label, onClick }) {
  return (
    <Typography onClick={onClick} sx={{ fontWeight: 700, cursor: "pointer" }}>
      {label}
    </Typography>
  );
}
