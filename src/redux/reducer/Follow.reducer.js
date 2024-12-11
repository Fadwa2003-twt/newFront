import {
    CREATE_FOLLOW,
    DELETE_FOLLOW, FAILED_CREATE_FOLLOW,
    FAILED_DELETE_FOLLOW,
    START_CREATE_FOLLOW,
    START_DELETE_FOLLOW,
} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const FollowReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CREATE_FOLLOW:
            return {...state, isLoading: true};
        case CREATE_FOLLOW:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_CREATE_FOLLOW:
            return {...state, isLoading: false, isSuccess: true};
        case START_DELETE_FOLLOW:
            return {...state, isLoading: true};
        case DELETE_FOLLOW:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_DELETE_FOLLOW:
            return {...state, isLoading: false, isSuccess: true};
        default:
            return state;
    }
};

export default FollowReducer