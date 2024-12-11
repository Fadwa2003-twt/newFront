import React, { useState } from "react";
import AuthCardComponent from "../../Components/AuthCard.component";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { validationSchemaSignIn } from "../../validationSchema";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import LoginAction from "../../redux/action/User/Login.action";

function LoginPage(props) {
  const [error, setError] = useState(null); // Add error state
  const [reCAPTCHAClicked, setReCAPTCHAClicked] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = { email: "", password: "" };

  const handleSubmit = async (values) => {
    try {
      // if (!reCAPTCHAClicked) {
      //     setShowError(true);
      //     return;
      // }

      const response = await dispatch(LoginAction(values));
      if (response.state) {
        console.log(response);
        navigate("/");
      } else {
        setError("" + response.data); // Set the error state
      }
    } catch (error) {
      setError("An error occurred during login."); // Set the error state
    }
  };

  const handleRecaptchaChange = () => {
    setReCAPTCHAClicked(!reCAPTCHAClicked);
  };

  return (
    <AuthCardComponent>
      <Formik
        initialValues={formData}
        validationSchema={validationSchemaSignIn}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className="flex flex-col gap-5">
            <div className="inputs p-7 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <Field
                  className="border-white border-2 text-white outline-0 placeholder:text-white w-full p-2 rounded-xl text-md font-bold bg-transparent"
                  name="email"
                  placeholder="الايميل"
                  type="email"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 pr-2">{errors.email}</div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Field
                  className="border-white border-2 text-white outline-0 placeholder:text-white w-full p-2 rounded-xl text-md font-bold bg-transparent"
                  name="password"
                  placeholder="كلمه المرور"
                  type="password"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 pr-2">{errors.password}</div>
                )}
              </div>
            </div>
            <div className={"w-full flex justify-center"}>
              {/* <ReCAPTCHA
                sitekey="6LebYbIpAAAAAL_iGosyC5r-FCQ-QBvwas8n6olM"
                onChange={handleRecaptchaChange}
              />
              {!reCAPTCHAClicked && showError && (
                <span className={"text text-danger"}>
                  الرجاء الضغط على ال reCAPTCHA
                </span>
              )} */}
            </div>
            <div className="w-full flex flex-col items-center gap-3">
              <button
                className="bg-white py-2 px-3 rounded-lg font-bold text-sm"
                type="submit"
                disabled={isSubmitting}
              >
                تسجيل دخول
              </button>
              <Link to="/register" className="font-bold text-white text-sm">
                انشاء حساب جديد
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthCardComponent>
  );
}

export default LoginPage;
