export default function getSchoolYear() {
    const date = new Date();

    const currentDay = date.getDate();
    const monthIndex = date.getMonth();
    const currentYear = date.getFullYear();

    if (monthIndex >= 8) { //8 = September
        if(monthIndex === 8 && currentDay < 15) {
            return `${currentYear - 1} - ${currentYear}`;
        }

        return `${currentYear} - ${currentYear + 1}`;
    }

    return `${currentYear - 1} - ${currentYear}`;
}