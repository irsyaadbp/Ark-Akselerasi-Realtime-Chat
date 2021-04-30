import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import Loading from "./component/Loading";

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        );
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
        );
      }}
    />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          path="/"
          component={Home}
          authenticated={isAuthenticated}
          exact
        />
        <PublicRoute
          path="/signup"
          component={Signup}
          authenticated={isAuthenticated}
        />
        <PublicRoute
          path="/login"
          component={Login}
          authenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/chat"
          component={Chat}
          authenticated={isAuthenticated}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
