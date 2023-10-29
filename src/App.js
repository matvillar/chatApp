import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import './style.scss';
import ChatRoom from './pages/ChatRoom';

function App() {
  const { currentUser } = useContext(AuthContext);
  // Protected Route
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      // Redirect to the login page if the user is not authenticated
      return <Navigate to="/login" />;
    }
    return children; // Render the protected content
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:userId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}
export default App;
