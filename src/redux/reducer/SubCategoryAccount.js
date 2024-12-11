import {
     FAILED_GET_SUB_CATEGORIES_ACCOUNT,
    GET_SUB_CATEGORIES_ACCOUNT,
    START_GET_SUB_CATEGORIES_ACCOUNT,
} from "../Types";


const initialState = {
    data: {},
    isLoadingGetSubCategoriesAccount: false,
    isSuccessGetSubCategoriesAccount: false,
};
const SubCategoriesAcountReducer = (state = initialState, action) => {

    switch (action.type) {
        case START_GET_SUB_CATEGORIES_ACCOUNT:
            return { ...state, isLoadingGetSubCategoriesAccount: true };
        case GET_SUB_CATEGORIES_ACCOUNT:
            return { ...state, data: action.payload, isLoadingGetSubCategoriesAccount: false, isSuccessGetSubCategoriesAccount: true };
        case FAILED_GET_SUB_CATEGORIES_ACCOUNT:
            return { ...state, isLoadingGetSubCategoriesAccount: false, isSuccessGetSubCategoriesAccount: false };
        default:
            return state;
    }
};

export default SubCategoriesAcountReducer