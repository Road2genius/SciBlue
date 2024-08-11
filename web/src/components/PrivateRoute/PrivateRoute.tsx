import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { userContext, loading } = useUserContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return userContext ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
