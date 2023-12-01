import servicesHelper from ".";
import axios from "axios";

function groupsReport(schoolId, data, filters = []) {
    let url = `${servicesHelper.url}/${schoolId}/reports/groups?`;

    if(filters.length > 0) {
        filters.forEach((filter) => {
            url += `&${filter.label}=${filter.value}`
        })
    }

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function teachersReports(schoolId, data) {
    let url = `${servicesHelper.url}/${schoolId}/reports/teachers?`;

}

const reportsService = {
    groupsReport,
    teachersReports
}

export default reportsService;