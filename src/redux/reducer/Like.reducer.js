import {
    CREATE_LIKE, DELETE_LIKE, FAILED_CREATE_LIKE,
    FAILED_DELETE_LIKE, START_CREATE_LIKE,
    START_DELETE_LIKE,
} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const LikeReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CREATE_LIKE:
            return {...state, isLoading: true};
        case CREATE_LIKE:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_CREATE_LIKE:
            return {...state, isLoading: false, isSuccess: true};
        case START_DELETE_LIKE:
            return {...state, isLoading: true};
        case DELETE_LIKE:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_DELETE_LIKE:
            return {...state, isLoading: false, isSuccess: true};
        default:
            return state;
    }
};

export default LikeReducer