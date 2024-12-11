import DeleteDepartmentAction from "../redux/action/Department/DeleteDepartment.action";
import {aleartsToast} from "../alearts/alearts";

export const handleSomeDelete = (selectedRows,setSelectedRows,data,dispatchFunction) => {
    if (selectedRows.length > 0) {
        const departmentsToDelete = data.filter((dept) =>
            selectedRows.includes(dept.id)
        );
        departmentsToDelete.forEach((item) =>
            dispatchFunction(item)
        );
        setSelectedRows([]); // Clear selected rows after deletion
    } else {
        aleartsToast("error", "يرجى اختيار بعض الأقسام لحذفها");
    }
};

export const handelEdit = (selectedRows, data,
                                   setOpenModal,setItemEdit,textError) => {
    if (selectedRows.length === 1) {
        const itemEdit = data.find(
            (dept) => dept.id === selectedRows[0]
        );
        setItemEdit(itemEdit);
        setOpenModal(true);
    } else {
        aleartsToast("error", textError);
    }
}