import React from "react";
import {Box, IconButton, TextField} from "@mui/material";
import { CiPaperplane } from "react-icons/ci";
import {AttachFile, Mic} from "@mui/icons-material";
import papperIcon from "../../../../assets/icons/chats/paper.png"
import fileIcon from "../../../../assets/icons/chats/file.png"
import maikIcon from "../../../../assets/icons/chats/maik.png"

const MessageInput = (props) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent:"space-between",
                gap: 1,
            }}
        >
            <div className={"flex gap-2 items-center w-full"}>
                <IconButton onClick={props.onClickSend}>
                <CiPaperplane  size={30} />
                </IconButton>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={props.message}
                    onChange={props.onChangeInput}
                    placeholder="اكتب..."
                    sx={{
                        borderRadius: "25px",
                        width: "50%",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "25px", // Ensures the border radius is applied correctly
                            "& fieldset": {
                                borderColor: "#49869633",
                            },
                            "&:hover fieldset": {
                                borderColor: "#49869633",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#2d444933", // Sets the border color on focus
                            },
                        },
                    }}
                />
            </div>
            <Box sx={{display: 'flex',gap:"8px" ,paddingLeft:"20px"}}>
                <IconButton sx={{p: 0}}>
                    <img
                        src={papperIcon}
                        alt="Another icon"
                        style={{width: 25, height: 25}}
                    />
                </IconButton>

                <IconButton sx={{p: 0}}>
                    <img
                        src={maikIcon}
                        alt="Mic"
                        style={{width: 25, height: 25}}
                    />
                </IconButton>
                <IconButton sx={{p: 0}}>
                    <img
                        src={fileIcon}
                        alt="Attach file"
                        style={{width: 25, height: 25}}
                    />
                </IconButton>
            </Box>
        </Box>
    );
};

export default MessageInput;
