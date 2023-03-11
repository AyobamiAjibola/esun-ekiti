import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from './context';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const theme = createTheme({
  components: {
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'red'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#521414'
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={ queryClient }>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={ false } position='bottom-right' />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
