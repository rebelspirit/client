import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {MainPage} from './pages/MainPage';
import {LoginPage} from "./pages/LoginPage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Switch>
                <Route path={"/dashboard"} exact>
                    <MainPage/>
                </Route>
                <Redirect to={"/dashboard"}/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path={"/"}>
                <LoginPage/>
            </Route>
            <Redirect to={"/"}/>
        </Switch>
    )
};