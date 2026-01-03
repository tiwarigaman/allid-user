import { Box, Typography } from "@mui/material";

export default function SectionTitle({ title, subtitle }) {
  return (
    <Box sx={{ textAlign: "center", mb: 5 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: 32, md: 42 } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ mt: 1, maxWidth: 680, mx: "auto" }} color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
