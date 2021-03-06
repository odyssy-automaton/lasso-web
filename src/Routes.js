import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home/Home";
import Dao from "./views/dao/Dao";
import Moa from "./views/moa/Moa";
import Summon from "./views/summon/Summon";
import Apply from "./views/apply/Apply";
import Profile from "./views/profile/Profile";
import FourOhFour from "./views/fourOhFour/FourOhFour";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dao/:contractAddress" exact component={Dao} />
    <Route path="/moa/:contractAddress" exact component={Moa} />
    <Route path="/apply/:contractAddress" exact component={Apply} />
    <Route path="/summon" exact component={Summon} />
    <Route path="/profile/:account" exact component={Profile} />
    <Route path="*" component={FourOhFour} />
  </Switch>
);

export default Routes;
