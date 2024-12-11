import {
  CHECK,
  CREATE_ACCOUNT_FILE,
  DELETE_ACCOUNT,
  DELETE_SOME_ACCOUNTS,
  EDIT_ACCOUNT,
  FAILED_CREATE_ACCOUNT_FILE,
  FAILED_EDIT_ACCOUNT,
  FAILED_GET_ACCOUNTS,
  GET_ACCOUNTS,
  GET_ACCOUNTS_CATEGORY,
  GET_ACCOUNTS_EMPLOYEE,
  START_CREATE_ACCOUNT_FILE,
  START_EDIT_ACCOUNT,
  START_GET_ACCOUNTS,
} from "../Types";

const initialState = {
  data: [],
  numberOfPages: 1,
  currentPage: 1,
  next: 0,
  isLoading: false,
  isSuccess: false,
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GET_ACCOUNTS:
      return { ...state, isLoading: true };
    case GET_ACCOUNTS:
      return {
        ...state,
        data: action.payload.data,
        numberOfPages: action.payload.numberOfPages,
        currentPage: action.payload.currentPage,
        next: action.payload.next,
        isLoading: false,
        isSuccess: true,
      };
    case FAILED_GET_ACCOUNTS:
      return { ...state, isLoading: false, isSuccess: false };
    case GET_ACCOUNTS_EMPLOYEE:
      return {
        ...state,
        data: action.payload.data,
        numberOfPages: action.payload.numberOfPages,
        currentPage: action.payload.currentPage,
        next: action.payload.next,
      };
    case GET_ACCOUNTS_CATEGORY:
      return {
        ...state,
        data: action.payload.data,
        numberOfPages: action.payload.numberOfPages,
        currentPage: action.payload.currentPage,
        next: action.payload.next,
      };

    case START_EDIT_ACCOUNT:
      return { ...state, isLoading: true, isSuccess: false };
    case EDIT_ACCOUNT:
      const updatedDataEdit = state.data.map((account) => {
        if (account.name === action.payload.name) {
          // Merge the updated payload with the existing account data
          return {
            ...account,
            AccountDataInfo1: action.payload.updatedDataEdit,
          };
        } else {
          return account;
        }
      });

      return {
        ...state,
        data: updatedDataEdit,
        isLoading: false,
        isSuccess: true,
      };
    case FAILED_EDIT_ACCOUNT:
      return { ...state, isLoading: false, isSuccess: false };
    case START_CREATE_ACCOUNT_FILE:
      return { ...state, isLoading: true };
    case CREATE_ACCOUNT_FILE:
      return {
        ...state,
        data: [...state.data, ...action.payload],
        isLoading: false,
        isSuccess: true,
      };
    case FAILED_CREATE_ACCOUNT_FILE:
      return { ...state, isLoading: false, isSuccess: false };
    case DELETE_ACCOUNT:
      const updatedData = state.data.filter(
        (account) => account._id !== action.payload
      );
      return {
        ...state,
        data: updatedData,
      };

    case DELETE_SOME_ACCOUNTS:
      const updatedDataAccount = state.data.filter(
        (account) => !action.payload.includes(account._id)
      );
      return {
        ...state,
        data: updatedDataAccount,
      };

    case CHECK:
      return { ...state, isLoading: false, isSuccess: true };

    // case CREATE_ACCOUNT_FILE:
    //     return {...state, data: [...state.data, ...action.payload]};
    default:
      return state;
  }
};

export default AccountReducer;
