import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/useRedux";

interface PrivateRouteProps {
  element: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const user = useAppSelector((state) => state.user.user);
  const user_id = localStorage.getItem("user_id");
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
