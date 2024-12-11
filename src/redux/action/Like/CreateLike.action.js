import {
  CREATE_LIKE,
  FAILED_CREATE_LIKE,
  START_CREATE_LIKE,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import axios from "axios";
import { rootRoute } from "../../../Routes/Root.route";
import Swal from "sweetalert2";

console.log("CreateLikeAction");
function CreateLikeAction(values) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const api = rootRoute + "/api/v1/methods/like";
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
        (item) => item.errors && item.errors.length > 0
      );
      const unsuccessfulAccountsCount =
        unsuccessfulAccounts.length > 0
          ? unsuccessfulAccounts.length
          : "No errors";

      const presentResult =
        unsuccessfulAccountsCount > 0
          ? unsuccessfulAccountsCount
          : `...${response.data[0].noOfLike}`;
      let html = `
                <div class="text-center">
                  <p>تم اضافة الايك ل${presentResult} حساب
                  </p>
                </div>
                <ul class="list-group">`;

      const accountErrors = {}; // Use an object to store errors grouped by account

      unsuccessfulAccounts.forEach((item) => {
        const account = item.account;

        if (!accountErrors[account]) {
          accountErrors[account] = [];
        }

        if (typeof item.errors[0] === "string") {
          // Handle the case where errors is a simple string
          accountErrors[account].push(`${account} ${item.errors[0]}`);
        } else {
          // Handle the case where errors is an array of objects
          item.errors.forEach((error) => {
            accountErrors[account].push(
              `${account} ${error.message} في اللينك رقم ${error.counter}`
            );
          });
        }
      });

      Object.keys(accountErrors).forEach((account) => {
        html += `<li class="list-group-item">${accountErrors[account].join(
          '</li><li class="list-group-item">'
        )}</li>`;
      });

      html += `</ul>`;

      let iconType = "";
      if (typeof presentResult === "number") {
        iconType = "warning";
      } else {
        iconType = "success";
      }

      Swal.fire({
        icon: iconType,
        title: "تم",
        html: html,
        showConfirmButton: true,
        confirmButtonText: "حسناً",
      });

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

export default CreateLikeAction;
