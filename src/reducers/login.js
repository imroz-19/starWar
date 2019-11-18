const INITIAL_STATE = {loggedInUser: false, showLoader: false, showError: false};

export default function (state = INITIAL_STATE, action) {

    const payload = action.payload;

    switch (action.type) {
        case "LOGGEDIN_USER":
            return {...state, loggedInUser: payload};
        case "SHOW_LOADER":
            return {...state, showLoader: payload};
        case "SHOW_ERROR":
            return {...state, showError: payload};
        default:
            return state
    }

}
