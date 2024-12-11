import axios from "axios";
import {CREATE_INSTA_ACCOUNT_FILE,
   FAILED_CREATE_INSTA_ACCOUNT_FILE,
   START_CREATE_INSTA_ACCOUNT_FILE
} from "../../Types";
import Swal from "sweetalert2";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function CreateAccountsInstaFileAction(values) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const id = values.supervisor ? values.supervisor : user.data._id;
  const api = rootRoute + "/api/v1/accounts/import/insta";
  return async (dispatch) => {
    dispatch({
      type: START_CREATE_INSTA_ACCOUNT_FILE,
    });
    try {
      const formData = new FormData();
      formData.append("csvFile", values.csvFile);
      formData.append("Category", values.Category);
      formData.append("employeeUser", id);

      const response = await axios.post(api, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.message === "missing") {
        Swal.fire({
          icon: "error",
          title: "فشل",
          html: `
                                    <p> تأكد من صحة البيانات وجود إسم مستخدم و باسورد قبل الإضافة في السطور</p>
                                    <ul>${response.data.missingContent
                                      .map((error) => `<li>${error}</li>`)
                                      .join("")}</ul>
                                    `,
        });
      } else if (response.data.insertedCount === 0) {
        if (!response.data.failedErrors) {
          Swal.fire({
            icon: "error",
            title: "فشل",
            html: `
                                    <p>لم تتم إضافة اي حساب</p>`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "فشل",
            html: `
                                <p>لم تتم إضافة اي حساب</p>
                                <ul>${response.data.failedErrors
                                  .map((error) => `<li>${error.error}</li>`)
                                  .join("")}</ul>`,
          });
        }
      } else if (response.data.failed === 0) {
        Swal.fire({
          icon: "success",
          title: "نجاح",
          text: `تم إضافة ${response.data.insertedCount} حسابات بنجاح`,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "إحذر",
          html: `
                <p>تم إضافة ${response.data.insertedCount} حسابات بنجاح</p>
                <p>حدث خطأ في إضافة ${response.data.failed} حسابات</p>
                       <ul>${response.data.failedErrors
                         .map((error) => `<li>${error.error}</li>`)
                         .join("")}</ul>`,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_CREATE_INSTA_ACCOUNT_FILE,
      });
      aleartsToast("error", error);
    }
  };
}

export default CreateAccountsInstaFileAction;
