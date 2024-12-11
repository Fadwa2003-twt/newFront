import {
    CREATE_EMPLOYEE,
    DELETE_EMPLOYEE, EDIT_EMPLOTEE, FAILED_EDIT_EMPLOTEE,
    FAILED_GET_EMPLOYEES,
    GET_EMPLOYEES, START_EDIT_EMPLOTEE,
    START_GET_EMPLOYEES,
    DELETE_SOME_EMPLOYEE
} from "../Types";

const initialState = {
    data: [],
    numberOfPages: 1,
    isLoading: false,
    isSuccess: false,
};

const EmployeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_EMPLOYEES:
            return { ...state };
        case GET_EMPLOYEES:
            return { ...state, data: action.payload.data,numberOfPages:action.payload.numberOfPages };
        case FAILED_GET_EMPLOYEES:
            return { ...state, isLoading: false};
        case CREATE_EMPLOYEE:
            return { ...state, data: [...state.data,action.payload]};

        case START_EDIT_EMPLOTEE:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
            };
        case EDIT_EMPLOTEE:
            const updatedDataEdit = state.data.map((employee) =>
                employee._id === action.payload._id
                    ? { ...employee, ...action.payload }
                    : employee
            );
            return {
                ...state,
                data: updatedDataEdit,
                isLoading: false,
                isSuccess: true,
            };
        case FAILED_EDIT_EMPLOTEE:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
            };
        case DELETE_EMPLOYEE:
            const updatedData = state.data.filter(
                (employee) => employee._id !== action.payload
            );
            return {
                ...state,
                data: updatedData,
            };
        case DELETE_SOME_EMPLOYEE:
            const updatedDataTasks = state.data.filter(
                (employee) => !action.payload.includes(employee._id)
            );
            return {
                ...state,
                data: updatedDataTasks,
            };
            
        default:
            return state;
    }
};


export default EmployeesReducer