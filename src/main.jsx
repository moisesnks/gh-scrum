import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeUIProvider } from 'theme-ui';
import { RouterProvider } from 'react-router-dom';
import router from './App';

const rootElement = document.getElementById('root');

const theme = {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeUIProvider theme={theme}>
    <RouterProvider router={router}>
    </RouterProvider>
  </ThemeUIProvider>
);


