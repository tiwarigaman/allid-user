import { Box, Button, Container, Divider, Stack, TextField, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { categories } from "../data/dummy";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#2c3e50", color: "rgba(255,255,255,0.92)", pt: 7, pb: 4 }}>
      <Container maxWidth={false} className="wrap">
        <Stack direction={{ xs: "column", md: "row" }} spacing={5} sx={{ alignItems: "flex-start" }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 900, fontSize: 18 }}>All India Destination</Typography>
            <Typography sx={{ mt: 1, opacity: 0.8, maxWidth: 340 }}>
              Experience the magic of India with our carefully curated tours. From majestic mountains
              to pristine beaches, ancient temples to modern cities.
            </Typography>
          </Box>

          <Box sx={{ minWidth: 180 }}>
            <Typography sx={{ fontWeight: 900, mb: 1 }}>Quick Links</Typography>
            {["Home", "All Tours", "Travel Stories", "Contact Us", "About Us"].map((t) => (
              <Typography key={t} sx={{ opacity: 0.85, py: 0.5 }}>{t}</Typography>
            ))}
          </Box>

          <Box sx={{ minWidth: 220 }}>
            <Typography sx={{ fontWeight: 900, mb: 1 }}>Categories</Typography>
            {categories.slice(0, 6).map((c) => (
              <Typography key={c.id} sx={{ opacity: 0.85, py: 0.5 }}>{c.name}</Typography>
            ))}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 900, mb: 1 }}>Stay Updated</Typography>
            <Typography sx={{ opacity: 0.85, mb: 2 }}>
              Subscribe to our newsletter for the latest travel deals and destination guides.
            </Typography>

            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Enter your email"
                size="small"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 999,
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "white",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{ minWidth: 52, borderRadius: 999, bgcolor: "#FF6B6B", "&:hover": { bgcolor: "#ff5656" } }}
              >
                <ArrowRightAltIcon />
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.15)" }} />

        <Stack direction="row" justifyContent="space-between" sx={{ opacity: 0.7 }}>
          <Typography>© 2024 All India Destination. All rights reserved.</Typography>
          <Typography>Powered by Readdy</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
