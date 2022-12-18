import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import GlobalStyles from '@modules/common/components/GlobalStyles/GlobalStyles';
import theme from './theme';
import routes from './routes';
import AuthProvider from '@modules/common/providers/AuthProvider';
import MessageProvider from '@modules/common/providers/MessageProvider';

const App = () => {
  const content = useRoutes(routes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <MessageProvider>
            {content}
          </MessageProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
