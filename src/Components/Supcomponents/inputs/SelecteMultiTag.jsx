import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./SelecteMultiTag.css"

function CustomAutocomplete({ options, value, onChange, error, placeholder, ...props }) {
    return (
        <div
            className="relative bg-[#a6cdd766] w-full h-[2.5rem] pt-0 rounded-md flex items-center"
            style={{ width: '100%' }} // Ensure the container takes full width
        >
            <Autocomplete
                multiple
                options={options}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder={placeholder}
                        error={Boolean(error)}
                        helperText={error}
                        sx={{
                            padding: '0px',
                            borderRadius: '8px',
                            width: '100%', // Make sure TextField takes full width
                            '& .MuiOutlinedInput-root': {
                                padding: '0px',
                                width: '100%',
                                paddingRight: 0, // Remove paddingRight from TextField
                                '& fieldset': {
                                    borderColor: '#a6cdd766',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#a6cdd766',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#a6cdd766',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: 'text.primary',
                                paddingRight: 0, // Ensure padding is removed from input
                            },
                            '& .MuiAutocomplete-popupIndicator': {
                                display: 'none', // Hide the default arrow icon
                            },
                        }}
                        fullWidth
                    />
                )}
                sx={{
                    width: '100%', // Ensure Autocomplete takes full width
                    '& .MuiAutocomplete-popover': {
                        borderRadius: '8px',
                        background: '#a6cdd766',
                        border: '1px solid #ccc',
                    },
                    '& .MuiAutocomplete-option': {
                        fontSize: '14px',
                        color: '#333',
                        '&:hover': {
                            backgroundColor: '#eee',
                        },
                    },
                    '& .MuiAutocomplete-groupLabel': {
                        fontSize: '14px',
                        color: '#333',
                    },
                    '& .MuiAutocomplete-inputRoot': {
                        paddingRight: 0, // Ensure padding-right is removed
                    },
                }}
                {...props}
            />
            {error && (
                <p
                    style={{
                        fontSize: "12px",
                        marginTop: "-5px",
                        color: 'red',
                    }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export default CustomAutocomplete;
