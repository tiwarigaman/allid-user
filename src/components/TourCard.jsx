import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useNavigate } from "react-router-dom";

export default function TourCard({ item }) {
  const nav = useNavigate();

  const title = item?.title || item?.name || "Tour Title";
  const slug =
    item?.slug || (title || "").toLowerCase().trim().replace(/\s+/g, "-");

  const img =
    item?.ogImage ||
    item?.featureImage ||
    item?.image ||
    item?.imageUrl ||
    item?.cover ||
    "https://images.unsplash.com/photo-1526779259212-756e0e6d79a2?auto=format&fit=crop&w=1400&q=70";

  const category = item?.categoryName || item?.category || "Cultural Heritage";
  const location = item?.location || item?.route || "Delhi, Agra, Jaipur";

  const desc =
    item?.shortDesc ||
    item?.description ||
    "Experience the magnificent Golden Triangle circuit covering Delhi's historical monument...";

  const duration =
    item?.duration ||
    (item?.days && item?.nights
      ? `${item.days} Days ${item.nights} Nights`
      : "6 Days 5 Nights");

  const maxPeople = item?.maxPeople || item?.groupSize || item?.max || 15;

  const bestSeason =
    item?.bestSeason ||
    item?.season ||
    item?.best_time ||
    item?.bestTime ||
    "October to March";

  const onView = () => nav(`/tour/${slug}`);

  const onPricing = (e) => {
    e.stopPropagation();
    nav("/contact");
  };

  const onViewDetails = (e) => {
    e.stopPropagation();
    nav(`/tour/${slug}`);
  };

  return (
    <Paper
      onClick={onView}
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#fff",
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 45px rgba(15,23,42,0.14)",
        },
      }}
    >
      {/* IMAGE AREA */}
      <Box sx={{ p: 2.2 }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: 2.5,
            overflow: "hidden",
            height: { xs: 240, sm: 260, md: 280 },
            bgcolor: "#0B1220",
          }}
        >
          <Box
            component="img"
            src={img}
            alt={title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scale(1)",
              transition: "transform 350ms ease",
              ".MuiPaper-root:hover &": { transform: "scale(1.04)" },
            }}
          />

          {/* TOP PILLS */}
          <Box
            sx={{
              position: "absolute",
              left: 14,
              top: 14,
              right: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                px: 1.4,
                py: 0.7,
                borderRadius: 1.2,
                bgcolor: "rgba(15,23,42,0.78)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 12,
                lineHeight: 1,
                boxShadow: "0 10px 20px rgba(0,0,0,0.18)",
                border: "1px solid rgba(255,255,255,0.15)",
                maxWidth: "60%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {category}
            </Box>

            <Button
              onClick={onPricing}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656" },
                borderRadius: 999,
                px: 2,
                py: 0.75,
                fontWeight: 700,
                textTransform: "none",
                fontSize: 12,
                lineHeight: 1,
                boxShadow: "0 12px 26px rgba(255,107,107,0.35)",
              }}
            >
              Contact for Pricing
            </Button>
          </Box>
        </Box>

        {/* CONTENT */}
        <Box sx={{ px: 0.4, pt: 2.1, pb: 0.6 }}>
          {/* location */}
          <Stack direction="row" spacing={0.8} alignItems="center">
            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#64748B" }} />
            <Typography
              sx={{
                color: "#64748B",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "ui-sans-serif,system-ui,sans-serif",
              }}
            >
              {location}
            </Typography>
          </Stack>

          {/* title */}
          <Typography
            sx={{
              mt: 1,
              fontSize: 22,
              fontWeight: 600,
              color: "#0F172A",
              letterSpacing: "-0.01em",
              fontFamily: "ui-sans-serif,system-ui,sans-serif",
            }}
          >
            {title}
          </Typography>

          {/* desc */}
          <Typography
            sx={{
              mt: 1,
              color: "#475569",
              fontSize: 14.5,
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 46,
              fontFamily: "ui-sans-serif,system-ui,sans-serif",
            }}
          >
            {desc}
          </Typography>

          {/* duration + max */}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              mt: 2,
              pt: 1.6,
              borderTop: "1px solid rgba(15,23,42,0.06)",
            }}
          >
            <Stack direction="row" spacing={0.9} alignItems="center">
              <AccessTimeOutlinedIcon
                sx={{ fontSize: 18, color: "rgba(15,23,42,0.55)" }}
              />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(15,23,42,0.55)",
                  fontFamily: "ui-sans-serif,system-ui,sans-serif",
                }}
              >
                {duration}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.9} alignItems="center">
              <GroupOutlinedIcon
                sx={{ fontSize: 18, color: "rgba(15,23,42,0.55)" }}
              />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(15,23,42,0.55)",
                  fontFamily: "ui-sans-serif,system-ui,sans-serif",
                }}
              >
                Max {maxPeople}
              </Typography>
            </Stack>
          </Stack>

          {/* BEST SEASON + VIEW DETAILS (NEW like screenshot) */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid rgba(15,23,42,0.06)",
            }}
          >
            <Typography
              sx={{
                color: "rgba(15,23,42,0.55)",
                fontSize: 12.5,
                fontWeight: 600,
                fontFamily: "ui-sans-serif,system-ui,sans-serif",
              }}
            >
              Best Season:{" "}
              <Box component="span" sx={{ color: "rgba(15,23,42,0.72)" }}>
                {bestSeason}
              </Box>
            </Typography>

            <Button
              onClick={onViewDetails}
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656" },
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                px: 2.3,
                py: 0.9,
                fontSize: 12.5,
                boxShadow: "0 12px 26px rgba(255,107,107,0.25)",
              }}
            >
              View Details
            </Button>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}
