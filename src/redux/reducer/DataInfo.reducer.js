import {
    FAILED_GET_DATA_INFO, GET_DATA_INFO,
    START_GET_DATA_INFO,


} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const DataInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_DATA_INFO:
            return {...state, isLoading: true};
        case GET_DATA_INFO:
            return {...state, isLoading: false, isSuccess: true};
        case FAILED_GET_DATA_INFO:
            return {...state, isLoading: false, isSuccess: true};
        default:
            return state;
    }
};

export default DataInfoReducer