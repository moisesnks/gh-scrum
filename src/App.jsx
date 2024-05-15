import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { ProtectedLayout } from "./ProtectedLayout";

import LoginPage from "./Views/Login";
import HomePage from "./Views/Home";
import ErrorPage from "./Views/Error";
import FormPage from "./Views/Form";
import UsersPage from "./Views/Users";
import UserPage from "./Views/User";
import TaskPage from "./Views/Task";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<AuthLayout />}
        ErrorBoundary={({ error }) => <ErrorPage error={error} />}
      >
        <Route index element={<LoginPage />} />
        <Route path="/home" element={<ProtectedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="task/:id" element={<TaskPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserPage />} />
        </Route>
      </Route >
    </>
  )
);

export default router;
