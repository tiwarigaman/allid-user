// src/components/TripPlanSidebar.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { Link as RouterLink } from "react-router-dom";

// 🔹 API to store form in Firestore
import { submitTourForm } from "../api/TourForm";

export default function TripPlanSidebar({ categories = [] }) {
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

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string } | null

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.phone.trim().length > 0
    );
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setStatus(null);
    setSubmitting(true);

    try {
      await submitTourForm({
        arrivalDate: form.arrivalDate,
        days: form.days,
        adults: form.adults,
        children: form.children,
        accommodation: form.accommodation,
        info: form.info,
        name: form.name,
        email: form.email,
        country: form.country,
        phone: form.phone,
      });

      setStatus({
        type: "success",
        message: "Thank you! Your trip details have been sent.",
      });

      // reset form
      setForm({
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
    } catch (err) {
      console.error("Error submitting tour form:", err);
      const msg =
        err?.message === "Invalid email address."
          ? "Please enter a valid email address."
          : "Something went wrong while sending your trip details. Please try again.";
      setStatus({
        type: "error",
        message: msg,
      });
    } finally {
      setSubmitting(false);
    }
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

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ p: 2, bgcolor: "rgb(244 244 244)" }}
        >
          {/* Status message */}
          {status && (
            <Alert
              severity={status.type}
              sx={{ mb: 1.5, borderRadius: 1, fontSize: 13 }}
            >
              {status.message}
            </Alert>
          )}

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
            {[
              "India",
              "United Kingdom",
              "United States",
              "Canada",
              "Australia",
              "Other",
            ].map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
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
            disabled={!canSubmit || submitting}
            sx={{
              bgcolor: "#F97316",
              color: "#fff",
              borderRadius: 1,
              py: 1.2,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#ea6a10" },
              boxShadow: "0 12px 26px rgba(249,115,22,0.30)",
              "&.Mui-disabled": {
                bgcolor: "rgba(249,115,22,0.35)",
                boxShadow: "none",
              },
            }}
          >
            {submitting ? "Submitting..." : "Submit"}
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
            bgcolor: "#ff5656",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
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
