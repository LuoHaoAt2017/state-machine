import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Actress from "./pages/Actress";
import Resume from "./pages/Resume";
import Leaves from "./pages/Leaves";
import Counter from "./pages/Counter";
import Todos from "./pages/Todos";
import Error from "./pages/Error";
import store from "./store";
import App from "./App";
import "../mocks/actress";
import "antd/dist/antd.css";

ReactDom.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Login />} />
              <Route path="home" element={<Home />} />
              <Route path="actress" element={<Actress />} />
              <Route path="resume" element={<Resume />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="counter" element={<Counter />} />
              <Route path="todos" element={<Todos />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app")
);
