import React from "react";
import user from "../reducers/user";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import linkedinIcon from "../assets/icons/linkedin-icon.png";
import githubIcon from "../assets/icons/github-icon.png";
import { MyAdds } from "./MyPosts";
import { API_URL } from "../utils/constants";
import dummyUser from "../assets/icons/dummy-user.png";
import UserBg from "../assets/images/user-bg.jpg";
import {
  Typography,
  Divider,
  Box,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import styled from "styled-components";
import { StyledHeaderImage } from "./elements/HeroImage";

export const VisitUserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    console.log(visitInfo);
  }, []);

  const matches = useMediaQuery((theme) => theme.breakpoints.up("tablet"));

  const createData = (key, value) => {
    return { key, value };
  };

  const rows = [
    createData("Username", visitInfo.username),
    createData("Fullname", visitInfo.name),
    createData("Email", visitInfo.email),
    createData("Location", visitInfo.location),
    createData("Bio", visitInfo.userBio),
  ];

  return (
    <>
      <Box>
        <StyledHeaderImage style={{ height: 290 }} />
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: 2 }}
        ></Box>
        <Box sx={{ display: "flex" }}>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundPosition: "center",
              border: "solid 5px #faf8f8",
              marginLeft: "10%",
              marginTop: "25px",
              zIndex: 3,
              outline: 0,
              backgroundColor: "#F8C53A",
            }}
            src={visitInfo.image?.imageUrl || dummyUser}
            alt="User Profile image"
            alt="profile"
          />
          <Box sx={{ zIndex: 4, marginLeft: 2 }}>
            <Box sx={{ marginTop: 4 }}>
              <Typography
                sx={{
                  fontFamily: "primary.fontFamily",
                  fontWeight: "700",
                  fontSize: 30,
                  padding: 0,
                  alignSelf: "end",
                  zIndex: 3,
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
                {visitInfo.username}
              </Typography>
              <Typography
                sx={{
                  padding: 0,
                  fontFamily: "primary.fontFamily",
                  color: "white",
                }}
              >
                Member since {moment(visitInfo.created).format("MMMM Do YYYY")}
              </Typography>
            </Box>
          </Box>
        </Box>
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
                <TableRow>
                  <TableCell align="left">
                    <a
                      href={visitInfo.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={linkedinIcon} alt="linkedin-icon" />
                    </a>
                    <a
                      href={visitInfo.gitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={githubIcon} alt="github-icon" />
                    </a>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </section>
      <MyAdds />
    </>
  );
};
