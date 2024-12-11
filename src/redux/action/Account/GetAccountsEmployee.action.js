import axios from "axios";
import {
  FAILED_GET_ACCOUNTS_EMPLOYEE,
  GET_ACCOUNTS_EMPLOYEE,
  START_GET_ACCOUNTS_EMPLOYEE,
} from "../../Types";
import { roles } from "../../../Routes/roles";
import { rootRoute } from "../../../Routes/Root.route";

const GetAccountsEmployeeAction = (values) => {
  // console.log("test",values);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const api =
    rootRoute +
    "/api/v1/accounts/tweet?employeeUser=" +
    user.data._id +
    "&page=" +
    values.page;
  return async (dispatch) => {
    dispatch({
      type: START_GET_ACCOUNTS_EMPLOYEE,
    });
    try {
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_ACCOUNTS_EMPLOYEE,
        payload: {
          data: response.data.data,
          numberOfPages: response.data.paginationResult.numberOfPages,
          currentPage: response.data.paginationResult.currentPage,
          next: response.data.paginationResult.next,
        },
      });
    } catch (error) {
      dispatch({
        type: FAILED_GET_ACCOUNTS_EMPLOYEE,
      });
    }
  };
};

export default GetAccountsEmployeeAction;
