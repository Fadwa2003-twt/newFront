import React from "react";
import { Box } from "@mui/material";
import { FiEdit, FiRepeat, FiEye } from "react-icons/fi";
import "./ActionIcons.css"; // Import the CSS file

const ActionIcons = ({ handleOpenModal }) => (
  <Box display="flex" alignItems="center">
    <FiEdit className="m-1 icon" onClick={() => handleOpenModal("rate")} />
    <FiRepeat className="m-1 icon" onClick={() => handleOpenModal("return")} />
    <FiEye className="m-1 icon" onClick={() => handleOpenModal("view")} />
  </Box>
);

export default ActionIcons;
