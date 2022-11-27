import servicesHelper from ".";
import axios from "axios";

function register(data) {
    const url = `${servicesHelper.url}/users/register`;

    return axios.post(url, data, {
        headers: servicesHelper.header
    });
}

const userService = {
    register
}

export default userService;