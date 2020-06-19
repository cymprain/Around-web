import React from 'react';
import Register from "./Register";
import Login from './Login';
import {Switch, Route} from "react-router-dom";

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path={"/register"}>
                        <Register/>
                    </Route>
                    <Route path={"/login"}>
                        <Login/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default Main;