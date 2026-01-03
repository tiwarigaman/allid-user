import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ item }) {
  const nav = useNavigate();

  const title = item?.name || "Category";
  const subtitle = item?.description || item?.shortDesc || "";
  const img =
    item?.image ||
    item?.imageUrl ||
    item?.cover ||
    "https://images.unsplash.com/photo-1526779259212-756e0e6d79a2?auto=format&fit=crop&w=1400&q=70";

  const go = () => {
    const slug = item?.slug || (title || "").toLowerCase().replace(/\s+/g, "-");
    nav(`/category/${slug}`);
  };

  return (
    <Paper
      onClick={go}
      elevation={0}
      sx={{
        p: 2.2,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: "#fff",
        border: "1px solid rgba(15,23,42,0.06)",
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 45px rgba(15,23,42,0.14)",
        },

        // ✅ image zoom on card hover
        "&:hover .cat-img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(15,23,42,0.08)",
          height: { xs: 220, sm: 260, md: 270 },
          bgcolor: "#0B1220",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          className="cat-img"
          src={img}
          alt={title}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1)",
            transition: "transform 350ms ease",
          }}
        />

        {/* Overlay gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        {/* Text bottom-left */}
        <Box
          sx={{
            position: "absolute",
            left: 16,
            bottom: 14,
            right: 16,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 500,
              fontSize: { xs: 20, md: 22 },
              lineHeight: 1.15,
              textShadow: "0 6px 18px rgba(0,0,0,0.45)",
               fontFamily:"ui-sans-serif,system-ui,sans-serif",
            }}
          >
            {title}
          </Typography>

          {subtitle ? (
            <Typography
              sx={{
                mt: 0.6,
                color: "rgba(255,255,255,0.92)",
                fontSize: { xs: 13.5, md: 14.5 },
                lineHeight: 1.35,
                textShadow: "0 6px 18px rgba(0,0,0,0.35)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                 fontFamily:"ui-sans-serif,system-ui,sans-serif",
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
}
