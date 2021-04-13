import React from 'react';
// import './App.css';
import {LoginForm} from "./features/account/Login";
import {SignupForm} from "./features/account/signup_panel_stack/Signup";
import {Home} from "./features/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/signup">
                <SignupForm />
            </Route>
            <Route path="/login">
                <LoginForm />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
      </Router>
  );
}

export default App;
