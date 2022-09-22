import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import {HashRouter} from "react-router-dom";
import App from "./App";
import store from "./redux/redux-store";
import {Provider} from "react-redux";

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
)
