import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../utils/constants";
import AddForm from "./AddForm";
import moment from "moment";
import add from "../reducers/add";
import styled from "styled-components";
import AddFilter from "./AddFilter";
import SingleAddModal from "./SingleAddModal";
import { StyledButton } from "./Buttons/StyledButtons";
import { SearchBar } from "./SearchBar";
import IconSwitcher from "./IconSwitcher";

//Material UI Card
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AddListSection = styled.section`
  padding: 20px;
`;

const AddCard = styled.div`
  border: solid 1px #212427;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
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
  gap: 15px;
`;
const TagWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
`;

const AddsList = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addItems = useSelector((store) => store.add.items);

  const [isModalActive, setModalActive] = useState(false);

  // const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalActive(!isModalActive);
  };

  const onSortByTimeChange = (event) => {
    setSort(event.target.value);
    // sortedAddItems();
  };
  const onTypeChange = (event) => {
    setType(event.target.value);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onFilterReset = () => {
    setFilter("");
    setSort("");
    setType("");
  };

  // const sortedByTimeAddItems = addItems.sort((a, b) => {
  //a.title - b.title
  // return addItems
  // });

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

  // const sortedAddItems = filteredAddItems.sort((oldestAdds, newestAdds) => {
  //   sort === "Oldest" &&
  //     return new Date(oldestAdds.createdDate) - new Date(newestAdds.createdDate);

  // });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        // Authorization: accessToken,
      },
    };
    fetch(API_URL(`adds?title=${searchValue}`), options)
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
  }, [searchValue, dispatch]);

  // ,[accessToken] add to line above

  return (
    <>
      <StyledButton
        onClick={() => {
          navigate("create");
          toggleModal();
        }}
      >
        Create add
      </StyledButton>
      <AddListSection onClick={() => setModalActive(false)}>
        <SingleAddModal />
        <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
        <div>
          <AddForm
            toggleModal={toggleModal}
            onClose={() => setModalActive(false)}
            isModalActive={isModalActive}
            filteredAddItems={filteredAddItems}
          />
          <AddFilter
            filter={filter}
            sort={sort}
            type={type}
            onFilterChange={onFilterChange}
            onTypeChange={onTypeChange}
            onFilterReset={onFilterReset}
            onSortByTimeChange={onSortByTimeChange}
            // sortedAddItems={sortedAddItems}
          />
        </div>
        <AddWrapper>
          {filteredAddItems.length === 0 ? (
            <h1>No adds</h1>
          ) : (
            filteredAddItems.map((item) => (
              <Card
                key={item._id}
                onClick={() => {
                  navigate(item._id);
                }}
                sx={{ width: 350 }}
              >
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        padding: 0,
                        fontFamily: "secondary.fontFamily",
                        marginBottom: 1,
                      }}
                      color="primary.main"
                      gutterBottom
                    >
                      {moment(item.createdAt).fromNow()}
                      <br />
                      {item.typeOf} {item.category}
                    </Typography>
                    <img
                      src={IconSwitcher(item.category)}
                      style={{ width: 38, height: 38 }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontFamily: "primary.fontFamily",
                      marginTop: 3,
                    }}
                    variant="h5"
                    component="div"
                    noWrap
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      padding: 0,
                      marginTop: 3,
                      fontFamily: "secondary.fontFamily",
                    }}
                  >
                    Budget is {item.budget}
                    {item.currency}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
                    Posted by:
                  </Typography>
                  <Button
                    size="small"
                    sx={{ fontFamily: "secondary.fontFamily" }}
                  >
                    {item.user?.username}
                  </Button>
                </CardActions>
              </Card>

              // <AddCard
              //   key={item._id}
              //   onClick={() => {
              //     navigate(item._id);
              //   }}
              // >
              //   <TagWrapper>
              //     <p>
              //       {item.typeOf} {item.category}
              //     </p>
              //     <p>{moment(item.createdAt).fromNow()}</p>
              //     <p>Posted by: {item.user?.username}</p>
              //   </TagWrapper>
              //   <h2>{item.title}</h2>

              //   {/* <p>{item.description}</p> */}
              //   <img src={IconSwitcher(item.category)} />

              //   <p>
              //     Budget is {item.budget}
              //     {item.currency}
              //   </p>

              //   {/* Utkommenderat för att vi inte har nån authentication  */}
              //   {/* <p>{item.user.username}</p>
              //   <p>{item.user.email}</p> */}
              // </AddCard>
            ))
          )}
        </AddWrapper>
      </AddListSection>
    </>
  );
};

export default AddsList;
