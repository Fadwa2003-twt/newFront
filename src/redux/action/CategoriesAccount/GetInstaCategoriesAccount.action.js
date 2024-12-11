import axios from "axios";
import {
   FAILED_GET_CATEGORIES_INSTA_ACCOUNT,
  GET_CATEGORIES_INSTA_ACCOUNT,
  START_GET_CATEGORIES_INSTA_ACCOUNT,
} from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const GetInstaCategoriesAccountAction = (values) => {
  const api = rootRoute + "/api/v1/accountcategories/insta";
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return async (dispatch) => {
    dispatch({
      type: START_GET_CATEGORIES_INSTA_ACCOUNT,
    });
    try {
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: GET_CATEGORIES_INSTA_ACCOUNT,
        payload: {
          data: response.data.data,
          numberOfPages: response.data.paginationResult.numberOfPages,
        },
      });
      return { state: true, data: response.data.data };
    } catch (error) {
      dispatch({
        type: FAILED_GET_CATEGORIES_INSTA_ACCOUNT,
      });
      return { state: false };
    }
  };
};

export default GetInstaCategoriesAccountAction;
