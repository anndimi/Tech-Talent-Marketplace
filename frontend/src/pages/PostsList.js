import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import post from "../reducers/post";
import UpArrow from "../components/elements/UpArrow";
import { API_URL } from "../utils/constants";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import SinglePostModal from "../components/SinglePostModal";
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

const PostListSection = styled.section``;

const PostWrapper = styled.div`
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const PostFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PostsList = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isModalActive, setModalActive] = useState(false);

  const postItems = useSelector((store) => store.post.items);
  const userId = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const sortedList = (posts) => {
    if (sort === "Old") {
      const sortedArray = _.orderBy(
        posts,
        [(obj) => new Date(obj.createdAt)],
        ["asc"]
      );
      return sortedArray;
    } else {
      return posts;
    }
  };

  const onFilterReset = () => {
    setFilter("");
    setSort("");
    setType("");
  };

  const filteredPostItems = postItems.filter((item) => {
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
    fetch(API_URL(`posts?title=${searchValue}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(post.actions.setItems(data.response));
          dispatch(post.actions.setError(null));
        } else {
          dispatch(post.actions.setItems(null));
          dispatch(post.actions.setError(data.response));
        }
      });
  }, [searchValue, dispatch]);

  return (
    <>
      <StyledHeaderImage />
      <PostFilterContainer>
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
          <PostFilter
            filter={filter}
            sort={sort}
            type={type}
            onFilterChange={onFilterChange}
            onTypeChange={onTypeChange}
            onFilterReset={onFilterReset}
            onSortByTimeChange={onSortByTimeChange}
          />
        </Box>
      </PostFilterContainer>
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
              Create post
            </Typography>
          </Button>
        )}
      </Box>

      <PostListSection onClick={() => setModalActive(false)}>
        <SinglePostModal />

        <div>
          <PostForm
            toggleModal={toggleModal}
            onClose={() => setModalActive(false)}
            isModalActive={isModalActive}
            filteredPostItems={filteredPostItems}
          />
        </div>
        <PostWrapper>
          {filteredPostItems.length === 0 ? (
            <div style={{ marginTop: "40px" }}>
              <h1>No posts found</h1>
            </div>
          ) : (
            sortedList(filteredPostItems).map((item) => (
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
        </PostWrapper>
      </PostListSection>
      <UpArrow />
    </>
  );
};

export default PostsList;
