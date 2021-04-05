import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const { authAdmin } = useSelector((state) => state.user.loginUser);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authAdmin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes;
