import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import MyPosts from "../components/MyPosts";
import { API_URL } from "../utils/constants";
import dummyUser from "../assets/icons/dummy-user.png";
import {
  Typography,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import styled from "styled-components";
import { StyledHeaderImage } from "../components/elements/HeroImage";
import {
  ProfileContainer,
  ProfileWrapper,
  ProfileInfoText,
} from "./UserProfile";

const ProfileInfo = styled.div`
  margin-top: 4px;
  text-align: center;
  z-index: 3;
  @media (min-width: 768px) {
    margin-left: 10px;
    text-align: left;
  }
`;

const VisitUserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const [visitInfo, setVisitInfo] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signup");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    fetch(API_URL(`userprofile/${id}`))
      .then((res) => res.json())
      .then((data) => setVisitInfo(data.response));
  }, [id]);

  const createData = (key, value) => {
    return { key, value };
  };

  const rows = [
    createData("Username", visitInfo.username),
    createData("Fullname", visitInfo.name),
    createData("Email", visitInfo.email),
    createData("Location", visitInfo.location),
    createData("Bio", visitInfo.userBio),
    createData("LinkedIn", visitInfo.linkedIn),
    createData("GitHub", visitInfo.gitHub),
  ];

  return (
    <>
      <Box>
        <StyledHeaderImage style={{ height: 290 }} />
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: 2 }}
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
            src={visitInfo.image?.imageUrl || dummyUser}
            alt="User Profile"
          />
          <ProfileWrapper>
            <ProfileInfo>
              <ProfileInfoText>{visitInfo.username}</ProfileInfoText>
              <ProfileInfoText className="member-since">
                Member since {moment(visitInfo.created).format("MMMM Do YYYY")}
              </ProfileInfoText>
            </ProfileInfo>
          </ProfileWrapper>
        </ProfileContainer>
      </Box>

      <section>
        <Divider variant="middle">
          <Typography sx={{ fontFamily: "secondary.fontFamily", fontSize: 20 }}>
            Information
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
                      sx={{ wordBreak: "break-word" }}
                    >
                      {row.key}
                    </TableCell>

                    <TableCell align="left" sx={{ wordBreak: "break-word" }}>
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
    </>
  );
};

export default VisitUserProfile;
