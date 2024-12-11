import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Avatar, Box } from "@mui/material";
import "./DefaultSelect.css";

function SelecteAutoComplete({ options, className, classNameSelect, classNameInput, title, error, name, value, onChange,color }) {
    return (
        <div
            className={`items-center rounded-[12px] ${className}`}
            style={{
                position: "relative",
                background: "#a6cdd766",
            }}
        >
            <Autocomplete
                sx={{
                    display: 'inline-block',
                    height: '100%',
                    width: '100%',
                    borderRadius: '11px',
                    '& .MuiAutocomplete-inputRoot': {
                        padding: '0px !important', // Removes padding with !important
                        height: '100%',
                        border: 'none',
                    },
                    '& .MuiInputBase-root': {
                        height: '100%',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        paddingRight: '20px !important', // Increase padding-right to 20px
                        '& .MuiAutocomplete-endAdornment': {
                            display: 'none', // Remove the arrow
                        },
                    },
                    '& .MuiOutlinedInput-root': {
                        padding: '0px !important', // Ensure padding is removed here
                    },
                    '& .MuiAutocomplete-input': {
                        paddingRight: '20px !important', // Set padding-right for input
                    },
                }}
                id="custom-input-demo"
                options={options}
                getOptionLabel={(option) => option.name}
                value={options.find(opt => opt._id === value) || null}
                onChange={(event, newValue) => {
                    if (onChange) {
                        onChange({ target: { name, value: newValue ? newValue._id : '' } });
                    }
                }}
                renderOption={(props, option) => (
                    <Box component="li" sx={{
                        '& > img': { mr: 2, flexShrink: 0 },
                        display: 'flex',
                        gap: '7px',
                        ...(color && { background: option.color }), // تطبيق الخلفية فقط إذا كان هناك لون
                    }}
                         {...props}>
                        {
                            !color ?(
                                <>
                                <Avatar alt={option.name} src={option.aleartImg} sx={{ width: 24, height: 24 }} />
                                {option.name}
                                </>
                                ) :null
                        }
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={title}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            startAdornment: (
                                value && (
                                    <Avatar alt={value.name} src={value.aleartImg} sx={{ width: 24, height: 24 }} />
                                )
                            ),
                            className: `select-arrow-left input-font-size  ${(classNameInput ? classNameInput : "py-2 px-4")}`, // Custom class for additional styling if needed
                        }}
                        className={`select-default w-full text-default-opacity ${error ? "select-error" : ""} ${classNameSelect}`}
                    />
                )}
            />
            {error && (
                <p
                    className="error-message"
                    style={{
                        fontSize: "12px",
                        marginTop: "-5px",
                    }}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export default SelecteAutoComplete;
