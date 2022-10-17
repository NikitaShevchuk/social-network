import React from "react";
import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router-dom";
import App from "./components/App/App";
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faAngleDown, faBriefcase, faS, faAddressCard} from '@fortawesome/free-solid-svg-icons';

library.add(fab, faAngleDown, faS, faBriefcase, faAddressCard)

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
)
