import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root.js';
import Error from './pages/Error.js';
import StudentLanding from './pages/Student/StudentLanding';
import ProfessorLanding from './pages/Professor/ProfessorLanding';
import ProfessorDashboard from './pages/Professor/ProfessorDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';
import QuestionForum from './pages/Student/QuestionForum'
import { UserContext } from './context/userContext';
import { useState } from 'react';

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
    path: "/student/dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/professor",
    element: <ProfessorLanding />,
  },
  {
    path: "/professor/dashboard",
    element: <ProfessorDashboard />,
  },
  {
    path: "/student/sessions/:sessionId/forum",
    element: <QuestionForum />,
  },
])

function App() {
  const [user, setUser] = useState(null);


  return (
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={router} />
      </UserContext.Provider>
  );
}

export default App;
