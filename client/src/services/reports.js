import servicesHelper from ".";
import axios from "axios";

function generate(schoolId, data, filters = []) {
    let url = `${servicesHelper.url}/${schoolId}/reports/generate?`;

    if(filters.length > 0) {
        filters.forEach((filter) => {
            url += `&${filter.label}=${filter.value}`
        })
    }

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

const reportsService = {
    generate
}

export default reportsService;