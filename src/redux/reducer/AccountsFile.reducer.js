// import {
//     CREATE_ACCOUNT_FILE, FAILED_CREATE_ACCOUNT_FILE, START_CREATE_ACCOUNT_FILE,
// } from "../Types";
//
// const initialState = {
//     data: [],
//     isLoadingGetAccounts: false,
//     isSuccessGetAccounts: false,
//
// };
//
// const AccountsFileReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case START_CREATE_ACCOUNT_FILE:
//             return { ...state, isLoadingGetAccounts: true };
//         case CREATE_ACCOUNT_FILE:
//             console.log("reducer account create")
//             return { ...state, data: [...state.data,...action.payload], isLoadingGetAccounts: false, isSuccessGetAccounts: true };
//         case FAILED_CREATE_ACCOUNT_FILE:
//             return { ...state, isLoadingGetAccounts: false, isSuccessGetAccounts: false };
//         default:
//             return state;
//     }
// };
//
//
// export default AccountsFileReducer