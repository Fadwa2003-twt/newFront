import {
    CREATE_TWEET,
    CREATE_TWEETS_ACCOUNTS, DELETE_ONE_TWEET, DELETE_TWEETS,
    FAILED_CREATE_TWEET, FAILED_CREATE_TWEETS_ACCOUNTS, FAILED_DELETE_ONE_TWEET, FAILED_DELETE_TWEETS,

    START_CREATE_TWEET,
    START_CREATE_TWEETS_ACCOUNTS, START_DELETE_ONE_TWEET, START_DELETE_TWEETS,
    START_CREATE_INSTA_POSTS_ACCOUNTS,
    CREATE_INSTA_POSTS,
    FAILED_CREATE_INSTA_POSTS_ACCOUNTS, STORE_MESSAGE
} from "../Types";


const initialState = {
    isLoading: false,
    isSuccess: false,
};
const TweetReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CREATE_TWEET:
            return { ...state, isLoading: true };
        case CREATE_TWEET:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_CREATE_TWEET:
            return { ...state, isLoading: false, isSuccess: false };
        case START_CREATE_TWEETS_ACCOUNTS:
            return { ...state, isLoading: true };
        case CREATE_TWEETS_ACCOUNTS:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_CREATE_TWEETS_ACCOUNTS:
            return { ...state, isLoading: false, isSuccess: true };
        case START_DELETE_ONE_TWEET:
            return { ...state, isLoading: true };
        case DELETE_ONE_TWEET:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_DELETE_ONE_TWEET:
            return { ...state, isLoading: false, isSuccess: true };
        case START_DELETE_TWEETS:
            return { ...state, isLoading: true };
        case DELETE_TWEETS:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_DELETE_TWEETS:
            return { ...state, isLoading: false, isSuccess: true };
        case START_CREATE_INSTA_POSTS_ACCOUNTS:
            return { ...state, isLoading: true };
        case CREATE_INSTA_POSTS:
            return { ...state, isLoading: false, isSuccess: true };
        case FAILED_CREATE_INSTA_POSTS_ACCOUNTS:
            return { ...state, isLoading: false, isSuccess: true };
        default:
            return state;
    }
};

export default TweetReducer