export function loggedInUser(data) {
    return {
        type: "LOGGEDIN_USER",
        payload: data
    }
}

export function showLoader(data){

    return {
        type: "SHOW_LOADER",
        payload: data
    }
}

export function showErrorMsg(data){

    return {
        type: 'SHOW_ERROR',
        payload: data
    }
}

export function setPlanetList(data){

    return {
        type: "SET_PLANET",
        payload: data
    }
}

export function showNoPlanetFound(data) {
    return {
        type: "NO_PLANET_FOUND",
        payload: data
    }
}