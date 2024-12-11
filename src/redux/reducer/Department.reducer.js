import {
    CREATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    DELETE_SOME_DEPARTMENTS,
    EDIT_DEPARTMENT,
    FAILED_DELETE_DEPARTMENT,
    FAILED_GET_DEPARTMENT,
    GET_DEPARTMENT,
    START_DELETE_DEPARTMENT,
    START_GET_DEPARTMENT,
} from "../Types";


const initialState = {
    data: [],
    numberOfPages: 1,
    isLoadingGetDepartment: false,
    isSuccessGetDepartment: false,
    isLoadingCreateDepartment: false,
    isSuccessCreateDepartment: false,
};
const DepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GET_DEPARTMENT:
            return { ...state, isLoadingGetDepartment: true };
        case GET_DEPARTMENT:
            return { ...state, data: action.payload.data,numberOfPages:action.payload.numberOfPages, isLoadingGetDepartment: false, isSuccessGetDepartment: true };
        case FAILED_GET_DEPARTMENT:
            return { ...state, isLoadingGetDepartment: false, isSuccessGetDepartment: false };
        case CREATE_DEPARTMENT:
            return {
                ...state,
                data:[...state.data,action.payload],
                isLoadingCreateDepartment: false,
                isSuccessCreateDepartment: true,
            };

        case EDIT_DEPARTMENT:
            const updatedDataEdit = state.data.map((department) =>
                department._id === action.payload.id
                    ? { ...department, ...action.payload.updatedDataEdit }
                    : department
            );
            return {
                ...state,
                data: updatedDataEdit,
            };

        case DELETE_DEPARTMENT:
            const updatedData = state.data.filter(
                (department) => department._id !== action.payload
            );
            return {
                ...state,
                data: updatedData,
            };
        case START_DELETE_DEPARTMENT:
            return {
                ...state,
            };
        case FAILED_DELETE_DEPARTMENT:
            return {
                ...state,
            };

        case DELETE_SOME_DEPARTMENTS:
            const updatedDataTasks = state.data.filter(
                (department) => !action.payload.includes(department._id)
            );
            return {
                ...state,
                data: updatedDataTasks,
            };
        default:
            return state;
    }
};

export default DepartmentReducer