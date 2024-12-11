import axios from "axios";
import { CHECK, FAILED_CHECK, START_CHECK, STORE_MESSAGE } from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";
import { aleartsToast } from "../../../alearts/alearts";
import { combineReducers } from "redux";

const checkInstaAccounts = (values) => {
  const api = rootRoute + "/api/v1/insta/check";
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return async (dispatch) => {
    if (values.accounts.length === 0) {
      aleartsToast("error", "يرجى اختيار بعض الحسابات");
    } else {
      dispatch({
        type: START_CHECK,
      });
      try {
        const response = await axios.post(
          api,
          {
            accounts: values.accounts,
            userAgent: "mobile",
            clear: values.clear,
          }, // Send JSON data directly as an object
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Set Content-Type to indicate JSON data
            },
          }
        );
        console.log("🚀 ~ return ~ response data:", response.data.data);
        console.log("🚀 ~ return ~ response:", response.data.errors);
        // if (response.data.errors) {
        //   // TODO: show all errors
        //   aleartsToast("error", response.data.errors);
        // }
        aleartsToast("success", "تمت العملية بنجاح");
        dispatch({
          type: CHECK,
        });
        dispatch({
          type: STORE_MESSAGE,
          payload: response.data.data,
        });
        return response.data.data;
      } catch (error) {
        aleartsToast("error", error.message, 8000);
        dispatch({
          type: FAILED_CHECK,
        });
      }
    }
  };
};

export default checkInstaAccounts;
