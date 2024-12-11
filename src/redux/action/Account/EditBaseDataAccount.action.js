import axios from "axios";
import {
  EDIT_ACCOUNT,
  FAILED_EDIT_ACCOUNT,
  START_EDIT_ACCOUNT,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function EditBaseDataAccountAction(values) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const api = rootRoute + "/api/v1/methods/update";
  const apiGetNewData = rootRoute + "/api/v1/accounts/data";
  return async (dispatch) => {
    dispatch({
      type: START_EDIT_ACCOUNT,
    });

    try {
      const formData = new FormData();
      // const formData2 = new FormData();
      formData.append("account[]", values.account);
      // formData.append("account", "hanifiislam1");
      // formData.append("accounts[]", values.account);
      // formData.append("accountlocation", "Palestine");
      if (values.userName) {
        formData.append("name", values.userName);
      }
      if (values.fullName) {
        formData.append("fullname", values.fullName);
      }
      if (values.image) {
        formData.append("image", values.image);
      }
      if (values.location) {
        formData.append("accountlocation", values.location);
      }

      const response = await axios.post(api, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseGetNewData = await axios.post(
        apiGetNewData,
        { accounts: [values.account] }, // Send JSON data directly as an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set Content-Type to indicate JSON data
          },
        }
      );
      dispatch({
        type: EDIT_ACCOUNT,
        payload: {
          name: responseGetNewData.data.data[0].account,
          updatedDataEdit: responseGetNewData.data.data[0].data,
        },
      });
      aleartsToast("success", "تم تعديل الحساب بنجاح");
    } catch (error) {
      dispatch({
        type: FAILED_EDIT_ACCOUNT,
      });
      aleartsToast(
        "error",
        error.response.data.errors[0].msg || error.response.data.errors[0]
      );
    }
  };
}

export default EditBaseDataAccountAction;
