import { Button, TextField, Container, Typography } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await api.post("/auth/user/login", { email, password });
        login(res.data.token, res.data.role);
        navigate("/");
    };

    return (

        <Container maxWidth="sm">

            <Typography variant="h4" sx={{ mt: 4 }}>Login</Typography>
            <TextField fullWidth margin="normal" label="Email" onChange={e => setEmail(e.target.value)} />
            <TextField fullWidth margin="normal" label="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <Button fullWidth variant="contained" onClick={handleSubmit}>Login</Button>
        </Container>
    );
}
