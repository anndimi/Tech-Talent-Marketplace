import React from "react";
import user from "../reducers/user";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
// import styled from "styled-components";
import linkedinIcon from "../assets/icons/linkedin-icon.png";
import githubIcon from "../assets/icons/github-icon.png";
import { EditProfile } from "./EditProfile";
import { UploadImg } from "./UploadImg";
import { MyAdds } from "./MyAdds";
import { API_URL } from "../utils/constants";
import DeleteUser from "./elements/DeleteUser";
import dummyUser from "../assets/icons/dummy-user.png";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UserBg from "../assets/images/user-bg.jpg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Typography, Divider } from "@mui/material";
//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

const StyledUserImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${UserBg});
  height: 350px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

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

  const onButtonClick = () => {
    dispatch(user.actions.setAccessToken(null));
  };

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
        <StyledUserImage />
        <Box
          sx={{ display: "flex", justifyContent: "space-between", margin: 2 }}
        ></Box>
        <Box sx={{ display: "flex" }}>
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundPosition: "center",
              // borderStyle: "none",
              border: "solid 5px #faf8f8",
              marginLeft: "10%",
              marginTop: "25px",
              zIndex: 3,
              outline: 0,
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
          <TableContainer component={Paper} sx={{ width: "80%" }}>
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
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </section>
      <MyAdds />
    </>
  );
};
