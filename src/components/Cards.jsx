import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

export function CategoryCard({ item }) {
  return (
    <Paper
      sx={{
        overflow: "hidden",
        borderRadius: 3,
        transition: "transform 200ms ease, box-shadow 200ms ease",
        cursor: "pointer",
        "&:hover": { transform: "translateY(-6px)", boxShadow: "0 26px 70px rgba(15,23,42,0.18)" },
      }}
    >
      <Box sx={{ position: "relative", height: 210 }}>
        <Box component="img" src={item.image} alt={item.name} loading="lazy"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box sx={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.60) 100%)",
        }} />
        <Box sx={{ position: "absolute", left: 18, bottom: 16 }}>
          <Typography sx={{ color: "white", fontWeight: 900, fontSize: 20 }}>
            {item.name}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", mt: 0.3 }}>
            {item.subtitle}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export function TourCard({ item }) {
  return (
    <Paper sx={{ overflow: "hidden", borderRadius: 3 }}>
      <Box sx={{ position: "relative", height: 220 }}>
        <Box component="img" src={item.image} alt={item.title} loading="lazy"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <Chip label={item.category} sx={{
          position: "absolute", top: 12, left: 12,
          bgcolor: "rgba(15,23,42,0.78)", color: "white", fontWeight: 800
        }} />

        <Chip label={item.badge} sx={{
          position: "absolute", top: 12, right: 12,
          bgcolor: "#FF6B6B", color: "white", fontWeight: 900
        }} />
      </Box>

      <Box sx={{ p: 2.4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          <Typography variant="body2">{item.location}</Typography>
        </Stack>

        <Typography sx={{ fontWeight: 900, fontSize: 20, mt: 1 }}>{item.title}</Typography>
        <Typography sx={{ color: "text.secondary", mt: 1 }}>{item.desc}</Typography>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, color: "text.secondary" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{item.duration}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <GroupOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{item.group}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export function BlogCard({ item }) {
  return (
    <Paper sx={{ overflow: "hidden", borderRadius: 3 }}>
      <Box sx={{ height: 210 }}>
        <Box component="img" src={item.image} alt={item.title} loading="lazy"
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ p: 2.4 }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {item.tags.map((t) => (
            <Chip key={t} label={t} size="small"
              sx={{ fontWeight: 800, bgcolor: "rgba(15,23,42,0.06)" }}
            />
          ))}
        </Stack>

        <Typography sx={{ fontWeight: 900, fontSize: 18, mt: 1.5 }}>
          {item.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1 }}>
          {item.excerpt}
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 2 }}>
          {item.date}
        </Typography>
      </Box>
    </Paper>
  );
}
