import servicesHelper from ".";
import axios from "axios";

function show(path) {
    let url = `${servicesHelper.url}/file?path=${path}`;

    return axios.get(url, {
        responseType: 'blob',
        headers: servicesHelper.header()
    });
}

const fileService = {
    show
}

export default fileService;