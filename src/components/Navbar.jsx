import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (

        <AppBar position="static">

            <Toolbar>
                <Typography sx={{ flexGrow: 1 }}>Movie App</Typography>

                {!user.token ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/">Movies</Button>
                        {user.role === "admin" && (
                            <Button color="inherit" component={Link} to="/admin">Admin</Button>
                        )}
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
