// import axios from "axios";
// import {GET_RATE} from "../../Types";
// import {rootRoute} from "../../../Routes/Root.route";
//
// const GetPerformRateAction = (values) => {
//     const user = JSON.parse(localStorage.getItem("user"))
//     const token = user.token
//     const api =rootRoute + `/api/v1/conversations/performrate/${user.data._id}`
//     return async (dispatch) => {
//         try {
//             const response = await axios.get(api, {
//                 headers: { Authorization: `Bearer ${token}` }});
//                 dispatch({
//                     type: GET_RATE,
//                     payload: response.data.data,
//                 })
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
//
// export default GetPerformRateAction