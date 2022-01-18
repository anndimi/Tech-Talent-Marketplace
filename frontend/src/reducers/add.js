import { createSlice } from "@reduxjs/toolkit";

const add = createSlice({
  name: "add",
  initialState: {
    items: [],
    title: null,
    description: null,
    budget: null,
    currency: null,
    category: null,
    time: null,
    createdAt: null,
    typeOf: null,
    user: null,
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setTitle: (store, action) => {
      store.title = action.payload;
    },
    setDescriprion: (store, action) => {
      store.description = action.payload;
    },
    setBudget: (store, action) => {
      store.budget = action.payload;
    },
    setCurrency: (store, action) => {
      store.currency = action.payload;
    },
    setCategory: (store, action) => {
      store.category = action.payload;
    },
    setTime: (store, action) => {
      store.time = action.payload;
    },
    setCreatedAt: (store, action) => {
      store.createdAt = action.payload;
    },
    setTypeOf: (store, action) => {
      store.typeOf = action.payload;
    },
    setUser: (store, action) => {
      store.user = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default add;
