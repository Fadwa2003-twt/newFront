import {
    CHECK,
    FAILED_CHECK,
    START_CHECK,


} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const CheckReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CHECK:
            return { ...state, isLoading: true };
        case CHECK:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_CHECK:
            return { ...state, isLoading: false, isSuccess: true };
        default:
            return state;
    }
};

export default CheckReducer