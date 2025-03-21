import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Snackbar, Alert } from "@mui/material";
import axios from "axios";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar mesajı
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar türü ("success" veya "error")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8800/api/abone/sendContactEmail", formData);
      setSnackbarMessage("Mesajınız gönderildi!");
      setSnackbarSeverity("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSnackbarMessage("Mesaj gönderiminde bir sorun oluştu.");
      setSnackbarSeverity("error");
    } finally {
      setIsSubmitting(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSendEmail}
        sx={{ mt: 4, textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom>
          İletişim Formu
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Adınız"
          placeholder="Adınızı giriniz"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="E-posta adresiniz"
          placeholder="E-posta adresinizi giriniz"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Konu"
          placeholder="Konu başlığını giriniz"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Mesajınız"
          placeholder="Mesajınızı giriniz"
          name="message"
          multiline
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ mt: 3, px: 5, py: 1.5, mb: 4 }}
        >
          Gönder
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
