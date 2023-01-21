import servicesHelper from ".";
import axios from "axios";

function getVerified(schoolId, pagination, filters, order) {
    let url = `${servicesHelper.url}/${schoolId}/teachers?page=${pagination.page}&total=${pagination.total}`;

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

function create(schoolId, data) {
    const url = `${servicesHelper.url}/${schoolId}/teachers`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteTeachers(schoolId, selected) {
    const url = `${servicesHelper.url}/${schoolId}/teachers`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function edit(schoolId, data, id) {
    const url = `${servicesHelper.url}/${schoolId}/teachers/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function getById(schoolId, id) {
    const url = `${servicesHelper.url}/${schoolId}/teachers/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function getNotVerified(schoolId, page, rows, order) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/requests?page=${page}&total=${rows}`;

    if(order) {
        url += `&field=${order.field}&direction=${order.direction}`;
    }

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function accept(schoolId, id) {
    const url = `${servicesHelper.url}/${schoolId}/teachers/accept/${id}`;

    return axios.put(url, {}, {
        headers: servicesHelper.header()
    });
}

function reject(schoolId, id) {
    const url = `${servicesHelper.url}/${schoolId}/teachers/reject/${id}`;

    return axios.put(url, {}, {
        headers: servicesHelper.header()
    });
}

function requestsCount(schoolId) {
    const url = `${servicesHelper.url}/${schoolId}/teachers/requests/count`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function changeFormPermission(data, schoolId, id) {
    const url = `${servicesHelper.url}/${schoolId}/teachers/form-permission/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

const teacherService = {
    getVerified,
    create,
    deleteTeachers,
    edit,
    getById,
    getNotVerified,
    accept,
    reject,
    requestsCount,
    changeFormPermission
}

export default teacherService;