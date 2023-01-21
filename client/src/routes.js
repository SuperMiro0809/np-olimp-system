import { Navigate } from 'react-router-dom';

import DashboardLayout from '@modules/dashboard/layouts/DashboardLayout';
import DashboardPageLayout from '@modules/dashboard/layouts/DashboardPageLayout';
import MainLayout from '@modules/main/layouts/MainLayout';

import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

import TrainingOrganizationsList from './pages/TrainingOrganizations/Index';
import TrainingOrganizationsAdd from './pages/TrainingOrganizations/Create';
import TrainingOrganizationsRequestList from './pages/TrainingOrganizations/RequestList';
import TrainingOrganizationsEdit from './pages/TrainingOrganizations/Edit';

import TeachersList from './pages/Teachers/Index';
import TeachersAdd from './pages/Teachers/Create';
import TeachersRequestList from './pages/Teachers/RequestList';
import TeachersEdit from './pages/Teachers/Edit';

import SubjectsList from './pages/Subjects/Index';
import SubjectsAdd from './pages/Subjects/Create';
import SubjectsEdit from './pages/Subjects/Еdit';

import SchoolData from './pages/SchoolData/Index';

import AuthGuard from '@modules/common/hoc/AuthGuard';

const routes = [
  {
    path: 'app',
    element: <AuthGuard component={DashboardLayout} isLoggedFromRoute={true}/>,
    children: [
      { path: 'account', element: <Account /> },
      { 
        path: 'training-organizations',
        element: <DashboardPageLayout title='Обучителни организации' />,
        children: [
          { path: '', element: <TrainingOrganizationsList /> },
          { path: 'create', element: <TrainingOrganizationsAdd /> },
          { path: 'requests', element: <TrainingOrganizationsRequestList /> },
          { path: 'edit/:id', element: <TrainingOrganizationsEdit /> }
        ]
      },
      {
        path: 'teachers',
        element: <DashboardPageLayout title='Учители' />,
        children: [
          { path: '', element: <TeachersList /> },
          { path: 'create', element: <TeachersAdd /> },
          { path: 'requests', element: <TeachersRequestList /> },
          { path: 'edit/:id', element: <TeachersEdit /> }
        ]
      },
      {
        path: 'subjects',
        element: <DashboardPageLayout title='Учебни предмети' />,
        children: [
          { path: '', element: <SubjectsList /> },
          { path: 'create', element: <SubjectsAdd /> },
          { path: 'edit/:id', element: <SubjectsEdit /> }
        ]
      },
      {
        path: 'school-data',
        element: <DashboardPageLayout title='Данни за училището'/>,
        children: [
          { path: '', element: <SchoolData /> }
        ]
      },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <AuthGuard component={Login} isLoggedFromRoute={false}/> },
      { path: 'register', element: <AuthGuard component={Register} isLoggedFromRoute={false}/> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
