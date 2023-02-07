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

const formService = {
    getForms,
    create,
}

export default formService;