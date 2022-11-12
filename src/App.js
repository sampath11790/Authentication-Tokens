import { Switch, Route, Redirect } from "react-router-dom";
import UserContext from "./Context/UserContext";
import React, { useContext } from "react";
import ContextProvider from "./Context/contextProvider";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const ctx = useContext(UserContext);
  return (
    <ContextProvider>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!ctx.loginState && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}

          <Route path="/profile">{!ctx.loginState && <UserProfile />}</Route>

          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </Layout>
    </ContextProvider>
  );
}

export default App;
