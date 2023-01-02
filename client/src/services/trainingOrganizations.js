import servicesHelper from ".";
import axios from "axios";

function getVerified(pagination, filters, order) {
    let url = `${servicesHelper.url}/training-organizations?page=${pagination.page}&total=${pagination.total}`;

    if(filters.length > 0) {
        filters.forEach((filter) => {
            url += `&${filter.label}=${filter.value}`
        })
    }

    if(order.field && order.direction) {
        url += `&field=${order.field}&direction=${order.direction}`;
    }

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function getNotVerified(page, rows) {
    const url = `${servicesHelper.url}/training-organizations/requests?page=${page}&total=${rows}`;

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

function requestsCount() {
    const url = `${servicesHelper.url}/training-organizations/requests/count`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const trainingOrganizationsService = {
    getVerified,
    getNotVerified,
    accept,
    reject,
    requestsCount
}

export default trainingOrganizationsService;