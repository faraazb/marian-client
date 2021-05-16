import React from 'react';
// import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {LoginForm} from "./features/account/Login";
import {SignupForm} from "./features/account/signup_panel_stack/Signup";
import {Home} from "./features/home/Home";
import {PickupDashboard} from "./features/dashboard/pickup/PickupDashboard";
import {FeedSomeoneForm} from "./features/donate/FeedSomeoneForm";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/feed-someone">
                <FeedSomeoneForm />
            </Route>
            <Route path="/pickups">
                <PickupDashboard />
            </Route>
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
