import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { categories } from "../data/dummy";

export default function Header() {
  const [openCat, setOpenCat] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkColor = scrolled ? "#0F172A" : "rgba(255,255,255,0.92)";
  const subColor = scrolled ? "rgba(15,23,42,0.55)" : "rgba(255,255,255,0.72)";
  const hoverColor = scrolled ? "#2563EB" : "#FFFFFF";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(15,23,42,0.06)" : "1px solid transparent",
        transition: "all 220ms ease",
      }}
    >
      <Toolbar sx={{ minHeight: 78 }}>
        <Container
          maxWidth={false}
          className="wrap"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {/* Logo */}
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                bgcolor: scrolled ? "#0F172A" : "rgba(0,0,0,0.35)",
                display: "grid",
                placeItems: "center",
                transition: "all 220ms ease",
              }}
            >
              <Box
                component="img"
                alt="All India Destination"
                src="https://dummyimage.com/80x80/000/fff.png&text=AID"
                sx={{ width: 28, height: 28, borderRadius: 1 }}
              />
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 900, lineHeight: 1.1, color: linkColor }}>
                All India Destination
              </Typography>
              <Typography variant="body2" sx={{ color: subColor }}>
                Discover Incredible India
              </Typography>
            </Box>
          </Stack>

          {/* Nav */}
          <Stack direction="row" spacing={3} alignItems="center" sx={{ position: "relative" }}>
            <NavItem label="Home" color={linkColor} hover={hoverColor} />
            <NavItem label="All Tours" color={linkColor} hover={hoverColor} />

            {/* Categories Hover */}
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
              >
                <Typography sx={{ fontWeight: 800, color: linkColor }}>Categories</Typography>
                <KeyboardArrowDownIcon fontSize="small" sx={{ color: linkColor }} />
              </Stack>

              {openCat && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    left: -10,
                    width: 280,
                    p: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(15,23,42,0.18)",
                  }}
                >
                  {categories.slice(0, 6).map((c) => (
                    <MenuItem key={c.id} sx={{ borderRadius: 2, fontWeight: 700, py: 1.2 }}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Paper>
              )}
            </Box>

            <NavItem label="Blogs" color={linkColor} hover={hoverColor} />
            <NavItem label="Contact" color={linkColor} hover={hoverColor} />

            <Button
              variant="contained"
              startIcon={<CallIcon />}
              sx={{
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656" },
                boxShadow: "0 10px 26px rgba(255,107,107,0.32)",
              }}
            >
              Enquire Now
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

function NavItem({ label, color, hover }) {
  return (
    <Typography
      sx={{
        fontWeight: 800,
        color,
        cursor: "pointer",
        transition: "color 200ms ease",
        "&:hover": { color: hover },
      }}
    >
      {label}
    </Typography>
  );
}
