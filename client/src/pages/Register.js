import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import TabPanel from '@modules/common/components/TabPanel';
import EducationalOrganizationForm from '@modules/register/components/EducationalOrganizationForm/EducationalOrganizationForm';
import TeacherForm from '@modules/register/components/TeacherForm/TeacherForm';

const Register = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleModeChange = (event, newValue) => {
    setMode(newValue);
  }

  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 1 }}>
            <Typography
              color="textPrimary"
              variant="h2"
            >
              Регистрация
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Въведете данните за регистрация на учител или обучителна организация
            </Typography>
          </Box>
          {successMsg &&
            <Box sx={{ my: 1 }}>
              <Alert severity="success">{successMsg}</Alert>
            </Box>
          }
          {errorMsg &&
            <Box sx={{ my: 1 }}>
              <Alert severity="error">{errorMsg}</Alert>
            </Box>
          }
          <Box sx={{ mt: 2 }}>
            <Tabs
              value={mode}
              variant="fullWidth"
              //indicatorColor="primary"
              //textColor="primary"
              onChange={handleModeChange}
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: '#ff7701!important' },
                //'& .MuiTab-root': { color: blue[700] },
                //'& .Mui-selected': { color: '#ff7701!important' },
              }}
            >
              <Tab label="Обучителна организация" />
              <Tab label="Учител" />
            </Tabs>
          </Box>
          
          <TabPanel children={<EducationalOrganizationForm setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} />} value={mode} index={0} />
          <TabPanel children={<TeacherForm setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} />} value={mode} index={1} />

          <Typography
            color="textSecondary"
            variant="body1"
          >
              Вече имате регистрация?
              {' '}
              <Link component={RouterLink} to="/login" variant="h5" underline="hover">
                  Вход
              </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Register;
