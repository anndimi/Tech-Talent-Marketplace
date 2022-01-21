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
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");

  const addItems = useSelector((store) => store.add.items);

  // const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/login");
  //   }
  // }, [accessToken, navigate]);

  const [isModalActive, setModalActive] = useState(false);

  const toggleModal = () => {
    setModalActive(!isModalActive);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };
  // const sortedByTimeAddItems = addItems.sort((a, b) => {
  //   if (a.title < b.title) {
  //     return -1;
  //   }
  //   if (a.title > b.title) {
  //     return 1;
  //   }
  //   return 0;
  // });

  const onSortByTimeChange = (event) => {
    setSort(event.target.value);
  };
  const onTypeChange = (event) => {
    setType(event.target.value);
  };

  //Kanske filteredAddItems.sort (vi tar det på måndag)
  const filteredAddItems = addItems.filter((item) => {
    if (type && filter) {
      return item.typeOf === type && item.category === filter;
    }
    if (filter) {
      return item.category === filter;
    }
    if (type) {
      return item.typeOf === type;
    }
    return item;
  });

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
      <SingleAddModal
        isModalActive={isModalActive}
        toggleModal={toggleModal}
        singleAdd={singleAdd}
      />
      <div>
        <AddForm />
        <>
          <p>This is where we filter our adds</p>
          <label>Filter</label>

          <select value={filter} onChange={onFilterChange}>
            <option hidden>Category..</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Graphics and Design">Graphics and Design</option>
            <option value="Fullstack">Fullstack</option>
            <option value="App Developer">App Developer</option>
            <option value="Chatbots">Chatbots</option>
            <option value="Project Lead">Project Lead</option>
            <option value="QA">QA</option>
            <option value="Legal Consulting">Legal Consulting</option>
            <option value="Financial Consulting">Financial Consulting</option>
            <option value="Analytics">Analytics</option>
            <option value="Game Developer">Game Developer</option>
          </select>
          <label>Time</label>
          <select value={sort} onChange={onSortByTimeChange}>
            <option hidden>Time..</option>
            <option value="Ascending">Oldest to newest</option>
            <option value="Descending">Oldest to newest</option>
            <option value="AZ">A - Z</option>
            <option value="ZA">Z - A</option>
          </select>

          <label>Type</label>
          <select value={type} onChange={onTypeChange}>
            <option hidden>Type..</option>
            <option value="Looking for">Looking for</option>
            <option value="Join as">Join as</option>
          </select>
        </>
      </div>
      <AddWrapper>
        {filteredAddItems.map((item) => (
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
