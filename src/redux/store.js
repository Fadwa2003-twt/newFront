// ... imports

import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

// Reducers
import EmployeeReducer from "./reducer/Employees.reducer";
import CategoriesReducer from "./reducer/Categories.reducer";
import UsersReducer from "./reducer/Users.reducer";
import UserReducer from "./reducer/User.reducer";
import ContactWritingReducer from "./reducer/ContactWriting.reducer";
import SubCategoriesAcountReducer from "./reducer/SubCategoryAccount";
import CategoriesAcountReducer from "./reducer/CategoriesAcount.reducer";
import AccountReducer from "./reducer/Account.reducer";
import AccountsFileReducer from "./reducer/AccountsFile.reducer";
import DepartmentReducer from "./reducer/Department.reducer";
import TweetReducer from "./reducer/Tweet.reducer";
import LikeReducer from "./reducer/Like.reducer";
import FollowReducer from "./reducer/Follow.reducer";
import ReplyReducer from "./reducer/Reply.reducer";
import CheckReducer from "./reducer/Check.reducer";
import DataInfoReducer from "./reducer/DataInfo.reducer";
import UnLockReducer from "./reducer/UnLock.reducer";
import ShowTweetReducer from "./reducer/ShowTweet.reducer";
import LocationReducer from "./reducer/Location.reducer";
import MessageAccountsReducer from "./reducer/MessageAccounts.reducer";
import NotificationsReducer from "./reducer/Notification.reducer";
import ConversationReducer from "./reducer/Conversation.reducer";
import ChartsReducer from "./reducer/Charts.reducer";
import UserCvReducer from "./reducer/UserCv.reducer";
import ChatReducer from "./reducer/Chat.reducer";
import TweetsForPublisherReducer from "./reducer/TweetsForPublisher.reducer";
import CategoriesInstaAcountReducer from "./reducer/CategoriesInstaAcount.reducer";
import AccountInstaReducer from "./reducer/AccountInsta.reducer";

const rootReducer = combineReducers({
    employees: EmployeeReducer,
    chatEmployees:ChatReducer,
    users: UsersReducer,
    user: UserReducer,
    contacts: ContactWritingReducer,
    categories: CategoriesReducer,
    categoriesAccount: CategoriesAcountReducer,
    categoriesInstaAccount: CategoriesInstaAcountReducer,
    subCategoriesAccount: SubCategoriesAcountReducer,
    accounts:AccountReducer,
    accountsInsta:AccountInstaReducer,
    accountsFile:AccountsFileReducer,
    departments:DepartmentReducer,
    tweet:TweetReducer,
    like:LikeReducer,
    follow:FollowReducer,
    reply:ReplyReducer,
    retweet:ReplyReducer,
    checkCookies:CheckReducer,
    unlock:UnLockReducer,
    dataInfo:DataInfoReducer,
    showTweet:ShowTweetReducer,
    location:LocationReducer,
    messages:MessageAccountsReducer,
    notifications: NotificationsReducer,
    conversations: ConversationReducer,
    tweets : TweetsForPublisherReducer,
    charts : ChartsReducer,
    userCv: UserCvReducer
});

export  const initialStore ={
    user:JSON.parse(localStorage.getItem("user")),
}

const store = createStore(
    rootReducer,
    initialStore,
    applyMiddleware(thunk)
);

export default store;
