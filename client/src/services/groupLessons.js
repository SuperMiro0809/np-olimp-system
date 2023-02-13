import servicesHelper from ".";
import axios from "axios";

function getLessons(schoolId, teacherId) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/lessons`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function create(data, schoolId, teacherId) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/lessons`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function edit(data, schoolId, teacherId, id) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/lessons/${id}`;

    return axios.put(url, data, {
        headers: servicesHelper.header()
    });
}

function deleteLesson(schoolId, teacherId, id) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/lessons/${id}`;

    return axios.delete(url, {
        headers: servicesHelper.header()
    });
}

function getById(schoolId, teacherId, id) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/lessons/${id}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const groupLessonsService = {
    getLessons,
    create,
    edit,
    deleteLesson,
    getById
}

export default groupLessonsService;