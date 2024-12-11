import {
    DELETE_LIKE,
    FAILED_DELETE_LIKE,
    START_DELETE_LIKE,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";
import Swal from "sweetalert2";

function DeleteLikeAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/methods/like/delete"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_LIKE
        })

        try {

            const response = await axios.post(
                api,
                {
                    accounts:values.accounts,
                    url:values.url
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
              <div class="text-center">
                <p>لم يتم اضافة اللايك لـ ${unsuccessfulAccountsCount} حساب</p>
              </div>
              <ul class="list-group">`;
            
            const accountErrors = {}; // Use an object to store errors grouped by account
            
            unsuccessfulAccounts.forEach((item) => {
              const account = item.account;
            
              if (!accountErrors[account]) {
                accountErrors[account] = [];
              }
            
              if (typeof item.errors[0] === 'string') {
                // Handle the case where errors is a simple string
                accountErrors[account].push(`${account} ${item.errors[0]}`);
              } else {
                // Handle the case where errors is an array of objects
                item.errors.forEach((error) => {
                  accountErrors[account].push(`${account} ${error.message} في اللينك رقم ${error.counter}`);
                });
              }
            });
            
            Object.keys(accountErrors).forEach((account) => {
              html += `<li class="list-group-item">${accountErrors[account].join('</li><li class="list-group-item">')}</li>`;
            });
            
            html += `</ul>`;
            
            let iconType = '';
            if (unsuccessfulAccountsCount > 0) {
              iconType = 'warning';
            } else {
              iconType = 'success';
            }
            
            Swal.fire({
              icon: iconType,
              title: 'تم',
              html: html,
              showConfirmButton: true,
              confirmButtonText: 'حسناً',
            });

            dispatch({
                type: DELETE_LIKE,
                payload:values.id
            })
        } catch (error) {
            console.log(error);
            aleartsToast("error","خطأ !! لم يتم حذف اللايك")
            dispatch({
                type: FAILED_DELETE_LIKE
            })

        }

    }
}

export default DeleteLikeAction