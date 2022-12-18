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

const trainingOrganizationsService = {
    getVerified,
    getNotVerified
}

export default trainingOrganizationsService;