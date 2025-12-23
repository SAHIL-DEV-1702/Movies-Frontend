import {
    TextField,
    MenuItem,
    Stack
} from "@mui/material";

export default function MovieControls({
    search,
    setSearch,
    sort,
    setSort
}) {
    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={3}>
            <TextField
                label="Search by title or description"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TextField
                select
                label="Sort By"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                sx={{ minWidth: 200 }}
            >
                <MenuItem value="title">Name</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="releaseDate">Release Date</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
            </TextField>
        </Stack>
    );
}
