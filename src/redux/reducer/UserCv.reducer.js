import {
    Get_Cv,
    New_Cv
} from "../Types";


const initialState = {
    data : null
};

const UserCvReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Cv:
            return {...state, data: action.payload.data};
        case New_Cv:
            return {...state, data: [...state.data , action.payload]};
        default:
            return state;
    }
};

export default UserCvReducer