import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card, Button, Typography } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import trainingOrganizationsService from '@services/trainingOrganizations';
import groupService from '@services/group';
import MainTable from '@modules/common/components/MainTable';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';
import Select from '@modules/common/components/filters/Select';
import getSchoolYear from '@modules/common/utils/getSchoolYear';
import generateGradeWord from '@modules/schoolForms/utils/generateGradeWord';

import DownloadIcon from '@mui/icons-material/Download';
import ForwardIcon from '@mui/icons-material/Forward';

const SchoolFormsList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [schoolYear, setSchoolYear] = useState('');
    const [options, setOptions] = useState([]);
    const [groups, setGroups] = useState([]);
    const { addMessage } = useMessage();
    const { user } = useAuth();


    useEffect(() => {
        if (user) {
            trainingOrganizationsService.regionSchoolYears(user.info.key)
                .then((res) => {
                    const opt = res.data.map((option) => ({ value: option.schoolYear, label: option.schoolYear }));
                    opt.sort((a, b) => -a.label.localeCompare(b.label));
                    const year = getSchoolYear();

                    setOptions(opt);
                    setSchoolYear(year);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            groupService.getGrades(user.info.key, schoolYear)
                .then((res) => {
                    console.log(res.data);
                    setGroups(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [schoolYear])

    const get = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        if (user) {
            trainingOrganizationsService.getFromRegion(user.info.key, pagination, filters, order)
                .then((res) => {
                    setData(res.data.data);
                    setTotal(res.data.total);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const headings = [
        { id: 'id', label: 'ID', order: true },
        { id: 'key', label: 'Код по НЕИСПУО' },
        { id: 'name', label: 'Име', order: true }
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: 'Търси по ID' },
        'key': { type: 'search', name: 'key', placeholder: 'Търси по Код по НЕИСПУО' },
        'name': { type: 'search', name: 'name', placeholder: 'Търси по Име' }
    }

    return (
        <>
            <Helmet>
                <title>Училища и формуляри</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Card sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end' }}>
                        <Typography variant='h4'>Изтегляне на оценачната карта в Word формат</Typography>
                        <Select
                            title='Учебна година'
                            value={schoolYear}
                            options={options}
                            setValue={setSchoolYear}
                            size='small'
                        />
                        <Button
                            variant='contained'
                            color='wordBlue'
                            endIcon={<DownloadIcon />}
                            onClick={() => generateGradeWord(groups, user.info.region)}
                        >
                            Изтегли в Word
                        </Button>
                        {/* <Button
                            variant='contained'
                            color='lightBlue'
                            endIcon={<ForwardIcon />}
                            onClick={() => generateGradeWord(groups, user.info.region)}
                        >
                            Изпрати към МОН
                        </Button> */}
                    </Box>
                </Card>
                <Card sx={{ p: 2 }}>
                    <PerfectScrollbar>
                        <Box>
                            <MainTable
                                headings={headings}
                                headFilters={headFilters}
                                rows={data}
                                total={total}
                                method={get}
                                options={{
                                    details: true
                                }}
                            />
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default SchoolFormsList;