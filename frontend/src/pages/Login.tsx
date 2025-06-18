import {useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                email,
                password,
            });
            login(res.data.token, res.data.user);
            navigate('/events');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={8}>
                <Typography variant="h4" mb={2}>Вход</Typography>
                {/*{error && <Typography color="error">{error}</Typography>}*/}
                <TextField fullWidth label="Email" margin="normal" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField fullWidth type="password" label="Пароль" margin="normal" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" fullWidth sx={{mt: 2}} onClick={handleSubmit}>Войти</Button>
            </Box>
        </Container>
    );
}
