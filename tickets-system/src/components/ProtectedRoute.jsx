import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext)


  if (loading) {
    return <div>Loading...</div>; // or your loader component
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "support" ? "/agent-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }
  console.log("Auth user:", user);
  console.log("Loading:", loading);


  return children
}

export default ProtectedRoute

