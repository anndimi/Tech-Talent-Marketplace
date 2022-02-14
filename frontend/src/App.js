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
import user from "./reducers/user";
import post from "./reducers/post";
import UserProfile from "./pages/UserProfile";
import VisitUserProfile from "./pages/VisitUserProfile";
import Startpage from "./pages/Startpage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Inspiration from "./pages/Inspiration";
import SignUp from "./components/UserComponents/SignUp";
import PostsList from "./pages/PostsList";
import PostForm from "./components/PostComponents/PostForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/elements/Navbar";
import SinglePostModal from "./components/PostComponents/SinglePostModal";
import EditProfile from "./components/UserComponents/EditProfile";
import UploadImg from "./components/UserComponents/UploadImg";
import Footer from "./components/elements/Footer";

const reducer = combineReducers({
  user: user.reducer,
  post: post.reducer,
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

const scrollWin = () => {
  window.scrollTo(0, 0);
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Startpage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/posts" element={<PostsList />}>
            <Route path=":id" element={<SinglePostModal />} />
            <Route path="create" element={<PostForm />} />
          </Route>
          <Route path="/userprofile/:id" element={<UserProfile />}>
            <Route path="edit" element={<EditProfile />} />
            <Route path="edit/image" element={<UploadImg />} />
          </Route>

          <Route
            path="posts/userprofile/:id/visit"
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
