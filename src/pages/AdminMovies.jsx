import {
    Container,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardContent,
    Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminMovies() {
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        rating: "",
        duration: "",
        releaseDate: "",
    });

    // ✅ Fetch movies safely with async inside useEffect
    const fetchMovies = async () => {
        try {
            const res = await api.get("/movies");
            setMovies(res.data);
        } catch (err) {
            console.error("Failed to fetch movies", err);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const openAddDialog = () => {
        setEditingMovie(null);
        setForm({
            title: "",
            description: "",
            rating: "",
            duration: "",
            releaseDate: "",
        });
        setOpen(true);
    };

    const openEditDialog = (movie) => {
        setEditingMovie(movie);
        // Only set fields we care about
        setForm({
            title: movie.title || "",
            description: movie.description || "",
            rating: movie.rating || "",
            duration: movie.duration || "",
            releaseDate: movie.releaseDate
                ? movie.releaseDate.substring(0, 10)
                : "",
        });
        setOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingMovie) {
                await api.put(`/movies/${editingMovie._id}`, form);
            } else {
                await api.post("/movies", form);
            }
            setOpen(false);
            fetchMovies();
        } catch (err) {
            console.error("Failed to save movie", err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this movie?")) return;
        try {
            await api.delete(`/movies/${id}`);
            fetchMovies();
        } catch (err) {
            console.error("Failed to delete movie", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h4">Admin – Movies</Typography>
                <Button variant="contained" onClick={openAddDialog}>
                    Add Movie
                </Button>
            </Stack>

            {movies.map((movie) => (
                <Card key={movie._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{movie.title}</Typography>
                        <Typography>{movie.description}</Typography>
                        <Typography>Rating: {movie.rating}</Typography>
                        <Typography>Duration: {movie.duration} min</Typography>
                        <Typography>
                            Release: {new Date(movie.releaseDate).toDateString()}
                        </Typography>

                        <Stack direction="row" spacing={2} mt={2}>
                            <Button
                                variant="outlined"
                                onClick={() => openEditDialog(movie)}
                            >
                                Edit
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={() => handleDelete(movie._id)}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            ))}

            {/* ADD / EDIT DIALOG */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{editingMovie ? "Edit Movie" : "Add Movie"}</DialogTitle>

                <DialogContent>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="dense"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />
                    <TextField
                        label="Rating"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={form.rating}
                        onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    />
                    <TextField
                        label="Duration (min)"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    />
                    <TextField
                        label="Release Date"
                        type="date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        value={form.releaseDate}
                        onChange={(e) =>
                            setForm({ ...form, releaseDate: e.target.value })
                        }
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
