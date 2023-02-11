import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography
} from '@mui/material';
import {
    AlertCircle as AlertCircleIcon,
    BarChart as BarChartIcon,
    Lock as LockIcon,
    Settings as SettingsIcon,
    ShoppingBag as ShoppingBagIcon,
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import LogoutItem from './LogoutItem';
import trainingOrganizationsService from '@services/trainingOrganizations';
import teacherService from '@services/teacher';
import useAuth from '@modules/common/hooks/useAuth';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DescriptionIcon from '@mui/icons-material/Description';

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

const formatRole = (role) => {
    if (role === 'SuperAdmin') {
        return 'МОН администратор';
    } else if (role === 'Admin') {
        return 'РУО администратор';
    } else if (role === 'Moderator') {
        return 'Училищен администратор';
    } else if (role === 'User') {
        return 'Учител';
    }
}

const baseMenuItems = [
    {
        href: '/app/dashboard',
        icon: SignalCellularAltIcon,
        title: 'Начало'
    }
]

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();
    const [trainingOrganizationsRequestCount, setTrainingOrganizationsRequestCount] = useState(0);
    const [teachersRequestCount, setTeachersRequestCount] = useState(0);
    const [menuItems, setMenuItems] = useState(baseMenuItems);
    const { user } = useAuth();

    const userInfo = {
        avatar: '',
        role: user && formatRole(user.role.name),
        name: user && user.info.name
    };

    useEffect(() => {
        if (user) {
            if (user.role.name === 'SuperAdmin') {
                setMenuItems([
                    ...baseMenuItems,
                    {
                        href: '/app/training-organizations',
                        icon: SchoolIcon,
                        title: 'Обучителни организации'
                    },
                    {
                        href: '/app/training-organizations/requests',
                        icon: DescriptionIcon,
                        title: 'Заявки',
                        badge: {
                            content: trainingOrganizationsRequestCount,
                            color: 'primary'
                        }
                    }
                ]);
            } else if (user.role.name === 'Admin') {
                setMenuItems([
                    ...baseMenuItems
                ]);
            } else if (user.role.name === 'Moderator') {
                setMenuItems([
                    ...baseMenuItems,
                    {
                        href: '/app/forms',
                        icon: InsertDriveFileIcon,
                        title: 'Формуляри'
                    },
                    {
                        href: '/app/teachers',
                        icon: GroupIcon,
                        title: 'Учители'
                    },
                    {
                        href: '/app/teachers/requests',
                        icon: DescriptionIcon,
                        title: 'Заявки',
                        badge: {
                            content: teachersRequestCount,
                            color: 'primary'
                        }
                    },
                    {
                        href: '/app/subjects',
                        icon: BookIcon,
                        title: 'Предмети'
                    },
                    {
                        href: '/app/school-data',
                        icon: SchoolIcon,
                        title: 'Данни за училището'
                    }
                ]);
            } else if (user.role.name === 'User') {
                setMenuItems([
                    ...baseMenuItems,
                    {
                        href: '/app/my-lesson',
                        icon: HourglassBottomIcon,
                        title: 'Mоят час'
                    },
                    {
                        href: '/app/forms',
                        icon: InsertDriveFileIcon,
                        title: 'Mои формуляри'
                    },
                    {
                        href: '/app/groups',
                        icon: GroupsIcon,
                        title: 'Mои групи'
                    },
                    {
                        href: '/app/lessons',
                        icon: WatchLaterIcon,
                        title: 'Занятия'
                    }
                ]);
            }
        }
    }, [trainingOrganizationsRequestCount, teachersRequestCount]);

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }

        //requests on every path change
        if (user) {
            if (user.role.name === 'SuperAdmin') {
                trainingOrganizationsService.requestsCount()
                    .then((res) => {
                        setTrainingOrganizationsRequestCount(res.data);
                    })
            } else if (user.role.name === 'Moderator') {
                teacherService.requestsCount(user.info.id)
                    .then((res) => {
                        setTeachersRequestCount(res.data);
                    })
            }
        }

    }, [location.pathname]);

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}
            >
                <Avatar
                    component={RouterLink}
                    src={userInfo.avatar}
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                    to="/app/account"
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                    textAlign='center'
                >
                    {userInfo.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {userInfo.role}
                </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <List>
                    {menuItems.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                            {...item}
                        />
                    ))}
                </List>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
                <LogoutItem />
            </Box>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {/* <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Need more?
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box>
      </Box> */}
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            width: 256
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden xlDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => {
    },
    openMobile: false
};

export default DashboardSidebar;
