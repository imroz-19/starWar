const INITIAL_STATE = {list: [], showNoResultError: false};

export default function (state = INITIAL_STATE, action) {

    const payload = action.payload;

    switch (action.type) {
        case "SET_PLANET":
            return {...state, list: payload};
        case "NO_PLANET_FOUND":
            return {...state, showNoResultError: payload};
        default:
            return state
    }

}
