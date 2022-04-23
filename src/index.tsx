import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Actress from "./pages/Actress";
import store from "./store";
import App from "./App";
import "../mocks/actress";

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/home" element={<Home />} />
        <Route index element={<Actress />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
