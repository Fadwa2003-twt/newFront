import {
    Get_Charts
} from "../Types";


const initialState = {
    data : {}
};

const ChartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Charts:
            return {...state, data: action.payload.data};
        default:
            return state;
    }
};

export default ChartsReducer