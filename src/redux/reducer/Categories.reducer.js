import {
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    DELETE_FILE_CATEGORY,
    DELETE_SOME_CATEGORIES, // use the correct naming here
    EDIT_CATEGORY,
    FAILED_CREATE_CATEGORY,
    FAILED_EDIT_CATEGORY,
    FAILED_GET_CATEGORIES,
    GET_CATEGORIES,
    START_CREATE_CATEGORY,
    START_EDIT_CATEGORY,
    START_GET_CATEGORIES,
} from "../Types";

const initialState = {
    data: [], // Set data as an array instead of an object
    numberOfPages: 1,
    isLoading: false,
    isSuccess: false,
};

const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_CATEGORIES:
            return { ...state };
        case GET_CATEGORIES:
            return { ...state, data: action.payload.data, numberOfPages: action.payload.numberOfPages };
        case FAILED_GET_CATEGORIES:
            return { ...state };
        case START_CREATE_CATEGORY:
            return { ...state, isLoading: true, isSuccess: false };
        case CREATE_CATEGORY:
            return { ...state, data: [...state.data, action.payload], isLoading: false, isSuccess: true };
        case FAILED_CREATE_CATEGORY:
            return { ...state, isLoading: false, isSuccess: false };
        case START_EDIT_CATEGORY:
            return { ...state, isLoading: true, isSuccess: false };
        case EDIT_CATEGORY:
            const updatedDataEdit = state.data.map((category) =>
                category._id === action.payload.id
                    ? { ...category, ...action.payload.updatedDataEdit }
                    : category
            );
            return {
                ...state,
                data: updatedDataEdit,
                isLoading: false,
                error: false,
                isSuccess: true,
            };
        case FAILED_EDIT_CATEGORY:
            return { ...state, isLoading: false, isSuccess: false };

        case DELETE_CATEGORY:
            const updatedData = state.data.filter(
                (category) => category._id !== action.payload
            );
            return { ...state, data: updatedData };

        case DELETE_SOME_CATEGORIES:
            const updatedDataTasks = state.data.filter(
                (category) => !action.payload.includes(category._id)
            );
            return { ...state, data: updatedDataTasks };

        case DELETE_FILE_CATEGORY:
            const updatedCategories = state.data.map((category) => {
                if (category._id === action.payload.categoryId) {
                    const updatedFiles = category.files.filter((file) => file !== action.payload.file);
                    return { ...category, files: updatedFiles };
                }
                return category;
            });
            return { ...state, data: updatedCategories };

        default:
            return state;
    }
};

export default CategoriesReducer;
