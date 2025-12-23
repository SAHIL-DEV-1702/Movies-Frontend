import { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Card, CardContent, Typography } from "@mui/material";

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get("/movies").then(res => setMovies(res.data));
    }, []);

    return (
        <Container>
            {movies.map(movie => (
                <Card key={movie._id} sx={{ my: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{movie.title}</Typography>
                        <Typography>{movie.description}</Typography>
                        <Typography>Rating: {movie.rating}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}
