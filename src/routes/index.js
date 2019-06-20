import React from "react";
import { Router } from "dva/router";
import registerModel from "UTIL/registerModel";

import common from "./common";

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: "/",
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require("VIEW/Main"));
        });
      },
      childRoutes: [
        ...common,
      ]
    },
    {
      path: "*",
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require("VIEW/404"));
        });
      }
    }
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
