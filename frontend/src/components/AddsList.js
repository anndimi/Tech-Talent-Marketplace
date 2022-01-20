import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";
import AddForm from "./AddForm";
import moment from "moment";
import add from "../reducers/add";
import styled from "styled-components";
import { AddFilter } from "./AddFilter";
import SingleAddModal from "./SingleAddModal";

const AddListSection = styled.section`
  padding: 20px;
`;

const AddCard = styled.div`
  border: solid 1px #212427;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  width: 45%;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const AddWrapper = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
`;

const AddsList = () => {
  const [singleAdd, setSingleAdd] = useState("");
  const addItems = useSelector((store) => store.add.items);
  // const addId = useSelector((store) => store.add._id);
  // const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, [accessToken, navigate]);

  const [isModalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!isModalActive);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL("adds"), options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.response);
          dispatch(add.actions.setItems(data.response));
          dispatch(add.actions.setError(null));
        } else {
          dispatch(add.actions.setItems(null));
          dispatch(add.actions.setError(data.response));
        }
      });
  }, []);

  // ,[accessToken] add to line above

  return (
    <AddListSection>
      <AddForm />
      <SingleAddModal
        isModalActive={isModalActive}
        toggleModal={toggleModal}
        singleAdd={singleAdd}
      />
      <h1>All our adds</h1>
      <AddFilter />
      <AddWrapper>
        {addItems.map((item) => (
          <AddCard
            key={item._id}
            onClick={() => {
              navigate(item._id);
            }}
          >
            <TagWrapper>
              <p>
                {item.typeOf} {item.category}
              </p>
              {/* <p>{item._id}</p> */}

              <p>{moment(item.createdAt).fromNow()}</p>
            </TagWrapper>
            <h2>{item.title}</h2>

            {/* <p>{item.description}</p> */}
            <p>
              Budget is {item.budget}
              {item.currency}
            </p>

            {/* Utkommenderat för att vi inte har nån authentication */}
            {/* <p>{item.user.username}</p>
          <p>{item.user.email}</p> */}
          </AddCard>
        ))}
      </AddWrapper>
    </AddListSection>
  );
};

export default AddsList;
