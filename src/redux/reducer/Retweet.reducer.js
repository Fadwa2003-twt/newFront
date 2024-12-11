import {
     CREATE_RETWEET,
    DELETE_RETWEET, FAILED_CREATE_RETWEET,
    FAILED_DELETE_RETWEET,
    START_CREATE_RETWEET, START_DELETE_RETWEET,
} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const RetweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CREATE_RETWEET:
            return {...state, isLoading: true};
        case CREATE_RETWEET:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_CREATE_RETWEET:
            return {...state, isLoading: false, isSuccess: true};
        case START_DELETE_RETWEET:
            return {...state, isLoading: true};
        case DELETE_RETWEET:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_DELETE_RETWEET:
            return {...state, isLoading: false, isSuccess: true};
        default:
            return state;
    }
};

export default RetweetReducer