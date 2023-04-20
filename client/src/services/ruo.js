import servicesHelper from ".";
import axios from "axios";

function getAll(schoolYear='') {
    let url = `${servicesHelper.url}/ruo?schoolYear=${schoolYear}`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

function submitCard(data, id) {
    let url = `${servicesHelper.url}/ruo/submit/${id}`;

    return axios.post(url, data, {
        headers: servicesHelper.header()
    });
}

function getSchoolYears() {
    let url = `${servicesHelper.url}/ruo/schoolYears`;

    return axios.get(url, {
        headers: servicesHelper.header()
    });
}

const ruoService = {
    getAll,
    submitCard,
    getSchoolYears
}

export default ruoService;