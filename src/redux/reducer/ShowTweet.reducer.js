import {
    FAILED_SHOW_TWEET,
    SHOW_TWEET,
    START_SHOW_TWEET,


} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const ShowTweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_SHOW_TWEET:
            return { ...state, isLoading: true };
        case SHOW_TWEET:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_SHOW_TWEET:
            return { ...state, isLoading: false, isSuccess: true };
        default:
            return state;
    }
};

export default ShowTweetReducer