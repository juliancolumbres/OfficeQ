import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root.js';
import Error from './pages/Error.js';
import StudentLanding from './pages/Student/StudentLanding';
import ProfessorLanding from './pages/Professor/ProfessorLanding';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />
  },
  {
    path: "/student",
    element: <StudentLanding />,
  },
  {
    path: "/professor",
    element: <ProfessorLanding />,
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

