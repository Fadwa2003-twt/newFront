import {
    CREATE_CATEGORY_TWEETER_ACCOUNT,
    DELETE_CATEGORY_TWEETER_ACCOUNT, DELETE_SOME_CATEGORIES_ACCOUNTS,
    EDIT_CATEGORY_TWEETER_ACCOUNT, FAILED_DELETE_CATEGORY_TWEETER_ACCOUNT,
    FAILED_GET_CATEGORIES_TWEETER_ACCOUNT,
    GET_CATEGORIES_TWEETER_ACCOUNT, START_DELETE_CATEGORY_TWEETER_ACCOUNT,
    START_GET_CATEGORIES_TWEETER_ACCOUNT,
} from "../Types";


const initialState = {
    data: [],
    numberOfPages: 1,
    isLoadingGetCategoriesAccount: false,
    isSuccessGetCategoriesAccount: false,
    isLoadingCreateCategoryAccount: false,
    isSuccessCreateCategoryAccount: false,
};
const CategoriesAcountReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_CATEGORIES_TWEETER_ACCOUNT:
            return { ...state, isLoadingGetCategoriesAccount: true };
        case GET_CATEGORIES_TWEETER_ACCOUNT:
            return { ...state, data: action.payload.data,numberOfPages:action.payload.numberOfPages, isLoadingGetCategoriesAccount: false, isSuccessGetCategoriesAccount: true };
        case FAILED_GET_CATEGORIES_TWEETER_ACCOUNT:
            return { ...state, isLoadingGetCategoriesAccount: false, isSuccessGetCategoriesAccount: false };
        case CREATE_CATEGORY_TWEETER_ACCOUNT:
            return { ...state, data: [...state.data,action.payload], isLoadingGetCategoriesAccount: false, isSuccessGetCategoriesAccount: true };
        case EDIT_CATEGORY_TWEETER_ACCOUNT:
            console.log(action.payload.updatedDataEdit)
            const updatedDataEdit = state.data.map((categoryAccount) =>
                categoryAccount._id === action.payload.id
                    ? { ...categoryAccount, ...action.payload.updatedDataEdit }
                    : categoryAccount
            );
            return {
                ...state,
                data: updatedDataEdit,
                loading: false,
                error: false,
            };

        case DELETE_CATEGORY_TWEETER_ACCOUNT:
            const updatedData = state.data.filter(
                (categoryAccount) => categoryAccount._id !== action.payload
            );
            return {
                ...state,
                data: updatedData,
            };
        case START_DELETE_CATEGORY_TWEETER_ACCOUNT:
            return {
                ...state,
            };
        case FAILED_DELETE_CATEGORY_TWEETER_ACCOUNT:
            return {
                ...state,
            };

        case DELETE_SOME_CATEGORIES_ACCOUNTS:
            const updatedDataAfterDelete = state.data.filter(
                (category) => !action.payload?.includes(category._id)
            );
            return {...state,data:updatedDataAfterDelete}
        default:
            return state;
    }
};

export default CategoriesAcountReducer