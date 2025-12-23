import { Card, CardContent, Typography } from "@mui/material";

export default function MovieCard({ movie }) {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography>{movie.description}</Typography>
                <Typography>Rating: {movie.rating}</Typography>
                <Typography>Duration: {movie.duration} min</Typography>
                <Typography>
                    Release: {new Date(movie.releaseDate).toDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
}
