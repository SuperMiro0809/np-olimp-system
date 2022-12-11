import { Navigate } from 'react-router-dom';
import DashboardLayout from '@modules/dashboard/layouts/DashboardLayout';
import MainLayout from '@modules/main/layouts/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

import AuthGuard from '@modules/common/hoc/AuthGuard';

const routes = [
  {
    path: 'app',
    element: <AuthGuard component={DashboardLayout} isLoggedFromRoute={true}/>,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
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
