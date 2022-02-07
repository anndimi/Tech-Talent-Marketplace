import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import {
  combineReducers,
  createStore,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";

import { UserProfile } from "./components/UserProfile";
import user from "./reducers/user";
import add from "./reducers/add";
import { Startpage } from "./pages/Startpage";
import SignUp from "./components/SignUp";
import AddsList from "./components/AddsList";
import AddForm from "./components/AddForm";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import { VisitUserProfile } from "./components/VisitUserProfile";
import Inspiration from "./pages/Inspiration";
import SingleAddModal from "./components/SingleAddModal";
import { EditProfile } from "./components/EditProfile";
import { UploadImg } from "./components/UploadImg";
import { Footer } from "./components/Footer";

import Box from "@mui/material/Box";

const reducer = combineReducers({
  user: user.reducer,
  add: add.reducer,
});
const persistedStateJSON = localStorage.getItem("userReduxState");
let persistedState = {};

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON);
}

const composedEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  reducer,
  persistedState,
  composedEnhancers(applyMiddleware(thunkMiddleware))
);

// Ska in i store  persistedState
store.subscribe(() => {
  localStorage.setItem("userReduxState", JSON.stringify(store.getState()));
});

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Startpage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/adds" element={<AddsList />}>
            <Route path=":id" element={<SingleAddModal />} />
            <Route path="create" element={<AddForm />} />
          </Route>
          <Route path="/userprofile/:id" element={<UserProfile />}>
            <Route path="edit" element={<EditProfile />} />
            <Route path="edit/image" element={<UploadImg />} />
          </Route>

          <Route
            path="adds/userprofile/:id/visit"
            element={<VisitUserProfile />}
          />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
