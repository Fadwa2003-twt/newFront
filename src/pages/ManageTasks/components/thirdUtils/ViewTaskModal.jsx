import React from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";

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
  justifyContent: "flex-end",
  gap: "1rem",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  left: "0px",
  cursor: "pointer",
  fontSize: "1.5rem",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#166477c3",
};

const ViewTaskModal = ({ show, onClose }) => (
  <Modal
    open={show}
    onClose={onClose}
    aria-labelledby="view-task-modal-title"
    sx={{ overflowY: "auto" }}
  >
    <Box sx={modalStyle}>
      <Box sx={contentStyle}>
        <Typography
          variant="h6"
          id="view-task-modal-title"
          sx={{
            textAlign: "right",
            marginBottom: "1.2rem",
            fontWeight: 400,
            color: "#000",
          }}
        >
          عرض المهمة
        </Typography>
        <Button sx={closeButtonStyle} onClick={onClose}>
          ×
        </Button>
        <Formik
          initialValues={{ date: "21-5-2024", description: "مهمة مستعجلة" }}
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
                    variant="outlined"
                    sx={fieldStyle}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      sx: {
                        color: "#111",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Remove border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Remove border color on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Remove border color when focused
                        },
                      },
                    }}
                  />
                )}
              </Field>
              <Field name="description">
                {({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    placeholder="الوصف"
                    rows={4}
                    sx={descriptionFieldStyle}
                    InputProps={{
                      sx: {
                        color: "#111",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Remove border color
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Remove border color on hover
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "transparent", // Remove border color when focused
                        },
                      },
                    }}
                  />
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  </Modal>
);

export default ViewTaskModal;
