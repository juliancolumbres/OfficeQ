import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './pages/Root.js';
import Error from './pages/Error.js';
import StudentLanding from './pages/Student/StudentLanding';
import ProfessorLanding from './pages/Professor/ProfessorLanding';
import ProfessorDashboard from './pages/Professor/ProfessorDashboard';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';


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
  const { user, setUser} = useAuth();


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
