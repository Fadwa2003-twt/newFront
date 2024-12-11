import React, {useEffect, useState} from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Formik, Form } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import defultUserIcon from "../../../../assets/icons/defult-user.png";
import {useDispatch, useSelector} from "react-redux";
import GetEmployeesAction from "../../../../redux/action/Employee/GetEmployees.action";
import CreateEmployeeChatAction from "../../../../redux/action/Conversation/CreateEmployeeChat.action";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  direction: "rtl", // Right-to-left text direction
};

const inputStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#49869633",
  borderRadius: "6px",
  p: 1,
  mt: 3,
  mb: 3,
  width: "100%", // التأكد من عرض كامل الحقل
};

const fieldStyle = {
  flex: 1,
  width: "100%", // التأكد من عرض كامل الحقل
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 2,
};

const saveButtonStyle = {
  backgroundColor: "#49869680",
  color: "#000000",
  "&:hover": {
    backgroundColor: "#498796ae",
  },
  mr: 2, // Add margin right
};

const cancelButtonStyle = {
  backgroundColor: "#49869633",
  color: "#000000",
  "&:hover": {
    backgroundColor: "#4987968f",
  },
};

const CreateChatModal = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.data);
  const [inputValue, setInputValue] = useState("");
  const [employeeId , setEmployeeId] = useState('');
  const [employeeName , setEmployeeName] = useState('');

  useEffect(() => {
    dispatch(GetEmployeesAction({ page: 1 }));
  }, [dispatch]);

  const handelSubmit = (values, { setSubmitting }) => {
    console.log(values);  // تأكد من أن _id و name يتم طباعتهما هنا
    setSubmitting(false);
    if(employeeId && employeeName){
      dispatch(CreateEmployeeChatAction(
          {
            "employee_id": employeeId,
            "employee_name": employeeName
          }
      ));
    }
    onClose();
  }

  return (
      <Modal
          open={show}
          onClose={onClose}
          aria-labelledby="create-chat-modal-title"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" id="create-chat-modal-title" gutterBottom>
              إنشاء محادثة جديدة
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: "#000" }} />
            </IconButton>
          </Box>
          <Formik
              initialValues={{ employeeId: "" }}  // تغيير هنا لتخزين _id
              onSubmit={handelSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <Box sx={inputStyle}>
                    <IconButton>
                      <img
                          src={defultUserIcon}
                          alt="Icon"
                          style={{ width: 20, height: 20, color: "#498696" }}
                      />
                    </IconButton>
                    <Autocomplete
                        options={employees}
                        getOptionLabel={(option) => option.name}  // عرض الاسم
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        onChange={(event, newValue) => {
                          // تعيين _id و name عندما يتم اختيار الموظف
                          setEmployeeId(newValue ? newValue._id : "");
                          setEmployeeName(newValue ? newValue.name : "");
                          setFieldValue("employeeId", newValue ? newValue._id : "");
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="اسم الموظف"
                                variant="outlined"
                                fullWidth
                                sx={fieldStyle}
                            />
                        )}
                        sx={{ width: "100%",
                          "& .MuiAutocomplete-inputRoot": {
                            padding: 0, // إزالة padding الافتراضي في Autocomplete
                          },
                        }} // التأكد من أن Autocomplete يأخذ العرض الكامل
                    />
                  </Box>

                  <Box sx={buttonContainerStyle}>
                    <Button sx={cancelButtonStyle} onClick={onClose}>
                      إلغاء
                    </Button>
                    <Button
                        type="submit"
                        sx={saveButtonStyle}
                        disabled={isSubmitting}
                    >
                      حفظ
                    </Button>
                  </Box>
                </Form>
            )}
          </Formik>
        </Box>
      </Modal>
  );
};

export default CreateChatModal;
