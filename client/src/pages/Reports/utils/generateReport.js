import moment from 'moment';

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

            if (options.includes('all_lessons')) {
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

        if (type === 'teachers') {
            const group = lesson.class;
            const date = lesson.date;
            const month = moment(date).format('MM');

            console.log(typeof month)

            lesson.themes.forEach(theme => {
                theme.teachers.forEach(teacher => {
                    const teacherName = teacher.name;

                    if (!Object.hasOwn(report, teacherName)) {
                        report[teacherName] = {
                            allLessons: 0,
                            groups: {},
                            months: {
                                '01': {
                                    label: 'Януари',
                                    lessons: 0,
                                },
                                '02': {
                                    label: 'Февруари',
                                    lessons: 0,
                                },
                                '03': {
                                    label: 'Март',
                                    lessons: 0,
                                },
                                '04': {
                                    label: 'Април',
                                    lessons: 0,
                                },
                                '05': {
                                    label: 'Май',
                                    lessons: 0,
                                },
                                '06': {
                                    label: 'Юни',
                                    lessons: 0,
                                },
                                '07': {
                                    label: 'Юли',
                                    lessons: 0,
                                },
                                '08': {
                                    label: 'Август',
                                    lessons: 0,
                                },
                                '09': {
                                    label: 'Септември',
                                    lessons: 0,
                                },
                                '10': {
                                    label: 'Октомври',
                                    lessons: 0,
                                },
                                '11': {
                                    label: 'Ноември',
                                    lessons: 0,
                                },
                                '12': {
                                    label: 'Декември',
                                    lessons: 0,
                                },
                            }
                        }
                    }
                });
            });

            if (options.includes('all_lessons')) {
                lesson.themes.forEach(theme => {
                    theme.teachers.forEach(teacher => {
                        const teacherName = teacher.name;
    
                        report[teacherName].allLessons += teacher.lessons;
                    });
                });
            }

            if (options.includes('per_group')) {
                lesson.themes.forEach(theme => {
                    theme.teachers.forEach(teacher => {
                        const teacherName = teacher.name;
    
                        if(!Object.hasOwn(report[teacherName].groups, group)) {
                            report[teacherName].groups[group] = { allLessons: 0 };
                        }

                        report[teacherName].groups[group].allLessons += teacher.lessons;
                    });
                });
            }

            if (options.includes('per_months')) {
                lesson.themes.forEach(theme => {
                    theme.teachers.forEach(teacher => {
                        const teacherName = teacher.name;
    
                        report[teacherName].months[month].lessons += teacher.lessons;
                    });
                });
            }
        }
    });

    return report;
}