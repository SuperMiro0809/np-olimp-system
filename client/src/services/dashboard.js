import servicesHelper from ".";
import axios from "axios";

function index() {
    let url = `${servicesHelper.url}/dashboard`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const dashboardService = {
    index
}

export default dashboardService;