import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    email: null,
    accessToken: null,
    error: null,
    location: null,
    name: null,
    memberSince: null,
    bio: null,
    linkedIn: null,
    github: null,
    mode: "signup",
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setLocation: (store, action) => {
      store.location = action.payload;
    },
    setName: (store, action) => {
      store.name = action.payload;
    },
    setMemberSince: (store, action) => {
      store.memberSince = action.payload;
    },
    setBio: (store, action) => {
      store.bio = action.payload;
    },
    setLinkedIn: (store, action) => {
      store.linkedIn = action.payload;
    },
    setGithub: (store, action) => {
      store.github = action.payload;
    },
    setMode: (store, action) => {
      store.mode = action.payload;
    },
    clearAccessToken: (store) => {
      store.accessToken = null;
    },
  },
});

export default user;
