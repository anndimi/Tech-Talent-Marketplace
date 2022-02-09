import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import add from "../reducers/add";
import UpArrow from "../components/elements/UpArrow";
import { API_URL } from "../utils/constants";
import AddForm from "../components/AddForm";
import AddFilter from "../components/AddFilter";
import SingleAddModal from "../components/SingleAddModal";
import { SearchBar } from "../components/SearchBar";
import IconSwitcher from "../components/IconSwitcher";
import { StyledHeaderImage } from "../components/elements/HeroImage";
import moment from "moment";
import styled from "styled-components";
//Material UI Card
import {
  Box,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import _ from "lodash";

let humanize = require("humanize-number");

const AddListSection = styled.section``;

const AddWrapper = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const AddFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddsList = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isModalActive, setModalActive] = useState(false);

  const addItems = useSelector((store) => store.add.items);
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);

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

  const sortedList = (adds) => {
    console.log(sort);
    if (sort === "Old") {
      const sortedArray = _.orderBy(
        adds,
        [(obj) => new Date(obj.createdAt)],
        ["asc"]
      );
      return sortedArray;
    } else {
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

  useEffect(() => {
    const options = {
      method: "GET",
    };
    fetch(API_URL(`adds?title=${searchValue}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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
      <StyledHeaderImage />
      <AddFilterContainer>
        <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 2,
          }}
        >
          <AddFilter
            filter={filter}
            sort={sort}
            type={type}
            onFilterChange={onFilterChange}
            onTypeChange={onTypeChange}
            onFilterReset={onFilterReset}
            onSortByTimeChange={onSortByTimeChange}
          />
        </Box>
      </AddFilterContainer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {accessToken && (
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
          </Button>
        )}
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
                    {moment(item.createdAt).add(2, "days").calendar() >
                    moment().fromNow() ? (
                      <Typography>hello</Typography>
                    ) : (
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
                    )}
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
