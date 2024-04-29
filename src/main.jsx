import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeUIProvider } from 'theme-ui';
import { RouterProvider } from 'react-router-dom';
import router from './App';

import AppRouter from './App';

const rootElement = document.getElementById('root');

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeUIProvider theme={theme}>
      <RouterProvider router={router}>
        <AppRouter />
      </RouterProvider>
    </ThemeUIProvider>
  </React.StrictMode>,
  rootElement
);
