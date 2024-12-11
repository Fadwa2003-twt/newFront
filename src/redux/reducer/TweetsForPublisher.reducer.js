import {
    CHECK_ACCOUNT_TWEET,
    CREATE_TWEET_FOR_PUBLISHER,
    FAILED_CHECK_ACCOUNT_TWEET,
    FAILED_CREATE_TWEET_FOR_PUBLISHER,
    FAILED_GET_TWEETS,
    FAILED_PUBLISH_TWEET,
    GET_TWEETS_FOR_EMPLOYEE,
    GET_TWEETS_NOT_PUBLISH,
    PUBLISH_TWEET,
    START_CHECK_ACCOUNT_TWEET,
    START_CREATE_TWEET_FOR_PUBLISHER,
    START_GET_TWEETS,
    START_PUBLISH_TWEET
} from "../Types";

const initialState = {
    data: [],
    numberOfPages: 1,
    isLoadingGetTweets: false,
    isSuccessGetTweets: false,
    isLoadingCreateTweet: false,
    isSuccessCreateTweet: false,
    isLoadingPublishTweet: false,
    isSuccessPublishTweet: false,
    isSuccessCheckAccountTweet: false,
};

const TweetsForPublisherReducer = (state = initialState, action) => {
    switch (action.type) {

        case START_PUBLISH_TWEET:
            return {...state, isLoadingPublishTweet: true};

        case PUBLISH_TWEET:
            const updatedData = state.data.map(tweet => {

                if (tweet._id === action.payload) {
                    return {...tweet, state: "تم النشر"};
                }
                return tweet;
            });

            return {...state, data: updatedData,isSuccessPublishTweet:true,isLoadingPublishTweet:false};

        case FAILED_PUBLISH_TWEET:
            return {...state, isLoadingPublishTweet: false, isSuccessPublishTweet: false};

        case START_GET_TWEETS:
            return {...state, isLoadingGetTweets: true};

        case GET_TWEETS_NOT_PUBLISH:
            return {...state, data: action.payload.data, numberOfPages: action.payload.numberOfPages};

        case GET_TWEETS_FOR_EMPLOYEE:
            return {...state, data: action.payload.data, numberOfPages: action.payload.numberOfPages};


        case FAILED_GET_TWEETS:
            return {...state, isLoadingGetTweets: false, isSuccessGetTweets: false};

        case START_CREATE_TWEET_FOR_PUBLISHER:
            return {...state, isLoadingCreateTweet: true};

        case CREATE_TWEET_FOR_PUBLISHER:
            return {...state, isLoadingCreateTweet:false,isSuccessCreateTweet: false};


        case FAILED_CREATE_TWEET_FOR_PUBLISHER:
            return {...state, isLoadingCreateTweet: false, isSuccessCreateTweet: false};

        case START_CHECK_ACCOUNT_TWEET:
            return {...state, isLoadingCheckAccountTweet: true};
        case CHECK_ACCOUNT_TWEET:
            console.log(action.payload);
            const updatedData2 = state.data.map(tweet => {
                for (let i = 0; i < action.payload.length; i++) {
                    const payloadItem = action.payload[i];
                    if (tweet.account.name === payloadItem.user) {
                        return {
                            ...tweet,
                            account: {
                                ...tweet.account,
                                AccountStatus: payloadItem.message
                            }
                        };
                    }
                }
                return tweet;
            });

            console.log(updatedData2);
            return {
                ...state,
                data: updatedData2,
                isLoadingCheckAccountTweet: false,
                isSuccessCheckAccountTweet: true
            };


        case FAILED_CHECK_ACCOUNT_TWEET:
            return {...state, isLoadingCheckAccountTweet: false,isSuccessCheckAccountTweet:false};
        default:
            return state;

    }
}

export default TweetsForPublisherReducer