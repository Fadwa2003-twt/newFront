import {
    DELETE_FOLLOW,
    FAILED_DELETE_FOLLOW,
    START_DELETE_FOLLOW,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";
import Swal from "sweetalert2"

function DeleteInstaFollowAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/insta/follow/delete"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_FOLLOW
        })

        try {

            const response = await axios.post(
                api,
                {
                    accounts:values.accounts,
                    follow:values.follow
                }, // Send JSON data directly as an object
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                    },
                }
            );
            const unsuccessfulAccounts = response.data.filter((item) => item.errors && item.errors.length > 0);
                const unsuccessfulAccountsCount = unsuccessfulAccounts.length;

                let html = `
                    <div class="text-center">`
                    if(unsuccessfulAccountsCount > 0)
                    {
                        html += `<p>لم يتم عمل إلغاء المتابعة لـ ${unsuccessfulAccountsCount} حساب</p>
                        </div>
                        <ul class="list-group">`;
                    }
                    else {
                        html += `<p>تمت إلغاء متابعة لكل الحسابات</p>`
                    }
                const accountErrors = {}; // Use an object to store errors grouped by account
                unsuccessfulAccounts.forEach((item) => {
                    const account = item.account;
                    
                    if (!accountErrors[account]) {
                        accountErrors[account] = [];
                    }
                    
                    if (typeof item.errors[0] === 'string') {
                        // Handle the case where errors is a simple string
                        accountErrors[account].push(`${account} ${item.errors}`);
                        console.log(item.errors[0]);
                    } else {
                        // Handle the case where errors is an array of objects
                        item.errors.forEach((error) => {
                            accountErrors[account].push(`${account} ${error.message} في اللينك رقم ${error.counter}`);
                        });
                    }
                });

                Object.keys(accountErrors).forEach((account) => {
                    html += `<li class="list-group-item">${accountErrors[account].join('</li><li class="list-group-item">')}</li>`;
                    console.log(accountErrors[account]);
                });

                html += `</ul>`;
                if(unsuccessfulAccountsCount > 0){
                    Swal.fire({
                        title: 'تم إزالة المتابعة',
                        html: html,
                        icon: 'warning',
                        confirmButtonText: 'موافق'
                    })
                }
                else {
                    Swal.fire({
                        title: 'تم إزالة المتابعة',
                        html: html,
                        icon: 'success',
                        confirmButtonText: 'موافق'
                    })
                
                }
            // let textAlert = ""
            // response.data.map((tweet) => {
            //     if(tweet.errors) {
            //         textAlert = textAlert +" لم يتم عمل المتابعة " + tweet.account + "\n"
            //     }
            // })
            // if(textAlert){
            //     aleartsToast("error", textAlert ,8000)
            // }

            dispatch({
                type: DELETE_FOLLOW,
                payload:values.id
            })
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم إلغاء المتابعة")
            dispatch({
                type: FAILED_DELETE_FOLLOW
            })

        }

    }
}

export default DeleteInstaFollowAction