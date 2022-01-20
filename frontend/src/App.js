import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "@reduxjs/toolkit";

import { UserProfile } from "./components/UserProfile";
import user from "./reducers/user";
import add from "./reducers/add";
import SignUp from "./components/SignUp";
import AddsList from "./components/AddsList";
import AddForm from "./components/AddForm";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import SingleAddModal from "./components/SingleAddModal";

const reducer = combineReducers({
  user: user.reducer,
  add: add.reducer,
});
// const persistedStateJSON = localStorage.getItem("userReduxState");
// let persistedState = {};

// if (persistedStateJSON) {
//   persistedState = JSON.parse(persistedStateJSON);
// }

const store = createStore(reducer);

// Ska in i store  persistedState
// store.subscribe(() => {
//   localStorage.setItem("userReduxState", JSON.stringify(store.getState()));
// });

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/adds" element={<AddsList />} /> */}
          <Route path="/adds" element={<AddsList />}>
            <Route path=":id" element={<SingleAddModal />} />
          </Route>
          <Route path="/addsform" element={<AddForm />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
