import React from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import "./styles/ReturnTaskModal.css";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const contentStyle = {
  backgroundColor: "#FFFFFF",
  padding: "16px",
  borderRadius: "8px",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  direction: "rtl", // Right-to-left text direction
};

const fieldStyle = {
  marginBottom: "16px",
  width: "100%",
  backgroundColor: "#49869633",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Remove border
    },
    "&:hover fieldset": {
      border: "none", // Remove border on hover
    },
    "&.Mui-focused fieldset": {
      border: "none", // Remove border when focused
    },
  },
};

const descriptionFieldStyle = {
  marginBottom: "24px",
  width: "100%",
  height: "auto",
  backgroundColor: "#49869633",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none", // Remove border
    },
    "&:hover fieldset": {
      border: "none", // Remove border on hover
    },
    "&.Mui-focused fieldset": {
      border: "none", // Remove border when focused
    },
  },
};

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: ".5rem",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  left: "0px", // Changed from right to left
  cursor: "pointer",
  fontSize: "1.5rem", // Adjust this value as needed
  width: "10px", // Adjust this value as needed
  height: "20px", // Adjust this value as needed
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#166477c3",
};

const ReturnTaskModal = ({ show, onClose }) => (
  <Modal
    open={show}
    onClose={onClose}
    aria-labelledby="return-task-modal-title"
    sx={{ overflowY: "auto" }}
  >
    <Box sx={modalStyle}>
      <Box sx={contentStyle}>
        <Typography
          variant="h6"
          id="return-task-modal-title"
          sx={{
            textAlign: "right",
            marginBottom: "1.2rem",
            fontWeight: 400,
            color: "#000",
          }}
        >
          ارجاع المهمة
        </Typography>
        <Button sx={closeButtonStyle} onClick={onClose}>
          ×
        </Button>
        <Formik
          initialValues={{ date: "", description: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="date">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={fieldStyle}
                    placeholder="وقت المهمة"
                  />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    placeholder="الوصف"
                    rows={3}
                    sx={descriptionFieldStyle}
                  />
                )}
              </Field>
              <Box sx={buttonStyle}>
                <Button
                  type="submit"
                  variant="contained"
                  color="inherit"
                  disabled={isSubmitting}
                  sx={{ width: "150px", backgroundColor: "#49869633" }}
                >
                  حفظ المهمة
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  </Modal>
);

export default ReturnTaskModal;
