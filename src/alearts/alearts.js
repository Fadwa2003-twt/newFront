import Swal from "sweetalert2";

export function aleartsToast(type,text,timer=8000){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: type,
        title: text
    });

}









export function aleart(type,text){
    const Toast = Swal.mixin({
        showConfirmButton: false,
        timer: 8000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: text
    })
}

export const deleteAlert = async (title,text,confirmButtonText,btnTwo = "إلغاء") =>  {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmButtonText,
        cancelButtonText:btnTwo
    })
    return result.isConfirmed
}

export const selectAleart = async (title,placeHolder,objects) =>  {
    const value= await Swal.fire({
        title: title,
        input: "select",
        inputOptions: objects,
        inputPlaceholder:placeHolder,
        showCancelButton: true,
        confirmButtonText:"حفظ",
        cancelButtonText:"إلغاء"
    });

    return value
}


