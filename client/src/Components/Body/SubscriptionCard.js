import React, { useState } from 'react';
import axios from "axios";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Chip, OutlinedInput, Grid, Snackbar, Alert } from '@mui/material';

const categories = [
  'saglik',
  'baslanlık',
  'devlet',
];

const SubscriptionCard = () => {
  const [inputs, setInputs] = useState({
    email: "",
    tags: [],
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };   

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/abone/sendEmail", inputs);
    } catch (error) {
      console.log(error);
    }
  };   

  const handleSendData = async (e) => {
    e.preventDefault();
    console.log('Email:', inputs.email);
    console.log('Selected Categories:', inputs.tags);
    try {
      await axios.post("http://localhost:8800/api/abone/sendData", inputs);
      setOpenSnackbar(true); // Başarı durumunda Snackbar'ı aç
    } catch (error) {
      console.log(error);
    }
    handleSendEmail(e); // İlk Mail gönderme
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false); // Snackbar'ı kapat
    window.location.reload(); 
    window.scrollTo(0, 0); 
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 1000,
        mx: "auto",
        bgcolor: "black",
        padding: 2,
        borderRadius: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            fullWidth
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              color: "white",
              height: "100%",
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl fullWidth sx={{ height: "100%" }}>
            <InputLabel id="category-select-label" sx={{ color: "black" }}>
              Kategori Seçiniz
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              multiple
              value={inputs.tags}
              onChange={handleChange}
              name="tags"
              input={
                <OutlinedInput
                  sx={{ color: "black", borderColor: "black", borderWidth: 1 }}
                  id="select-multiple-chip"
                  label="Select Categories"
                />
              }
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: 0.5,
                    backgroundColor: "white",
                    overflow: "auto",
                  }}
                >
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{
                        color: "black",
                        borderColor: "black",
                        borderWidth: 1,
                      }}
                    />
                  ))}
                </Box>
              )}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiSelect-select": {
                  color: "white",
                  backgroundColor: "white",
                },
                "& .MuiMenuItem-root": {
                  color: "white",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                },
                height: "100%",
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <button
        type="submit"
        onClick={(e) => handleSendData(e)}
        className="btn btn-primary"
        style={{ marginTop: '40px' }}
      >
        Subscribe <i className="fa fa-envelope-open-o"></i>
      </button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000} // Snackbar 5 saniye sonra otomatik olarak kapanır
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Başarıyla kayıt oldunuz! Lütfen email kutunuzu kontrol ediniz.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubscriptionCard;
