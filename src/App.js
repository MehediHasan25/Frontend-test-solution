import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import './App.css';
import Login from './Components/Login';
import Devices from './Components/Devices';
import ProtectRoute from './ProtectedRoute/Protected';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectRoute exact path="/devices" component={Devices} />
        </Switch>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
