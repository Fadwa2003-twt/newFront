import {
  CREATE_LIKE,
  FAILED_CREATE_LIKE,
  START_CREATE_LIKE,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import axios from "axios";
import { rootRoute } from "../../../Routes/Root.route";
import Swal from "sweetalert2";

console.log("CreateLikeInstaAction");
function CreateLikeInstaAction(values) {
  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.token;
  const api = rootRoute + "/api/v1/insta/like";
  return async (dispatch) => {
    dispatch({
      type: START_CREATE_LIKE,
    });

    try {
      const response = await axios.post(
        api,
        {
          accounts: values.accounts,
          url: values.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const unsuccessfulAccounts = response.data.filter(
        (item) => item.status === "error"
      );
      const unsuccessfulAccountsCount = unsuccessfulAccounts.length;

      let html = `
       <div class="text-center">
         <p>لم يتم اضافة اللايك لـ ${unsuccessfulAccountsCount} حساب</p>
       </div>
       <ul class="list-group">`;

      const accountErrors = {}; // Use an object to store errors grouped by account

      unsuccessfulAccounts.forEach((item) => {
        const account = item.user;

        if (!accountErrors[account]) {
          accountErrors[account] = [];
        }

        accountErrors[account].push(`${account} ${item.message}`);
      });

      Object.keys(accountErrors).forEach((account) => {
        html += `<li class="list-group-item">${accountErrors[account].join(
          '</li><li class="list-group-item">'
        )}</li>`;
      });

      html += `</ul>`;

      let iconType = "";
      if (unsuccessfulAccountsCount > 0) {
        iconType = "warning";
      } else {
        iconType = "success";
      }

      if (iconType === "success") {
        Swal.fire({
          icon: iconType,
          title: "تم",
          text: "تم اضافة اللايك بنجاح",
          showConfirmButton: true,
          confirmButtonText: "حسناً",
        });
      } else {
        Swal.fire({
          icon: iconType,
          title: "تم",
          html: html,
          showConfirmButton: true,
          confirmButtonText: "حسناً",
        });
      }

      dispatch({
        type: CREATE_LIKE,
        payload: values.id,
      });
    } catch (error) {
      console.log(error);
      aleartsToast("error", "خطأ !! لم يتم عمل اللايك");
      dispatch({
        type: FAILED_CREATE_LIKE,
      });
    }
  };
}

export default CreateLikeInstaAction;
