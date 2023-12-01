import * as XLSX from 'xlsx';

export default function downloadExcelFile(reportData, options = []) {
    const data = [];

    for (const key in reportData) {
        const value = reportData[key];

        const obj = {
            'Група': key,
        };

        if(options.includes('all_lessons')) {
            obj['Общ брой часове'] = value.allLessons;
        }
        
        if(options.includes('per_teacher')) {
            Object.keys(value.lessons).forEach(teacherName => {
                obj[teacherName] = value.lessons[teacherName].allLessons;
            });
        }

        data.push(obj);
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Справка');

    XLSX.writeFile(workbook, 'group_report.xlsx');
}