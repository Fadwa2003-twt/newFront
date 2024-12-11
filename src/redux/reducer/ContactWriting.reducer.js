import {
    CREATE_CONTACTS_WRIRING,
    FAILED_CREATE_CONTACTS_WRIRING,
    FAILED_GET_CONTACTS_WRIRING,
    GET_CONTACTS_WRIRING, START_CREATE_CONTACTS_WRIRING, START_GET_CONTACTS_WRIRING,
} from "../Types";

const initialState = {
    data: [],
    numberOfPages: 1,
    isLoadingGetContactsWriting: false,
    isSuccessGetContactsWriting: false,
    isLoadingCreateContactWriting: false,
    isSuccessCreateContactWriting: false,

};

const ContactWritingReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_CONTACTS_WRIRING:
            return { ...state, isLoadingGetContactsWriting: true };
        case GET_CONTACTS_WRIRING:
            return { ...state, data: action.payload.data,numberOfPages:action.payload.numberOfPages, isLoadingGetContactsWriting: false, isSuccessGetContactsWriting: true };
        case FAILED_GET_CONTACTS_WRIRING:
            return { ...state, isLoadingGetContactsWriting: false, isSuccessGetContactsWriting: false };


        case START_CREATE_CONTACTS_WRIRING:
            return { ...state, isLoadingCreateContactWriting: true };

        case CREATE_CONTACTS_WRIRING:
            return { ...state, data: [...state.data,action.payload], isLoadingCreateContactWriting: false, isSuccessCreateContactWriting: true };

        case FAILED_CREATE_CONTACTS_WRIRING:
            return { ...state, isLoadingCreateContactWriting: false, isSuccessCreateContactWriting: false };
        default:
            return state;
    }
};


export default ContactWritingReducer