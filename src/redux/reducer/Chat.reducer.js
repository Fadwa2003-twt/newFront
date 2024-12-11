import {CREATE_EMPLOYEE_CHAT} from "../Types";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
};
const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EMPLOYEE_CHAT:
            return { ...state, data: action.payload};

        default:
            return state;
    }
}

export default ChatReducer