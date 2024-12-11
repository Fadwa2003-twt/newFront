import React from 'react';
import AuthCardComponent from "../../Components/AuthCard.component";
import {Link, useNavigate} from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { validationSchemaSignUp } from "../../validationSchema";
import {useDispatch} from "react-redux";
import {SignUpAction} from "../../redux/action/User/SignUp.action";

function RegisterPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formData = { name: '', email: '', password: '' };

    const handleSubmit = (values) => {
        dispatch(SignUpAction(values));
        navigate('/register');
    };

    return (
        <AuthCardComponent>
            <Formik
                initialValues={formData}
                validationSchema={validationSchemaSignUp}
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
                        <div className="inputs p-7 flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <Field
                                    className="border-white border-2 text-white outline-0 placeholder:text-white w-full p-2 rounded-xl text-md font-bold bg-transparent"
                                    name="name"
                                    placeholder="الاسم"
                                />
                                {errors.name && touched.name && <div className="text-red-500 pr-2">{errors.name}</div>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Field
                                    className="border-white border-2 text-white outline-0 placeholder:text-white w-full p-2 rounded-xl text-md font-bold bg-transparent"
                                    name="email"
                                    placeholder="الايميل"
                                    type="email"
                                />
                                {errors.email && touched.email && <div className="text-red-500 pr-2">{errors.email}</div>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <Field
                                    className="border-white border-2 text-white outline-0 placeholder:text-white w-full p-2 rounded-xl text-md font-bold bg-transparent"
                                    name="password"
                                    placeholder="كلمه المرور"
                                    type="password"
                                />
                                {errors.password && touched.password && <div className="text-red-500 pr-2">{errors.password}</div>}
                            </div>
                        </div>
                        <div className="w-full flex flex-col items-center gap-3">
                            <button className="bg-white py-2 px-3 rounded-lg font-bold text-sm" type="submit" disabled={isSubmitting}>
                                انشاء حساب جديد
                            </button>
                            <Link to="/login" className="font-bold text-white text-sm">
                                تسجيل دخول
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </AuthCardComponent>
    );
}

export default RegisterPage;
