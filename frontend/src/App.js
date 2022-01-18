import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./reducers/user";
import SignUp from "./components/SignUp";
import AddList from "./components/AddList";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/adds" element={<AddList />} />
          {/* <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
