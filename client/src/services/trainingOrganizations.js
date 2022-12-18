import servicesHelper from ".";
import axios from "axios";

function getVerified() {
    const url = `${servicesHelper.url}/training-organizations`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function getNotVerified() {
    const url = `${servicesHelper.url}/training-organizations/requests`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function accept(id) {
    const url = `${servicesHelper.url}/training-organizations/accept/${id}`;

    return axios.put(url, {}, {
        headers: servicesHelper.header()
    });
}

function reject(id) {
    const url = `${servicesHelper.url}/training-organizations/reject/${id}`;

    return axios.put(url, {}, {
        headers: servicesHelper.header()
    });
}

const trainingOrganizationsService = {
    getVerified,
    getNotVerified,
    accept,
    reject
}

export default trainingOrganizationsService;