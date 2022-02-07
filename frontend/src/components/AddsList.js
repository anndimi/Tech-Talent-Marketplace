import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

import { UpArrow } from "./elements/UpArrow";
import { API_URL } from "../utils/constants";
import AddForm from "./AddForm";
import add from "../reducers/add";
import AddFilter from "./AddFilter";
import SingleAddModal from "./SingleAddModal";
import { SearchBar } from "./SearchBar";
import IconSwitcher from "./IconSwitcher";
import UserBg from "../assets/images/user-bg.jpg";
import plusIcon from "../assets/icons/plus-icon.png";
// import { StyledButton } from "./Buttons/StyledButtons";

//Material UI Card
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

let humanize = require("humanize-number");

const StyledAddsImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${UserBg});
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const AddListSection = styled.section`
  /* padding: 20px; */
`;

const AddWrapper = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const AddsList = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const addItems = useSelector((store) => store.add.items);
  const userId = useSelector((store) => store.user.userId);
  const createdAt = useSelector((store) => store.add.createdAt);

  const [isModalActive, setModalActive] = useState(false);

  // const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const toggleModal = () => {
    setModalActive(!isModalActive);
  };

  const onTypeChange = (event) => {
    setType(event.target.value);
  };

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const onSortByTimeChange = (event) => {
    setSort(event.target.value);
  };
  // const dateSort = addItems.sort((a, b) => {
  //   return new Date(b.createdAt) - new Date(a.createdAt);

  //   if (sort === "Old") {
  //     return dateSort;
  //   } else {
  //     return addItems;
  //   }
  // });

  const sortedList = (adds) => {
    
    if (sort === "Old") {
      console.log(adds.sort((a, b) => {
        return b.createdAt - a.createdAt
      }));
      return adds.sort((a, b) => {
        return b.createdAt - a.createdAt
      });
    } else {
      console.log(adds);
      return adds;
    }
  };


  const onFilterReset = () => {
    setFilter("");
    setSort("");
    setType("");
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

  // const onSort = (sort) => {
  //   if (sort === "Oldest") {
  //     return filteredAddItems.reverse();
  //   } else {
  //     return filteredAddItems;
  //   }
  // };

  // console.log(filteredAddItems.reverse());

  useEffect(() => {
    const options = {
      method: "GET",
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

  return (
    <>
      <StyledAddsImage />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: 7,
        }}
      >
        <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
        <AddFilter
          filter={filter}
          sort={sort}
          type={type}
          onFilterChange={onFilterChange}
          onTypeChange={onTypeChange}
          onFilterReset={onFilterReset}
          onSortByTimeChange={onSortByTimeChange}
          // onSort={onSort}
          // sortedAddItems={sortedAddItems}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => {
            navigate("create");
            toggleModal();
          }}
        >
          <Typography sx={{ fontFamily: "secondary.fontFamily" }}>
            Create add
          </Typography>
          {/* <img style={{ width: 40, height: 40 }} src={plusIcon} /> */}
        </Button>
      </Box>

      <AddListSection onClick={() => setModalActive(false)}>
        <SingleAddModal />

        <div>
          <AddForm
            toggleModal={toggleModal}
            onClose={() => setModalActive(false)}
            isModalActive={isModalActive}
            filteredAddItems={filteredAddItems}
          />
        </div>
        <AddWrapper>
          {filteredAddItems.length === 0 ? (
            <div style={{ marginTop: "40px" }}>
              <h1>No adds</h1>
            </div>
          ) : (
            sortedList(filteredAddItems).map((item) => (
              <Card
                key={item._id}
                sx={{ width: 350, margin: 2, cursor: "pointer" }}
              >
                <CardContent
                  onClick={() => {
                    navigate(item._id);
                  }}
                >
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
                      alt="icon"
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
                    Budget is {humanize(item.budget)}
                    {item.currency}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "secondary.fontFamily",
                      }}
                    >
                      Posted by:
                    </Typography>
                    <Button
                      onClick={() => {
                        if (item.user._id === userId) {
                          navigate(`/userprofile/${userId}`);
                        } else {
                          navigate(`userprofile/${item.user._id}/visit`);
                        }
                      }}
                      size="small"
                      sx={{
                        fontFamily: "secondary.fontFamily",
                      }}
                    >
                      {item.user?.username}
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            ))
          )}
        </AddWrapper>
      </AddListSection>
      <UpArrow />
    </>
  );
};

export default AddsList;
