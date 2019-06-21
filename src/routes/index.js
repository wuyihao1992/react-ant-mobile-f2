import React from "react";
import {Router} from "dva/router";
import registerModel from "UTIL/registerModel";

import main from "./main";
import common from "./common";
import demo from "./demo";

function RouterConfig({history, app}) {
    const routes = [
        ...main,
        ...demo,
        ...common,
    ];

    return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
