import {
    CREATE_LOCATION, FAILED_CREATE_LOCATION,
    FAILED_GET_LOCATION,
    GET_LOCATION, START_CREATE_LOCATION,
    START_GET_LOCATION,
} from "../Types";


const initialState = {
    data: [],
    numberOfPages: 1,
    isLoading: false,
    isSuccess: false,
};
const LocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_LOCATION:
            return { ...state, isLoading: true };
        case GET_LOCATION:
            return { ...state, data: action.payload.data,numberOfPages:action.payload.numberOfPages, isLoading: false, isSuccess: true };
        case FAILED_GET_LOCATION:
            return { ...state, isLoading: false, isSuccess: false };
        case START_CREATE_LOCATION:
            return { ...state, isLoading: true };
        case CREATE_LOCATION:
            return { ...state,isLoading: false, isSuccess: true };
        case FAILED_CREATE_LOCATION:
            return { ...state, isLoading: false, isSuccess: false };
        default:
            return state;
    }
};

export default LocationsReducer