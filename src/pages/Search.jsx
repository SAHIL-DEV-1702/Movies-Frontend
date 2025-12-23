import { useState } from "react";
import api from "../api/api";
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import MovieCard from "../components/MovieCard";

export default function Search() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState("title");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!search.trim()) return;

        try {
            setLoading(true);
            const res = await api.get(`/movies/search?q=${search}`);

            const sortedMovies = [...res.data].sort((a, b) => {
                switch (sort) {
                    case "title":
                        return a.title.localeCompare(b.title);
                    case "rating":
                        return b.rating - a.rating;
                    case "releaseDate":
                        return new Date(b.releaseDate) - new Date(a.releaseDate);
                    case "duration":
                        return a.duration - b.duration;
                    default:
                        return 0;
                }
            });

            setMovies(sortedMovies);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h4" mb={2}>
                Search Movies
            </Typography>

            {/* 🔍 SEARCH + SORT */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
                <TextField
                    fullWidth
                    label="Search by name or description"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sort}
                        label="Sort By"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value="title">Name (A-Z)</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                        <MenuItem value="releaseDate">Release Date</MenuItem>
                        <MenuItem value="duration">Duration</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    Search
                </Button>
            </Stack>

            {loading && <CircularProgress />}

            {!loading && movies.length === 0 && search && (
                <Typography>No movies found</Typography>
            )}

            {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
            ))}
        </Container>
    );
}
