import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import styles from "./styles.scss";
import Footer from "components/Footer";
import Auth from "components/Auth";

const App = props => [
  // Nav,
  // Routes,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => {
  return (
    <Switch>
      <Route exact path="/" render={() => "feed"}/>
      <Route exact path="/explore" render={() => "explore"}/>
    </Switch>
  );
};

const PublicRoutes = props => {
  return (
    <Switch>
      <Route exact path="/" component={Auth}/>
      <Route exact path="/forgot" render={() => "password"}/>
    </Switch>
  );
};

export default App;
