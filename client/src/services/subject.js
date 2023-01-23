import servicesHelper from ".";
import axios from "axios";

function getSubjects(schoolId, pagination, filters, order) {
    let url = `${servicesHelper.url}/${schoolId}/subjects?page=${pagination.page}&total=${pagination.total}`;

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
    const url = `${servicesHelper.url}/${schoolId}/subjects`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteSubjects(schoolId, selected) {
    const url = `${servicesHelper.url}/${schoolId}/subjects`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function edit(schoolId, data, id) {
    const url = `${servicesHelper.url}/${schoolId}/subjects/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function getById(schoolId, id) {
    const url = `${servicesHelper.url}/${schoolId}/subjects/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function getAll(schoolId) {
    const url = `${servicesHelper.url}/${schoolId}/subjects/all`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const subjectService = {
    getSubjects,
    create,
    deleteSubjects,
    edit,
    getById,
    getAll
}

export default subjectService;