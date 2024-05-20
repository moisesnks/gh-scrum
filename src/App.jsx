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
import MetricasPage from "./Views/Metricas";
import PlannigPokerPage from "./Views/PlanningPoker";
import RoomPage from "./Views/PlanningPoker/Room";



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
          <Route path="metrics" element={<MetricasPage />} />
          <Route path="planning-poker" element={<PlannigPokerPage />} />
          <Route path="planning-poker/room" element={<RoomPage />} />
          <Route path="planning-poker/join-room" element={
            <div>
              <h1>Join Room</h1>
            </div>
          } />
          <Route path="planning-poker/create-room" element={
            <div>
              <h1>Create Room</h1>
            </div>
          } />
        </Route>
      </Route >
    </>
  )
);

export default router;
