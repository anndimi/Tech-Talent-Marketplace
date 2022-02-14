import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import user from "../reducers/user";
import EditProfile from "../components/UserComponents/EditProfile";
import UploadImg from "../components/UserComponents/UploadImg";
import MyPosts from "../components/UserComponents/MyPosts";
import SavedPosts from "../components/UserComponents/SavedPosts";
import UpArrow from "../components/elements/UpArrow";
import { StyledHeaderImage } from "../components/elements/HeroImage";
import DeleteUser from "../components/elements/DeleteUser";
import dummyUser from "../assets/icons/dummy-user.png";

import {
  IconButton,
  Box,
  Typography,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    margin-left: 15%;
    flex-direction: row;
    justify-content: initial;
    img {
      margin-left: 15px;
    }
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    justify-content: initial;
    align-items: initial;
  }
`;

export const ProfileInfo = styled.div`
  margin-top: 4px;
  text-align: center;
  z-index: 3;
  @media (min-width: 768px) {
    margin-left: 10px;
    text-align: left;
    margin-top: 40px;
  }
`;

export const ProfileInfoText = styled.p`
  font-family: Spartan, sans-serif;
  font-weight: 700;
  font-size: 28px;
  margin: 10px;
  padding: 0;
  align-self: end;
  z-index: 3;
  color: #4c4c4c;
  word-break: break-word;
  &.member-since {
    font-size: 15px;
    font-weight: 500;
  }
  @media (min-width: 768px) {
    color: #faf8f8;
  }
`;

const UserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const name = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const location = useSelector((store) => store.user.location);
  const userBio = useSelector((store) => store.user.bio);
  const linkedIn = useSelector((store) => store.user.linkedIn);
  const gitHub = useSelector((store) => store.user.github);
  const created = useSelector((store) => store.user.created);
  const image = useSelector(
    (store) => console.log(store.user) && store.user.image
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(image, "image", username, "user");

  const [isEditModalActive, setEditModalActive] = useState(false);
  const [isImageModalActive, setImageModalActive] = useState(false);
  const { id } = useParams();

  const toggleEditModal = () => {
    setEditModalActive(!isEditModalActive);
  };

  const toggleImageModal = () => {
    setImageModalActive(!isImageModalActive);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  const onButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
  };

  const createData = (key, value) => {
    return { key, value };
  };

  const rows = [
    createData("Username", username),
    createData("Fullname", name),
    createData("Email", email),
    createData("Location", location),
    createData("Bio", userBio),
    createData("LinkedIn", linkedIn),
    createData("GitHub", gitHub),
  ];

  return (
    <>
      <Box>
        <StyledHeaderImage style={{ height: 290 }} />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", margin: 2 }}
        ></Box>
        <ProfileContainer>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundPosition: "center",
              border: "solid 5px #faf8f8",
              marginTop: "25px",
              zIndex: 3,
              outline: 0,
              backgroundColor: "#F8C53A",
            }}
            src={image || dummyUser}
            alt="User Profile"
          />
          <ProfileWrapper>
            <ProfileInfo>
              <ProfileInfoText>{username}</ProfileInfoText>
              <ProfileInfoText className="member-since">
                Member since {moment(created).format("MMMM Do YYYY")}
              </ProfileInfoText>
            </ProfileInfo>
            <div>
              <Fab
                onClick={() => {
                  navigate("edit");
                  toggleEditModal();
                }}
                sx={{ height: 50, width: 50, "&:hover": { color: "#F8C53A" } }}
              >
                <EditIcon />
              </Fab>
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    navigate("edit/image");
                    toggleImageModal();
                  }}
                >
                  <Fab
                    sx={{
                      height: 50,
                      width: 50,
                      "&:hover": { color: "#F8C53A" },
                    }}
                  >
                    <PhotoCamera />
                  </Fab>
                </IconButton>
              </label>
            </div>
          </ProfileWrapper>
        </ProfileContainer>
      </Box>

      <section
        onClick={() => {
          setEditModalActive(false);
          setImageModalActive(false);
          navigate(`/userprofile/${id}`);
        }}
      >
        <EditProfile
          isEditModalActive={isEditModalActive}
          toggleEditModal={toggleEditModal}
          onClose={() => setEditModalActive(false)}
        />
        <UploadImg
          isImageModalActive={isImageModalActive}
          toggleImageModal={toggleImageModal}
          onClose={() => setImageModalActive(false)}
        />
        <Divider variant="middle">
          <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
            My information
          </Typography>
        </Divider>
        <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
          <TableContainer
            component={Paper}
            sx={{ width: "80%", maxWidth: 700 }}
          >
            <Table sx={{ minWidth: "650" }} aria-label="simple table">
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      fontFamily: "secondary.fontFamily",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "secondary.fontFamily",
                        fontSize: 18,
                      }}
                    >
                      {row.key}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        wordBreak: "break-word",
                        fontFamily: "secondary.fontFamily",
                        fontSize: 16,
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </section>
      <MyPosts />
      <SavedPosts />
      <Divider variant="middle">
        <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
          Manage account
        </Typography>
      </Divider>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", padding: 4 }}>
        <DeleteUser id={id} />
        <Button
          variant="contained"
          sx={{
            fontFamily: "secondary.fontFamily",
            letterSpacing: 1.3,
            margin: 1,
          }}
          onClick={onButtonClick}
        >
          Sign out
        </Button>
      </Box>
      <UpArrow />
    </>
  );
};

export default UserProfile;
