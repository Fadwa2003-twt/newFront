import {
    FAILED_UNLOCK,
    START_UNLOCK, UNLOCK,


} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const UnLockReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_UNLOCK:
            return { ...state, isLoading: true };
        case UNLOCK:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_UNLOCK:
            return { ...state, isLoading: false, isSuccess: true };
        default:
            return state;
    }
};

export default UnLockReducer