import servicesHelper from ".";
import axios from "axios";

function getTeachers(schoolId, teacherId, groupId, pagination, filters, order) {
    let url = `${servicesHelper.url}/${schoolId}/teachers/${teacherId}/groups/${groupId}/teachers?page=${pagination.page}&total=${pagination.total}`;

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

const groupTeachersService = {
    getTeachers
}

export default groupTeachersService;