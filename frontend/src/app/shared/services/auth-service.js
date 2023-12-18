import {get, post} from "./api-client";

const ENDPOINT = "/auth";

function login(email, password) {
    const body = {
        email, password,
    }

    return post(ENDPOINT + "/login", body);
}

function currentUser() {
    return get(ENDPOINT + "/current");
}

const AuthService = {
    login, currentUser
}

export default AuthService;