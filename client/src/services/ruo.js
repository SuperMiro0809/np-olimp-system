import servicesHelper from ".";
import axios from "axios";

function getAll() {
    let url = `${servicesHelper.url}/ruo`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const ruoService = {
    getAll
}

export default ruoService;