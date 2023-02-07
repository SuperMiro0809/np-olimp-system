export default function () {
    const date = new Date();

    const monthIndex = date.getMonth();
    const currentYear = date.getFullYear();

    if (monthIndex >= 8) { //8 = September
        return `${currentYear} - ${currentYear + 1}`;
    }

    return `${currentYear - 1} - ${currentYear}`;
}