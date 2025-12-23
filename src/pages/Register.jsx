import { Button, TextField, Container, Typography } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const submit = async () => {
        await api.post("/auth/user/register", form);
        navigate("/login");
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mt: 4 }}>Register</Typography>
            <TextField label="Name" fullWidth margin="normal" onChange={e => setForm({ ...form, name: e.target.value })} />
            <TextField label="Email" fullWidth margin="normal" onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={e => setForm({ ...form, password: e.target.value })} />
            <Button variant="contained" fullWidth onClick={submit}>Register</Button>
        </Container>
    );
}
