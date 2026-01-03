import React from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

/**
 * Props:
 * - q, setQ
 * - cat, setCat
 * - sort, setSort
 * - categoryOptions: [{label, value}]
 */
export default function ToursSearchBar({
  q,
  setQ,
  cat,
  setCat,
  sort,
  setSort,
  categoryOptions = [],
  onSearch, // optional callback if you want
}) {
  const handleSearch = () => {
    if (onSearch) onSearch();
  };

  return (

        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Where do you want to go?"
              fullWidth
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceOutlinedIcon sx={{ color: "rgba(2,6,23,0.55)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 64,
                  borderRadius: 999,
                  bgcolor: "#fff",
                  pr: "160px", // space for button inside
                  boxShadow: "0 14px 30px rgba(2,6,23,0.10)",
                  border: "1px solid rgba(15, 23, 42, 0.10)",
                  "& fieldset": { border: "none" },
                },
                "& .MuiInputBase-input": {
                  fontSize: 18,
                  color: "#0F172A",
                },
              }}
            />

            {/* Button inside right */}
            <Button
              type="button"
              variant="contained"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                height: 48,
                px: 3,
                borderRadius: 999,
                bgcolor: "#FF6B6B",
                "&:hover": { bgcolor: "#ff5656" },
                boxShadow: "0 12px 24px rgba(255,107,107,0.35)",
                fontWeight: 900,
                textTransform: "none",
              }}
            >
              Search
            </Button>
          </Box>
        </Grid>    
  );
}
