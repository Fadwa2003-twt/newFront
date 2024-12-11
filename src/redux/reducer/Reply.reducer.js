import {
    CREATE_REPLY_ACCOUNTS,
    FAILED_CREATE_REPLY_ACCOUNTS,
    START_CREATE_REPLY_ACCOUNTS,


} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const ReplyReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CREATE_REPLY_ACCOUNTS:
            return { ...state, isLoading: true };
        case CREATE_REPLY_ACCOUNTS:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_CREATE_REPLY_ACCOUNTS:
            return { ...state, isLoading: false, isSuccess: true };
        default:
            return state;
    }
};

export default ReplyReducer