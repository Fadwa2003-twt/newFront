import * as Yup from "yup";

export const validationSchemaSignIn = Yup.object({
    email: Yup.string().email("الايميل غير صحيح").required("الايميل مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
});

export const validationSchemaEmployee = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string()
        .email("صيغة البريد الإلكتروني غير صحيحة")
        .required("البريد الإلكتروني مطلوب"),
    Department: Yup.string().required("فريق الموظف مطلوب"),
    password: Yup.string().required("حقل كلمة المرور مطلوب"),
    passwordConfirm: Yup.string()
        .required("يجب تأكيد كلمة المرور")
        .oneOf([Yup.ref("password"), null], "يجب أن تكون كلمة المرور متطابقة"),
    type: Yup.string().required("نوع الموظف مطلوب"),
    role: Yup.string().required("الصلاحيات مطلوبة"),
});

export const validationSchemaUpdateEmployee = Yup.object({
    Category: Yup.string().required("حقل الفئة مطلوبة"),
});

export const validationSchemaSignUp = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().email("الايميل غير صحيح").required("الايميل مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
    passwordConfirm: Yup.string()
        .oneOf(
            [Yup.ref("password"), null],
            "كلمة المرور وتأكيد كلمة المرور غير متطابقتين"
        )
        .required("تأكيد كلمة المرور مطلوب"),
});
export const validationSchemaCategory = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    supervisor: Yup.string().required("المشرف مطلوب"),
});
export const validationSchemaContact = Yup.object({
    category: Yup.string().required("حقل الفئة مطلوب"),
});

export const validationSchemaCategoryAccount = Yup.object({
    name: Yup.string().required("اسم التصنيف مطلوب"),
});

export const editCategoryAccontValidation = Yup.object({
    name: Yup.string().when("parent", {
        is: (parentValue) => !parentValue || parentValue.trim() === "", // Validate "name" field only if "parent" is empty or contains only whitespace
        then: Yup.string().required("الاسم مطلوب عند عدم تحديد التصنيف الأب."),
        otherwise: Yup.string(), // No validation if "parent" is defined or not empty
    }),
    parent: Yup.string(),
});

export const validationSchemaAccountsFile = Yup.object({
    Category: Yup.string().required("يرجى اختيار احدى الفئات"),
});

export const validationSchemaDepartment = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
});
export const validationSchemaُEditDepartment = Yup.object({
    name: Yup.string(),
    supervisor: Yup.string(),
});

export const validationSchemaُDeleteTweet = Yup.object({
    url: Yup.string().required("الرابط مطلوب").url("يرجى ادخال رابط صالح "),
});

export const validationSchemaFollowAccount = Yup.object({
    nameFollow: Yup.string().required("اسم الحساب الذي تود متابعته مطلوب"),
});

export const validationSchemaUnfollowAccount = Yup.object({
    nameUnfollow: Yup.string().required(
        "اسم الحساب الذي تود إلغاء متابعته مطلوب"
    ),
});
export const validationSchemaReplyAccounts = Yup.object({
    url: Yup.string()
        .required("رابط التغريدة مطلوب")
        .url("يرجى ادخال رابط صالح "),
});

export const validationSchemaUnlock = Yup.object({
    type: Yup.string(),
});

// conversations
export const validationSchemaNewMeeting = Yup.object({
    title: Yup.string().required("عنوان الاجتماع مطلوب"),
});

export const validationSchemaNewEmployeeChat = Yup.object({
    employee_name: Yup.string().required("اسم الموظف مطلوب"),
});

export const validationSchemaNewNotification = Yup.object({
    notification_type: Yup.string().required("نوع الاشعار مطلوب"),
    notification: Yup.string().required("محتوي الاشعار مطلوب"),
});

export const validationSchemaUserCv = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    email: Yup.string().required("الايميل مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    phone: Yup.string().required("الهاتف مطلوب مطلوب"),
    job_name: Yup.string().required("المسمي الوظيفي مطلوب"),
});

export const validationSchemaUserCvEducation = Yup.object({
    name: Yup.string().required("الاسم مطلوب"),
    date_from: Yup.string().required("التاريخ مطلوب"),
    date_to: Yup.string().required("التاريخ مطلوب"),
    university_name: Yup.string().required("اسم الجامعة مطلوب"),
});

export const validationSchemaUserCvExperince = Yup.object({
    company_name: Yup.string().required("الاسم الشركة مطلوب"),
    job_role: Yup.string().required("الوظيفة مطلوبة"),
    date_from: Yup.string().required("التاريخ مطلوب"),
    date_to: Yup.string().required("التاريخ مطلوب"),
    details: Yup.string().required("التفاصيل مطلوبة"),
});
