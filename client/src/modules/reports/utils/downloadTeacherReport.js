import * as XLSX from 'xlsx';

export default function downloadExcelFile(reportData, options = []) {
    const dataАllLessons = [];
    const dataPerGroup = [];
    const dataPerMonths = [];

    for (const key in reportData) {
        const value = reportData[key];

        const obj = {
            'Учител': key,
        };

        if(options.includes('all_lessons')) {
            const el = {
                ...obj,
                'Общ брой часове': value.allLessons
            }

            dataАllLessons.push(el);
        }
        
        if(options.includes('per_group')) {
            const el = { ...obj };

            Object.keys(value.groups).forEach(group => {
                el[group] = value.groups[group].allLessons;
            });

            dataPerGroup.push(el);
        }

        if(options.includes('per_months')) {
            const el = { ...obj };

            Object.keys(value.months).forEach(month => {
                const v = value.months[month];

                el[v.label] = v.lessons;
            });

            dataPerMonths.push(el);
        }
    }

    const workbook = XLSX.utils.book_new();

    if(options.includes('all_lessons')) {
        const worksheet = XLSX.utils.json_to_sheet(dataАllLessons);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Справка - общ брой часове');
    }

    if(options.includes('per_group')) {
        const worksheet = XLSX.utils.json_to_sheet(dataPerGroup);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Справка - часове по групи');
    }

    if(options.includes('per_months')) {
        const worksheet = XLSX.utils.json_to_sheet(dataPerMonths);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Справка - часове по месеци');
    }

    XLSX.writeFile(workbook, 'teacher_report.xlsx');
}