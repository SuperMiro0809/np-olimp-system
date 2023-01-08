import servicesHelper from ".";
import axios from "axios";

function getSubjects(pagination, filters, order) {
    let url = `${servicesHelper.url}/subjects?page=${pagination.page}&total=${pagination.total}`;

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

function create(data) {
    const url = `${servicesHelper.url}/subjects`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteSubjects(selected) {
    const url = `${servicesHelper.url}/subjects`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function edit(data, id) {
    const url = `${servicesHelper.url}/subjects/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function getById(id) {
    const url = `${servicesHelper.url}/subjects/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function getAll() {
    const url = `${servicesHelper.url}/subjects/all`;

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