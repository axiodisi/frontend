import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';  // Updated import
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';

function NavBar() {
  const { user } = useAuth();

  return (
    <nav>
      <ul>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Logout /></li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />  // Updated component name
            <Route path="/" element={<h1>Welcome to our app!</h1>} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<h2>Dashboard (Private)</h2>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
