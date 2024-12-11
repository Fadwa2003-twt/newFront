import {
    FAILED_UNLOCK,
    START_UNLOCK, STORE_MESSAGE, UNLOCK,


} from "../Types";


const initialState = {
    messageState:[],
};
const UnLockReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_MESSAGE:
            return { ...state, messageState: [...action.payload]};
        default:
            return state;
    }
};

export default UnLockReducer