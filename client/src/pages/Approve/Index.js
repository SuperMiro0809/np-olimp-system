import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
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
    const [schoolYear, setSchoolYear] = useState(getSchoolYear());
    const navigate = useNavigate();

    useEffect(() => {
        ruoService.getAll(schoolYear)
            .then((res) => {
                setRuos(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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
                {/* <Box sx={{ mb: 2 }}>
                    <Select
                        title='Учебна година'
                        value={schoolYear}
                        options={[]}
                        setValue={setSchoolYear}
                        fullWidth
                    />
                </Box> */}
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