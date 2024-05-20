import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { ProtectedLayout } from "./ProtectedLayout";

import LoginPage from "./Views/Login";
import HomePage from "./Views/Home";
import ErrorPage from "./Views/Error";
import FormPage from "./Views/Form";
import UsersPage from "./Views/Users";
import TaskPage from "./Views/Task";
import MetricasPage from "./Views/Metricas";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<AuthLayout />}
        errorElement={<ErrorPage />}
      >
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<ProtectedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="metrics" element={<MetricasPage />} />

        </Route>
      </Route>
    </>
  )
);

export default router;
