import {
    Box,
    Typography,
    Divider,
    Breadcrumbs,
    Link
} from "@mui/material";
import { Outlet, useLocation, Link as RouterLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Message from "@modules/common/components/Message";

const DashboardPageLayout = ({ title }) => {
    const location = useLocation();
    const params = useParams();
    const parts = location.pathname.split('/').filter(x => x && !Object.values(params).includes(x)).slice(1);

    const elData = {
        'create': 'Създаване',
        'edit': 'Редактиране',
        'details': 'Детайли',
        'requests': 'Заявки',
        'students': 'Ученици',
        'forms': 'Формуляри'
    }

    return (
        <Box sx={{
            p: 4,
        }}>
            {/* HEADER */}
            <Box>
                <Box sx={{ pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '50px' }}>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        sx={{
                            '.MuiBreadcrumbs-separator': {
                                //fontSize: 20
                            }
                        }}
                    >
                        {parts.map((el, index, parts) => {
                            const path = index === 0 ? '' : location.pathname.split(el)[0];

                            if (index + 1 === parts.length) {
                                return <Typography variant='h4' key={index}>{elData[el] || title}</Typography>
                            } 
                            else {
                                return (
                                    <Link
                                        component={RouterLink}
                                        variant='h4'
                                        underline='none'
                                        color='primary.main'
                                        to={path}
                                        key={index}
                                    >
                                        {elData[el] || title}
                                    </Link>
                                );
                            }
                        })}
                    </Breadcrumbs>
                    
                    <Message />
                </Box>
                <Divider sx={{ mb: 5 }} />
            </Box>
            {/* CONTENT */}
            <Box height={"100%"} width={"100%"} ml={"auto"} mr={"auto"}>
                <Outlet />
            </Box>
        </Box>
    );
}

DashboardPageLayout.propTypes = {
    title: PropTypes.string.isRequired
};

export default DashboardPageLayout;