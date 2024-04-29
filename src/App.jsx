// src/App.jsx


import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { ProtectedLayout } from "./ProtectedLayout";

import LoginPage from "./Views/Login";
import HomePage from "./Views/Home";
import ErrorPage from "./Views/Error";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<AuthLayout />}
        errorElement={<ErrorPage />}
      >
        <Route path="/">
          <Route index element={<LoginPage />} />
          <Route path="home" element={<ProtectedLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Route >
    </>
  )
);

export default router;