import React, { useState } from "react";
import { Modal, Box, Button, Typography, Rating } from "@mui/material";
import "./styles/RateModal.css";

const RateModal = ({ show, onClose, onRatingUpdate }) => {
  const [rating, setRating] = useState(0);

  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="rate-modal-title"
      sx={{ overflowY: "auto" }}
    >
      <Box className="modal">
        <Box className="content">
          <Typography
            variant="h6"
            id="rate-modal-title"
            sx={{
              textAlign: "right",
              marginBottom: "1.2rem",
              fontWeight: 400,
              color: "#000",
            }}
          >
            تقييم المهمة
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            size="large" // Adjust the size of the stars
            classes={{
              iconFilled: "rating-icon-filled",
              iconEmpty: "rating-icon-empty",
              icon: "rating-icon",
            }}
          />
          <Box className="button-container">
            <Button
              variant="contained"
              onClick={() => {
                onRatingUpdate(rating); // Update the rating in parent
              }}
              className="submit-button"
            >
              حفظ التقيم
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RateModal;
