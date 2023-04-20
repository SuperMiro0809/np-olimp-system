import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { Box, Card, Typography, Button, Stack } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useMessage from '@modules/common/hooks/useMessage';
import useAuth from '@modules/common/hooks/useAuth';
import ruoService from '@services/ruo';
import groupService from '@services/group';
import Select from '@modules/common/components/filters/Select';
import generateGradeWord from '@modules/schoolForms/utils/generateGradeWord';
import getSchoolYear from '@modules/common/utils/getSchoolYear';

import DownloadIcon from '@mui/icons-material/Download';
import ForwardIcon from '@mui/icons-material/Forward';

const ApproveList = () => {
    const [ruos, setRuos] = useState([]);
    const [schoolYear, setSchoolYear] = useState('');
    const [options, setOption] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ruoService.getSchoolYears()
            .then((res) => {
                const opt = res.data.map((el) => ({ label: el.schoolYear, value: el.schoolYear }));
                opt.sort((a, b) => -a.label.localeCompare(b.label));
                const currentSchoolYear = getSchoolYear();

                if (opt.length === 0) {
                    opt.push({ label: currentSchoolYear, value: currentSchoolYear });
                }

                setOption(opt);
                setSchoolYear(currentSchoolYear);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        ruoService.getAll(schoolYear)
            .then((res) => {
                setRuos(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [schoolYear])

    const getGroups = (key) => {
        groupService.getGrades(key, schoolYear)
            .then((res) => {
                generateGradeWord(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleNaviagate = (key) => {
        navigate(`/app/approve/${key}/details`, { state: { schoolYear } });
    }

    return (
        <>
            <Helmet>
                <title>Одобряване на проекти</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Box sx={{ mb: 2 }}>
                    <Select
                        title='Учебна година'
                        value={schoolYear}
                        options={options}
                        setValue={setSchoolYear}
                    />
                </Box>

                {ruos.length === 0 && (
                    <Typography component='div' variant='h4' textAlign='center'>Няма подадени оценъчни карти</Typography>
                )}

                <Stack spacing={2}>
                    {ruos.map((ruo, index) => (
                        <Card sx={{ p: 2 }} key={index}>
                            <PerfectScrollbar>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant='h3'>{ruo.name}</Typography>
                                    <Box sx={{ display: 'flex', gap: 5 }}>
                                        <Button
                                            variant='contained'
                                            color='wordBlue'
                                            endIcon={<DownloadIcon />}
                                            onClick={() => getGroups(ruo.key)}
                                        >
                                            Изтегли оценъчна карта
                                        </Button>
                                        <Button
                                            variant='outlined'
                                            color='lightBlue'
                                            endIcon={<ForwardIcon />}
                                            onClick={() => handleNaviagate(ruo.key)}
                                        >
                                            Одобряване
                                        </Button>
                                    </Box>
                                </Box>
                            </PerfectScrollbar>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </>
    );
}

export default ApproveList;