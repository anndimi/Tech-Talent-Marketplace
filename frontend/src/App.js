import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./reducers/user";
import add from "./reducers/add";
import SignUp from "./components/SignUp";
import AddsList from "./components/AddsList";
import AddForm from "./components/AddForm";

const reducer = combineReducers({
  user: user.reducer,
  add: add.reducer,
});

const store = configureStore({ reducer });

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/adds" element={<AddsList />} />
          <Route path="/addsform" element={<AddForm />} />
          {/* <Route path="/signin" element={<Login />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
