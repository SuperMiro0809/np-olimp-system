import servicesHelper from ".";
import axios from "axios";

function register(data) {
    const url = `${servicesHelper.url}/users/register`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function login(data) {
    const url = `${servicesHelper.url}/users/login`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function logout() {
    const url = `${servicesHelper.url}/users/logout`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function profile() {
    const url = `${servicesHelper.url}/users/profile`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function edit(data, id) {
    const url = `${servicesHelper.url}/users/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function changePassword(data, id) {
    const url = `${servicesHelper.url}/users/${id}/changePassword`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

const userService = {
    register,
    login,
    logout,
    profile,
    edit,
    changePassword
}

export default userService;