import { useState } from 'react';
import { Helmet } from 'react-helmet';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Tabs, Tab } from '@mui/material';
import TabPanel from '@modules/common/components/TabPanel';
import StudentsList from '@modules/groups/components/Students/Index';
import ProgramList from '@modules/groups/components/Program/Index';

import TableRowsIcon from '@mui/icons-material/TableRows';
import GroupIcon from '@mui/icons-material/Group';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const GroupDetails = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Helmet>
                <title>Групи</title>
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
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleChange}
                                    sx={{
                                        '& .MuiTabs-indicator': { backgroundColor: '#ff7701!important' }
                                    }}
                                >
                                    <Tab
                                        label="Ученици"
                                        icon={<GroupIcon />}
                                        iconPosition="start"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label="Програма"
                                        icon={<TableRowsIcon />}
                                        iconPosition="start"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </Box>
                            <TabPanel value={selectedTab} index={0}>
                                <StudentsList />
                            </TabPanel>
                            <TabPanel value={selectedTab} index={1}>
                                <ProgramList />
                            </TabPanel>
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default GroupDetails;