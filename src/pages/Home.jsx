import { useEffect, useState } from "react";
import api from "../api/api";
import {
    Container,
    Typography,
    Pagination,
    Stack,
    CircularProgress,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from "@mui/material";
import MovieCard from "../components/MovieCard";

const MOVIES_PER_PAGE = 5;

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("title");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        applySearchAndSort();
    }, [search, sort, movies]);

    const fetchMovies = async () => {
        setLoading(true);
        const res = await api.get("/movies");
        setMovies(res.data);
        setLoading(false);
    };

    const applySearchAndSort = () => {
        let data = [...movies];

        // 🔍 SEARCH
        if (search.trim()) {
            data = data.filter(
                (movie) =>
                    movie.title.toLowerCase().includes(search.toLowerCase()) ||
                    movie.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 🔃 SORT
        data.sort((a, b) => {
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

        setPage(1); // reset page after filter/sort
        setFilteredMovies(data);
    };

    const startIndex = (page - 1) * MOVIES_PER_PAGE;
    const paginatedMovies = filteredMovies.slice(
        startIndex,
        startIndex + MOVIES_PER_PAGE
    );

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant="h4" mb={2}>
                Movies
            </Typography>

            {/* 🔍 SEARCH + SORT CONTROLS */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mb={3}
            >
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
            </Stack>

            {loading && <CircularProgress />}

            {!loading && paginatedMovies.length === 0 && (
                <Typography>No movies found</Typography>
            )}

            {paginatedMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
            ))}

            {/* 📄 PAGINATION */}
            <Stack alignItems="center" mt={3}>
                <Pagination
                    count={Math.ceil(filteredMovies.length / MOVIES_PER_PAGE)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Stack>
        </Container>
    );
}
