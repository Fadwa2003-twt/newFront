import axios from "axios";

const UsersReducer = (state = [],action) => {
    switch (action.type){
        case "SIGN_UP_SUCCESS" :
            return action.payload
        default:
            return state
    }
}

export default UsersReducer