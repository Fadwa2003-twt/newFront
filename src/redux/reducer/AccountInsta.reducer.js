import {
    CHECK, CREATE_INSTA_ACCOUNT_FILE,
    DELETE_ACCOUNT, DELETE_SOME_INSTA_ACCOUNTS,
    EDIT_INSTA_ACCOUNT,
    FAILED_CREATE_INSTA_ACCOUNT_FILE,
    FAILED_EDIT_INSTA_ACCOUNT,
    FAILED_GET_INSTA_ACCOUNTS,
    GET_INSTA_ACCOUNTS, GET_INSTA_ACCOUNTS_CATEGORY,
    START_CREATE_INSTA_ACCOUNT_FILE,
    START_EDIT_INSTA_ACCOUNT,
    START_GET_INSTA_ACCOUNTS,
} from "../Types";

const initialState = {
    data: [],
    numberOfPages: 1,
    currentPage: 1,
    next: 0,
    isLoading: false,
    isSuccess: false,
};

const AccountInstaReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_INSTA_ACCOUNTS:
            return { ...state, isLoading: true };
        case GET_INSTA_ACCOUNTS:
            return {
                ...state,
                data: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
                currentPage: action.payload.currentPage,
                next: action.payload.next,
                isLoading: false,
                isSuccess: true,
            };
        case FAILED_GET_INSTA_ACCOUNTS:
            return { ...state, isLoading: false, isSuccess: false };

        case GET_INSTA_ACCOUNTS_CATEGORY:
            return {
                ...state,
                data: action.payload.data,
                numberOfPages: action.payload.numberOfPages,
                currentPage: action.payload.currentPage,
                next: action.payload.next,
            };

        case START_EDIT_INSTA_ACCOUNT:
            return { ...state, isLoading: true, isSuccess: false };
        case EDIT_INSTA_ACCOUNT:
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
        case FAILED_EDIT_INSTA_ACCOUNT:
            return { ...state, isLoading: false, isSuccess: false };
        case START_CREATE_INSTA_ACCOUNT_FILE:
            return { ...state, isLoading: true };
        case CREATE_INSTA_ACCOUNT_FILE:
            return {
                ...state,
                data: [...state.data, ...action.payload],
                isLoading: false,
                isSuccess: true,
            };
        case FAILED_CREATE_INSTA_ACCOUNT_FILE:
            return { ...state, isLoading: false, isSuccess: false };
        case DELETE_ACCOUNT:
            const updatedData = state.data.filter(
                (account) => account._id !== action.payload
            );
            return {
                ...state,
                data: updatedData,
            };

        case DELETE_SOME_INSTA_ACCOUNTS:
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

export default AccountInstaReducer;
