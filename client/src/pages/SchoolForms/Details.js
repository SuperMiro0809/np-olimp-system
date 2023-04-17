import { useState } from 'react';
import { Helmet } from 'react-helmet';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Tabs, Tab } from '@mui/material';
import TabPanel from '@modules/common/components/TabPanel';
import FormsList from '@modules/schoolForms/components/Forms/Index';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const SchoolFormsDetails = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Helmet>
                <title>Изпратени формуляри</title>
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
                                        label="Формуляри"
                                        icon={<InsertDriveFileIcon />}
                                        iconPosition="start"
                                        {...a11yProps(0)}
                                    />
                                </Tabs>
                            </Box>
                            <TabPanel value={selectedTab} index={0}>
                                <FormsList />
                            </TabPanel>
                        </Box>
                    </PerfectScrollbar>
                </Card>
            </Box>
        </>
    );
}

export default SchoolFormsDetails;