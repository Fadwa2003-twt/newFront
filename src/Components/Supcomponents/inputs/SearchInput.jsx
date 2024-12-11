import React from 'react';
import {
    Box,
    TextField,
    IconButton,
} from "@mui/material";

function SearchInput(props) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: "0 8px",
                height: 40,
            }}
        >
            <IconButton sx={{ p: 0, mr: 1 }}>
                {/* Replace with actual search icon */}
                {/* <img src="path_to_search_icon" alt="Search icon" style={{ width: 25, height: 25 }} /> */}
            </IconButton>
            <Box
                sx={{
                    height: 20,
                    width: "1%",
                    backgroundColor: "#ccc",
                    mx: 1,
                }}
            />
            <TextField
                fullWidth
                placeholder="البحث"
                variant="outlined"
                InputProps={{
                    disableUnderline: true,
                    sx: { border: "none", outline: "none", padding: 0 },
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: "none",
                        },
                    },
                }}
            />
        </Box>
    );
}

export default SearchInput;