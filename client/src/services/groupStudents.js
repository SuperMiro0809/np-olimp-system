import servicesHelper from ".";
import axios from "axios";

function getStudents(schoolId, teacherId, groupId, pagination, filters, order) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${groupId}/students?page=${pagination.page}&total=${pagination.total}`;

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

function create(data, schoolId, teacherId, groupId) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${groupId}/students`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function edit(data, schoolId, teacherId, groupId, id) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${groupId}/students/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteStudent(selected, schoolId, teacherId, groupId) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${groupId}/students`;

    return axios.delete(url, {
        data: { selected: selected },
        headers: servicesHelper.header()
    });
}

function getById(schoolId, teacherId, groupId, id) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${groupId}/students/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const groupStudentsService = {
    getStudents,
    create,
    edit,
    deleteStudent,
    getById
}

export default groupStudentsService;