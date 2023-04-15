import servicesHelper from ".";
import axios from "axios";

function getForms(schoolId, pagination, filters, order) {
    let url = `${servicesHelper.url}/${schoolId}/forms?page=${pagination.page}&total=${pagination.total}`;

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
    const url = `${servicesHelper.url}/${schoolId}/forms`;

    return axios.post(url, data, {
        headers: {
            ...servicesHelper.header(),
            'Content-Type': 'multipart/form-data',
        }
    });
}

function edit(schoolId, id, data) {
    const url = `${servicesHelper.url}/${schoolId}/forms/${id}`;

    return axios.post(url, data, {
        headers: {
            ...servicesHelper.header(),
            'Content-Type': 'multipart/form-data',
        }
    });
}

function deleteForms(schoolId, selected) {
    const url = `${servicesHelper.url}/${schoolId}/forms`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getById(schoolId, formId) {
    const url = `${servicesHelper.url}/${schoolId}/forms/${formId}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function submit(schoolId, selected) {
    const url = `${servicesHelper.url}/${schoolId}/forms/submit`;

    return axios.put(url, { selected }, {
        headers: servicesHelper.header()
    });
}

const formService = {
    getForms,
    create,
    edit,
    deleteForms,
    getById,
    submit
}

export default formService;