import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'athlete',
    label: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
      <Container maxWidth="sm">
        <Box mt={8}>
          <Typography variant="h4" mb={2}>Регистрация</Typography>
          {/*{error && <Typography color="error">{error as React.ReactNode}</Typography>}*/}
          <TextField fullWidth name="name" label="Имя" margin="normal" value={form.name} onChange={handleChange} />
          <TextField fullWidth name="email" label="Email" margin="normal" value={form.email} onChange={handleChange} />
          <TextField fullWidth name="password" type="password" label="Пароль" margin="normal" value={form.password} onChange={handleChange} />
          <TextField
              select
              fullWidth
              name="role"
              label="Роль"
              margin="normal"
              value={form.role}
              onChange={handleChange}
          >
            <MenuItem value="athlete">Спортсмен</MenuItem>
            <MenuItem value="organizer">Организатор</MenuItem>
          </TextField>
          {/*{form.role === 'organizer' && (*/}
          {/*    <TextField fullWidth name="label" label="Label (Организация)" margin="normal" value={form.label} onChange={handleChange} />*/}
          {/*)}*/}
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>Зарегистрироваться</Button>
        </Box>
      </Container>
  );
}
