import * as XLSX from 'xlsx';

export default function downloadExcelFile(reportData, options = []) {
    const dataAllLessons = [];
    const dataPerTeacher = [];

    for (const key in reportData) {
        const value = reportData[key];

        const obj = {
            'Група': key,
        };

        if(options.includes('all_lessons')) {
            const el = {
                ...obj,
                'Общ брой часове': value.allLessons
            };

            dataAllLessons.push(el);
        }
        
        if(options.includes('per_teacher')) {
            const el = { ...obj };

            Object.keys(value.lessons).forEach(teacherName => {
                el[teacherName] = value.lessons[teacherName].allLessons;
            });

            dataPerTeacher.push(el);
        }
    }

    const workbook = XLSX.utils.book_new();

    if(options.includes('all_lessons')) {
        const worksheet = XLSX.utils.json_to_sheet(dataAllLessons);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Справка - общ брой часове');
    }

    if(options.includes('per_teacher')) {
        const worksheet = XLSX.utils.json_to_sheet(dataPerTeacher);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Справка - часове по учители');
    }

    XLSX.writeFile(workbook, 'group_report.xlsx');
}