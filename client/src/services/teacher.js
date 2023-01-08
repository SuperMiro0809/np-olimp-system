import servicesHelper from ".";
import axios from "axios";

function getVerified(pagination, filters, order) {
    let url = `${servicesHelper.url}/teachers?page=${pagination.page}&total=${pagination.total}`;

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

function getNotVerified(page, rows, order) {
    let url = `${servicesHelper.url}/teachers/requests?page=${page}&total=${rows}`;

    if(order) {
        url += `&field=${order.field}&direction=${order.direction}`;
    }

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function accept(id) {
    const url = `${servicesHelper.url}/teachers/accept/${id}`;

    return axios.put(url, {}, {
        headers: servicesHelper.header()
    });
}

function reject(id) {
    const url = `${servicesHelper.url}/teachers/reject/${id}`;

    return axios.put(url, {}, {
        headers: servicesHelper.header()
    });
}

function requestsCount() {
    const url = `${servicesHelper.url}/teachers/requests/count`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const teacherService = {
    getVerified,
    getNotVerified,
    accept,
    reject,
    requestsCount
}

export default teacherService;