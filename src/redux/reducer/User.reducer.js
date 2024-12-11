import {FAILED_LOGIN, START_LOGIN, USER_LOGIN, GET_RATE} from "../Types";

const initialState = {
    data: {},
    rate: 0,
    isLoading: false,
    isSuccess: false,
    isFailed: false,
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOGIN:
            console.log("START_LOGIN");
            return { ...state, isLoading: true };
        case USER_LOGIN:
            console.log("USER_LOGIN", action.payload);
            return { ...state, data: action.payload, isLoading: false, isSuccess: true, rate: action.payload.rating || 0 };
        case FAILED_LOGIN:
            console.log("FAILED_LOGIN");
            return { ...state, isLoading: false, isSuccess: false, isFailed: true };
        case GET_RATE:
            console.log("GET_RATE", action.payload);
            return { ...state, rate: action.payload.rating };
        default:
            return state;
    }
};

export default UserReducer;
