import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import AddForm from "./AddForm";
import moment from "moment";
import add from "../reducers/add";
import styled from "styled-components";

const AddListSection = styled.section`
  padding: 20px;
`;

const AddsList = () => {
  const [adds, setAdds] = useState([]);
  // const addItems = useSelector((store) => store.add.items);
  // const accessToken = useSelector((store) => store.user.accessToken);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL("adds"), options)
      .then((res) => res.json())
      .then((data) => setAdds(data.response));
  });

  // ,[accessToken] add to line above

  return (
    <AddListSection>
      <AddForm />
      <h1>All our adds</h1>
      {adds.map((item) => (
        <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>
            {item.budget}
            {item.currency}
          </p>
          <p>{item.category}</p>
          <p>{moment(item.createdAt).fromNow()}</p>
          <p>{item.typeOf}</p>
          {/* Utkommenderat för att vi inte har nån authentication */}
          {/* <p>{item.user.username}</p>
          <p>{item.user.email}</p> */}
        </div>
      ))}
    </AddListSection>
  );
};

export default AddsList;
