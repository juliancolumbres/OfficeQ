import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root.js';
import Error from './pages/Error.js';
import StudentLanding from './pages/Student/StudentLanding';
import ProfessorLanding from './pages/Professor/ProfessorLanding';
import ProfessorDashboard from './pages/Professor/ProfessorDashboard';

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
  {
    path: "/professor/dashboard",
    element: <ProfessorDashboard />,
  },
])

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
