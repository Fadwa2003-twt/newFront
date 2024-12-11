import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Box } from "@mui/material";
import TextInput from "../inputs/TextInput";
import DefaultFileInput from "../inputs/DefaultFileInput";
import DefaultSelect from "../inputs/DefaultSelect";
import DefaultBtn from "../Buttons/DefaultBtn";
import GetCategoriesAction from "../../../redux/action/Category/GetCategories.action";
import GetDepartmentAction from "../../../redux/action/Department/GetDepartment.action";
import EditEmployeeAction from "../../../redux/action/Employee/EditEmployee.action";
import { ErrorMessage, Form, Formik, Field } from "formik";
import { validationSchemaEmployee } from "../../../validationSchema";

import "./NewEmployeeForm.css";

function EditEmployeeForm({ title, employee }) {
  console.log({ employee });

  const empTypeOptions = [
    { _id: "دوام بالساعة", name: "دوام بالساعة" },
    { _id: "بالمهام", name: "بالمهام" },
    { _id: "فريلانسر", name: "فريلانسر" },
  ];

  const rolesOptions = [
    { _id: "مستخدم", name: "مستخدم" },
    { _id: "مدير", name: "مدير" },
    { _id: "ناشر", name: "ناشر" },
    { _id: "ناشر محترف", name: "ناشر محترف" },
    { _id: "ناشر محترف رافع", name: "ناشر محترف رافع" },
    { _id: "ناشر وكاتب محتوى", name: "ناشر وكاتب محتوى" },
    { _id: "كاتب محتوى", name: "كاتب محتوى" },
    { _id: "مسؤول", name: "مسؤول" },
  ];

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const departments = useSelector((state) => state.departments.data);
  const updateEmployeeStatus = useSelector(
    (state) => state.employees.updateStatus
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [freelanceValue, setFreelanceValue] = useState("");

  useEffect(() => {
    dispatch(GetCategoriesAction({ page: 1 }));
    dispatch(GetDepartmentAction({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (employee) {
      setCategoriesArray([{ value: employee.Category }]);
      setFreelanceValue(employee.type);
      setSelectedFile(null); // Reset file if needed
    }
  }, [employee]);

  const initialValues = {
    name: employee?.name || "",
    email: employee?.email || "",
    password: "",
    passwordConfirm: "",
    Department: employee?.Department || "",
    type: employee?.type || "",
    holidays: employee?.holidays || "",
    weekEnd: employee?.weekEnd || 0,
    role: employee?.role || "",
  };

  const handleSubmit = (values) => {
    console.log({ values });

    const categoryValue = categoriesArray && categoriesArray.length > 0
        ? categoriesArray[0].value
        : null;

    const updatedData = {
      id: employee._id,
      name: values.name,
      Department: values.Department?._id,
      type: values.type,
      holidays: values.holidays,
      weekEnd: values.weekEnd,
      role: values.role,
      Category: categoryValue,
      image: selectedFile,  // Sending the selected image
    };

    // Check if the email has changed before adding it
    if (values.email !== employee.email) {
      updatedData.email = values.email;
    }
    console.log(values.password)
    // Send the password only if it contains data
    // أرسل كلمة المرور فقط إذا كانت تحتوي على بيانات
    if (values.password) {
      updatedData.password = values.password;
      updatedData.passwordConfirm = values.passwordConfirm;
      updatedData.currentPassword =values.currentPassword
    }

    // تحقق مما إذا كان هناك حاجة لإرسال كلمة المرور أو لا
    console.log('Updated Data:', updatedData);

    dispatch(EditEmployeeAction(updatedData));
  };

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategoriesArray(event);
  };

  const weekDays = [
    { _id: 0, name: "الأحد" },
    { _id: 1, name: "الاثنين" },
    { _id: 2, name: "الثلاثاء" },
    { _id: 3, name: "الأربعاء" },
    { _id: 4, name: "الخميس" },
    { _id: 5, name: "الجمعة" },
    { _id: 6, name: "السبت" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      // validationSchema={validationSchemaEmployee}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, touched, errors }) => (
        <Box
          component={Form}
          sx={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
            position: "relative",
          }}
          className="page"
        >
          {title && (
            <Typography
              variant="h4"
              sx={{ marginBottom: "2rem", textAlign: "right" }}
              className="header"
            >
              تعديل موظف
            </Typography>
          )}
          <Grid container spacing={13}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Field name="name">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        title="الاسم"
                        placeholder={employee?.name || "الاسم الكامل"}
                        required
                        error={errors.name && touched.name && errors.name}
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="email">
                    {({ field }) => (
                      <TextInput
                        {...field}
                        title="الايميل"
                        placeholder={employee?.email || "البريد الإلكتروني"}
                        required
                        error={errors.email && touched.email && errors.email}
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="currentPassword">
                    {({ field }) => (
                        <TextInput
                            type="password"
                            {...field}
                            title="كلمة المرور الحالية"
                            value={values.currentPassword}
                            onChange={handleChange}
                            placeholder="********"
                            required
                            error={
                                errors.currentPassword && touched.currentPassword && errors.currentPassword
                            }
                            fullWidth
                        />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="password">
                    {({ field }) => (
                        <TextInput
                            type="password"
                            {...field}
                            title="كلمة المرور"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="********"
                            required
                            error={
                                errors.password && touched.password && errors.password
                            }
                            fullWidth
                        />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="passwordConfirm">
                    {({ field }) => (
                      <TextInput
                        type="password"
                        {...field}
                        title="تأكيد كلمة المرور"
                        placeholder="********"
                        required
                        error={
                          errors.passwordConfirm &&
                          touched.passwordConfirm &&
                          errors.passwordConfirm
                        }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Field name="role">
                    {({ field }) => (
                      <DefaultSelect
                        {...field}
                        options={rolesOptions}
                        optionSelecte={values.role}
                        value={values.role}
                        onChange={handleChange}
                        title="الصلاحيات"
                        placeholder={employee?.role || "اختر الصلاحية"}
                        required
                        error={errors.role && touched.role && errors.role}
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="type">
                    {({ field }) => (
                      <DefaultSelect
                        {...field}
                        options={empTypeOptions}
                        title="نوع الموظف"
                        optionSelecte={values.type}
                        value={values.type}
                        onChange={handleChange}
                        placeholder={employee?.type || "اختر نوع الموظف"}
                        onChange={(e) => {
                          handleChange(e);
                          setFreelanceValue(e.target.value);
                        }}
                        required
                        error={errors.type && touched.type && errors.type}
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  {freelanceValue !== "فريلانسر" && (
                    <Field name="holidays">
                      {({ field }) => (
                        <TextInput
                          {...field}
                          title="أيام الإجازة السنوية"
                          placeholder={employee?.holidays || "أيام الإجازة"}
                          onChange={handleChange}
                          required
                          error={
                            errors.holidays &&
                            touched.holidays &&
                            errors.holidays
                          }
                          fullWidth
                        />
                      )}
                    </Field>
                  )}
                </Grid>
                <Grid item>
                  <Field name="Department">
                    {({ field }) => (
                      <DefaultSelect
                        {...field}
                        options={departments}
                        optionSelecte={values.Department}
                        value={values.Department}
                        onChange={handleChange}
                        title="القسم"
                        placeholder={employee?.Department || "اختر القسم"}
                        required
                        error={
                          errors.Department &&
                          touched.Department &&
                          errors.Department
                        }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item>
                  <Field name="weekEnd">
                    {({ field }) => (
                      <DefaultSelect
                        {...field}
                        options={weekDays}
                        optionSelecte={values.weekDays}
                        value={values.weekDays}
                        onChange={handleChange}
                        title="أيام العطلة الأسبوعية"
                        placeholder={employee?.weekEnd || "اختر أيام العطلة"}
                        required
                        error={
                          errors.weekEnd && touched.weekEnd && errors.weekEnd
                        }
                        fullWidth
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1} justifyContent="center">
          <Grid item>
            <DefaultFileInput
                name="image"
                onChange={onChangeFile}
                title="صورة الملف الشخصي (اختياري)"
                className={"min-w-[15rem]"}
                fullWidth
            />
          </Grid>
          </Grid>

          <Grid container spacing={3} mt={2} justifyContent="center">
            <Grid item>
              <DefaultBtn
                title="تعديل"
                type="submit"
                loading={updateEmployeeStatus === "loading"}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  );
}

export default EditEmployeeForm;
