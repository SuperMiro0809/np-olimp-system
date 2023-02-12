import moment from "moment";

export default function isSameOrBefore(startTime, endTime) {
    return moment(startTime, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
}