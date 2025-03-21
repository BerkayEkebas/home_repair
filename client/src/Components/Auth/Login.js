import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

const Login = () => {
  const { login } = useAuth(); // AuthContext'ten login fonksiyonunu alıyoruz
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password); // AuthContext'teki login fonksiyonunu çağırıyoruz
      navigate('/dashboard'); // Başarılı giriş sonrası yönlendirme
    } catch (err) {
      setLoading(false);
      setError('Giriş başarısız, lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Giriş Yap
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="E-posta"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Şifre"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
          </Button>
        </Box>
      </form>
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Henüz üye değil misiniz?{' '}
          <Button color="primary" onClick={() => navigate('/register')}>
            Kayıt Ol
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
