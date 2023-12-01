export function generateReport(data, type, options = []) {
    const report = {};

    data.forEach(lesson => {

        if (type === 'groups') {
            const key = lesson.class;

            if (!Object.hasOwn(report, key)) {
                report[key] = {
                    allLessons: 0,
                    lessons: {},
                };
            }

            report[key] = {
                allLessons: 0,
                lessons: {},
            };

            if(options.includes('all_lessons')) {
                lesson.themes.forEach(theme => {
                    report[key].allLessons += theme.lessons;
                });
            }

            if (options.includes('per_teacher')) {
                lesson.themes.forEach(theme => {

                    theme.teachers.forEach(teacher => {
                        const teacherName = teacher.name;

                        if (!Object.hasOwn(report[key].lessons, teacherName)) {
                            report[key].lessons[teacherName] = {
                                allLessons: 0
                            };
                        }

                        report[key].lessons[teacherName].allLessons += teacher.lessons;
                    });
                });
            }
        }

        if(type === 'teachers') {
            if (options.includes('per_group')) {

            }
    
            if (options.includes('per_months')) {
    
            }
        }
    });

    return report;
}