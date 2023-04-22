import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@mui/material';
import moment from 'moment';
import getSchoolYear from '@modules/common/utils/getSchoolYear';

import useAuth from '@modules/common/hooks/useAuth';
import dashboardService from '@services/dashboard';

import DashboardCard from '@modules/dashboard/components/DashboardCard';

//training-organizations
import SchoolIcon from '@mui/icons-material/School';

//teachers
import GroupIcon from '@mui/icons-material/Group';

//subjects
import BookIcon from '@mui/icons-material/Book';

//forms
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

//groups
import GroupsIcon from '@mui/icons-material/Groups';

//my lesson
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

//lessons
import WatchLaterIcon from '@mui/icons-material/WatchLater';

//requests
import DescriptionIcon from '@mui/icons-material/Description';

//approve
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const Dashboard = () => {
    const [tiles, setTiles] = useState([]);
    const [values, setValues] = useState({
        trainingOrganizationsCount: 0,
        trainingOrganizationsRequestCount: 0,
        formsCount: 0,
        teachersCount: 0,
        teachersRequestsCount: 0,
        subjectsCount: 0,
        groupsCount: 0,
        lessonsCount: 0
    });
    const { user } = useAuth();

    useEffect(() => {
        dashboardService.index()
        .then((res) => {
            console.log(res.data);
            setValues(res.data);
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (user) {
            if (user.role?.name === 'SuperAdmin') {
                setTiles([
                    {
                        title: 'Обучителни организации',
                        value: values.trainingOrganizationsCount,
                        url: '/app/training-organizations',
                        icon: SchoolIcon
                    },
                    {
                        title: 'Заявки',
                        value: values.trainingOrganizationsRequestCount,
                        url: '/app/training-organizations/requests',
                        icon: DescriptionIcon
                    },
                    {
                        title: 'Одобряване на проекти',
                        value: getSchoolYear(),
                        url: '/app/approve',
                        icon: LibraryAddCheckIcon
                    }
                ]);
            } else if (user.role?.name === 'Admin') {
                setTiles([
                    {
                        title: 'Училища и формуляри',
                        value: getSchoolYear(),
                        url: '/app/schools',
                        icon: SchoolIcon,
                    },
                ]);
            } else if (user.role?.name === 'Moderator') {
                setTiles([
                    {
                        title: 'Формуляри',
                        value: values.formsCount,
                        url: '/app/forms',
                        icon: InsertDriveFileIcon
                    },
                    {
                        title: 'Учители',
                        value: values.teachersCount,
                        url: '/app/teachers',
                        icon: GroupIcon
                    },
                    {
                        title: 'Заявки',
                        value: values.teachersRequestsCount,
                        url: '/app/teachers/requests',
                        icon: DescriptionIcon
                    },
                    {
                        title: 'Предмети',
                        value: values.subjectsCount,
                        url: '/app/subjects',
                        icon: BookIcon
                    },
                    {
                        title: 'Данни за училището',
                        value: user.info.name,
                        url: '/app/school-data',
                        icon: SchoolIcon
                    }
                ]);
            } else if (user.role?.name === 'User') {
                setTiles([
                    {
                        title: 'Моето занятие',
                        value: moment().format('DD/MM/YYYY'),
                        url: '/app/my-lesson',
                        icon: HourglassBottomIcon
                    },
                    {
                        title: 'Мои формуляри',
                        value: values.formsCount,
                        url: '/app/forms',
                        icon: InsertDriveFileIcon
                    },
                    {
                        title: 'Мои групи',
                        value: values.groupsCount,
                        url: '/app/groups',
                        icon: GroupsIcon
                    },
                    {
                        title: 'Занятия',
                        value: values.lessonsCount,
                        url: '/app/lessons',
                        icon: WatchLaterIcon
                    },
                ]);
            }

        }
    }, [user, values])

    return (
        <>
            <Helmet>
                <title>Начало</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                        sx={{
                            justifyContent: 'center',
                            mb: 4
                        }}
                    >
                        {tiles.map((tile, index) => (
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                                key={index}
                            >
                                <DashboardCard
                                    title={tile.title}
                                    value={tile.value}
                                    url={tile.url}
                                    icon={tile.icon}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Box sx={{
                    textAlign: 'center'
                }}>
                    <img
                        alt="Logo"
                        src="/static/Logo.png"
                        width="300px"
                    />
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
