import servicesHelper from ".";
import axios from "axios";

function getGroups(schoolId, teacherId, pagination, filters, order) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups?page=${pagination.page}&total=${pagination.total}`;

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

function getById(schoolId, teacherId, id) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function getAll(schoolId, teacherId) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/all`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function grade(data, id) {
    let url = `${servicesHelper.url}/groups/grade/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function getGrades(schoolKey, schoolYear) {
    let url = `${servicesHelper.url}/groups/grade/${schoolKey}?schoolYear=${schoolYear}&submitted=1`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function approveGroups(data) {
    let url = `${servicesHelper.url}/groups/approve`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

const groupService = {
    getGroups,
    getById,
    getAll,
    grade,
    getGrades,
    approveGroups
}

export default groupService;