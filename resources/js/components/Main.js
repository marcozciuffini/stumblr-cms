import React, {useState, useEffect} from 'react';
import Header from "./Header";
// import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Pubs from "./Pubs";
import Towns from "./Towns";
import { createStore } from "redux";
import reducers from "../reducers/reducers";

const Main = () => {

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let state = localStorage["appState"];
        if (state) {
            let appState = JSON.parse(state);
            setUser(appState.user);
            setIsLoggedIn(appState.isLoggedIn);
        }
    }, []);

    const initialState = {
        townId: 0
    };

    let store = createStore(reducers, initialState);

    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path='/towns'>
                        <Towns/>
                    </Route>
                    <Route path='/pubs'>
                        <Pubs/>
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

export default Main;
