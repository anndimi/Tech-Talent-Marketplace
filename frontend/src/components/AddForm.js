import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import add from "../reducers/add";
import { API_URL } from "../utils/constants";

const AddForm = () => {
  const [typeOf, setTypeOf] = useState("Join");
  const [info, setInfo] = useState({
    // typeOf: "",
    title: "",
    description: "",
    budget: "",
    currency: "",
    category: "",
  });

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        info,
      }),
    };

    fetch(API_URL("adds"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(add.actions.setTypeOf(data.response.typeOf));
            dispatch(add.actions.setTitle(data.response.title));
            dispatch(add.actions.setDescription(data.response.description));
            dispatch(add.actions.setBudget(data.response.budget));
            dispatch(add.actions.setCurrency(data.response.currency));
            dispatch(add.actions.setCategory(data.response.category));
            dispatch(add.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(add.actions.setTypeOf(null));
            dispatch(add.actions.setTitle(null));
            dispatch(add.actions.setDescription(null));
            dispatch(add.actions.setBudget(null));
            dispatch(add.actions.setCurrency(null));
            dispatch(add.actions.setCategory(null));
            dispatch(add.actions.setError(data.response));
          });
          alert(data.response);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="Looking for">Looking for </label>
        <input
          id="Looking for"
          type="radio"
          value="Looking for"
          checked={typeOf === "Looking for"}
          onChange={(e) => setTypeOf(e.target.value)}
        />

        <label htmlFor="Join">Join </label>
        <input
          id="Join"
          type="radio"
          value="Join"
          checked={typeOf === "Join"}
          onChange={(e) => setTypeOf(e.target.value)}
        />

        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          value={info.title}
          onChange={(e) => setInfo(e.target.value)}
        ></input>

        <label htmlFor="currency">Category:</label>
        <select>
          <option value={info.category}>Frontend</option>
          <option value={info.category}>Backend</option>
          <option value={info.category}>Graphics and Design</option>
          <option value={info.category}>Fullstack</option>
          <option value={info.category}>App Developer</option>
          <option value={info.category}>Chatbots</option>
          <option value={info.category}>Project Lead</option>
          <option value={info.category}>QA</option>
          <option value={info.category}>Legal Consulting</option>
          <option value={info.category}>Financial Consulting</option>
          <option value={info.category}>Analytics</option>
          <option value={info.category}>Game Developer</option>
        </select>

        <label htmlFor="description">Description: </label>
        <textarea
          id="title"
          type="text"
          value={info.description}
          autoComplete="off"
          onChange={(e) => setInfo(e.target.value)}
        />

        <label htmlFor="password">Budget: </label>
        <input
          id="budget"
          type="number"
          value={info.budget}
          onChange={(e) => setInfo(e.target.value)}
        ></input>
        <label htmlFor="currency">Currency:</label>
        <select>
          <option value={info.currency}>SEK</option>
          <option value={info.currency}>EUR</option>
          <option value={info.currency}>USD</option>
          <option value={info.currency}>NOK</option>
          <option value={info.currency}>GBP</option>
          <option value={info.currency}>DKK</option>
          <option value={info.currency}>CNY</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddForm;
