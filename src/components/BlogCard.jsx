import React from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ item }) {
  const nav = useNavigate();

  const title = item?.title || item?.name || "Blog Title";
  const desc =
    item?.excerpt ||
    item?.shortDesc ||
    item?.description ||
    "Get inspired with travel stories, tips, and destination guides...";

  const img =
    item?.image ||
    item?.imageUrl ||
    item?.cover ||
    item?.thumbnail ||
    "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=70";

  const dateText =
    item?.date ||
    item?.publishedAt ||
    item?.createdAt ||
    "January 15, 2024";

  const tagsRaw =
    item?.tags ||
    item?.categories ||
    item?.category ||
    item?.tag ||
    [];

  const tags = Array.isArray(tagsRaw)
    ? tagsRaw
    : typeof tagsRaw === "string"
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const pill1 = tags?.[0];
  const pill2 = tags?.[1];

  const slug =
    item?.slug ||
    (title || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const go = () => nav(`/blog/${slug}`);

  return (
    <Paper
      onClick={go}
      elevation={0}
      sx={{
        cursor: "pointer",
        bgcolor: "#fff",
        borderRadius: 3,
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
        overflow: "hidden",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
        },
      }}
    >
      {/* Image */}
      <Box sx={{ p: 2.2 }}>
        <Box
          sx={{
            borderRadius: 2.5,
            overflow: "hidden",
            border: "1px solid rgba(15,23,42,0.06)",
            height: { xs: 210, sm: 220, md: 230 },
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
        </Box>

        {/* Pills */}
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          {pill1 ? (
            <Chip
              label={pill1}
              size="small"
              sx={{
                height: 26,
                borderRadius: 999,
                bgcolor: "#F1F5F9",
                color: "#0B1220",
                fontWeight: 500,
                "& .MuiChip-label": { px: 1.2 },
              }}
            />
          ) : null}

          {pill2 ? (
            <Chip
              label={pill2}
              size="small"
              sx={{
                height: 26,
                borderRadius: 999,
                bgcolor: "#F1F5F9",
                color: "#0B1220",
                fontWeight: 500,
                "& .MuiChip-label": { px: 1.2 },
                fontFamily:"ui-sans-serif,system-ui,sans-serif",
              }}
            />
          ) : null}
        </Box>

        {/* Title */}
        <Typography
          sx={{
            mt: 1.6,
            fontSize: { xs: 18, md: 20 },
            fontWeight: 600,
            color: "#0B1220",
            lineHeight: 1.25,
            fontFamily:"ui-sans-serif,system-ui,sans-serif",
          }}
        >
          {title}
        </Typography>

        {/* Desc */}
        <Typography
          sx={{
            mt: 1.2,
            color: "rgba(15,23,42,0.78)",
            lineHeight: 1.6,
            fontSize: { xs: 14, md: 14.5 },
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {desc}
        </Typography>

        {/* Date */}
        <Typography
          sx={{
            mt: 3,
            color: "rgba(15,23,42,0.55)",
            fontSize: 13.5,
            fontWeight: 600,
          }}
        >
          {dateText}
        </Typography>
      </Box>
    </Paper>
  );
}
