import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import teacherService from '@services/teacher';
import subjectService from '@services/subject';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';

const TeachersList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { addMessage } = useMessage();
    const { user } = useAuth();
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        if (user) {
            subjectService.getAll(user.info.id)
                .then((res) => {
                    const options = res.data.map((el) => ({ label: el.name, value: el.id }));
                    setSubjectOptions(options);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user])

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        if (user) {
            teacherService.getVerified(user.info.id, pagination, filters, order)
                .then((res) => {
                    setData(res.data.data);
                    setTotal(res.data.total);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleSwitch = (event, id) => {
        const data = {
            formPermission: event.target.checked
        };

        teacherService.changeFormPermission(data, user.info.id, id)
            .then((res) => {
                addMessage('Правата на учителя са редактирани успешно', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleSubject = (value, id) => {
        const data = {
            subject: value
        };

        teacherService.changeSubject(data, user.info.id, id)
            .then((res) => {
                addMessage('Предметът на учителя е редактиран успешно', 'success');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const headings = [
        { id: 'id', label: 'ID', order: true },
        { id: 'name', label: 'Име', order: true },
        { id: 'email', label: 'Имейл', order: true },
        { id: 'subject_name', label: 'Предмет', type: 'chip', select: true, options: subjectOptions, handler: handleSubject },
        { id: 'form_permission', label: 'Права за формуляр', type: 'switch', handler: handleSwitch }
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'name': { type: 'search', name: 'name', placeholder: 'Търси по Име' },
        'email': { type: 'search', name: 'email', placeholder: 'Търси по Имейл' },
        'subject_name': { type: 'search', name: 'subject_name', placeholder: 'Търси по Предмет' }
    }

    const deleteHandler = (selected) => {
        if (user) {
            teacherService.deleteTeachers(user.info.id, selected)
                .then((res) => {
                    addMessage('Учителят е изтрит успешно', 'success')
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <>
            <Helmet>
                <title>Учители</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2 }}>
                    <PerfectScrollbar>
                        <Box>
                            <MainTable
                                headings={headings}
                                headFilters={headFilters}
                                rows={data}
                                total={total}
                                method={get}
                                deleteHandler={deleteHandler}
                                options={{
                                    checkbox: true,
                                    add: true,
                                    delete: true,
                                    edit: true
                                }}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
};

export default TeachersList;