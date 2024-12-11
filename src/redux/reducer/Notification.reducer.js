import {
    New_Notification,
    Get_Notifications
} from "../Types";


const initialState = {
    data : []
};

const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Notifications:
            return {...state, data: action.payload.data};
        case New_Notification:
            console.log("i am entering in reduser notification",action.payload)
            return {...state, data: [...state.data , action.payload]};
        default:
            return state;
    }
};

export default NotificationReducer