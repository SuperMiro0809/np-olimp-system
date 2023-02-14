import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@mui/material';

import useAuth from '@modules/common/hooks/useAuth';

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

const Dashboard = () => {
    const [tiles, setTiles] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {

            if (user.role.name === 'SuperAdmin') {
                setTiles([
                    {
                        title: 'Обучителни организации',
                        value: 10,
                        url: '/app/training-organizations',
                        icon: SchoolIcon
                    },
                    {
                        title: 'Заявки',
                        value: 10,
                        url: '/app/training-organizations/requests',
                        icon: DescriptionIcon
                    }
                ]);
            } else if (user.role.name === 'Admin') {

            } else if (user.role.name === 'Moderator') {
                setTiles([
                    {
                        title: 'Формуляри',
                        value: 10,
                        url: '/app/forms',
                        icon: InsertDriveFileIcon
                    },
                    {
                        title: 'Учители',
                        value: 10,
                        url: '/app/teachers',
                        icon: GroupIcon
                    },
                    {
                        title: 'Заявки',
                        value: 10,
                        url: '/app/teachers/requests',
                        icon: DescriptionIcon
                    },
                    {
                        title: 'Предмети',
                        value: 10,
                        url: '/app/subjects',
                        icon: BookIcon
                    },
                    {
                        title: 'Данни за училището',
                        value: 10,
                        url: '/app/school-data',
                        icon: SchoolIcon
                    }
                ]);
            } else if (user.role.name === 'User') {
                setTiles([
                    {
                        title: 'Моето занятие',
                        value: 10,
                        url: '/app/my-lesson',
                        icon: HourglassBottomIcon
                    },
                    {
                        title: 'Мои формуляри',
                        value: 10,
                        url: '/app/forms',
                        icon: InsertDriveFileIcon
                    },
                    {
                        title: 'Мои групи',
                        value: 10,
                        url: '/app/groups',
                        icon: GroupsIcon
                    },
                    {
                        title: 'Занятия',
                        value: 10,
                        url: '/app/lessons',
                        icon: WatchLaterIcon
                    },
                ]);
            }

        }
    }, [user])

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
