import React from "react";
import { UpArrow } from "../components/elements/UpArrow";
import styled from "styled-components";
import UserBg from "../assets/images/user-bg.jpg";
import {
  Divider,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  Fab,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const StyledImage = styled.div`
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

const ContactInfo = styled.div`
  width: 70%;
  padding: 50px 0px;
`;

const DeveloperInfo = [
  {
    name: "Johanna Mannestål",
    letter: "J",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud.`,
    email: "johanna@mail.com",
    github: "https://www.w3.org/Provider/Style/dummy.html",
    portfolio: "https://www.w3.org/Provider/Style/dummy.html",
  },
  {
    name: "Madeleine Svensson",
    letter: "M",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip.`,
    email: "madeleine@mail.com",
    github: "https://www.w3.org/Provider/Style/dummy.html",
    portfolio: "https://www.w3.org/Provider/Style/dummy.html",
  },
  {
    name: "Lovisa Carling",
    letter: "L",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud.`,
    email: "lovisa@mail.com",
    github: "https://www.w3.org/Provider/Style/dummy.html",
    portfolio: "https://www.w3.org/Provider/Style/dummy.html",
  },
  {
    name: "Anna Dimitrakopoulos",
    letter: "A",
    about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco.`,
    email: "anna@mail.com",
    github: "https://www.w3.org/Provider/Style/dummy.html",
    portfolio: "https://www.w3.org/Provider/Style/dummy.html",
  },
];

const ContactPage = () => {
  return (
    <>
      <StyledImage />
      <ContactContainer>
        <Typography
          sx={{
            fontFamily: "primary.fontFamily",
            fontWeight: 700,
            fontSize: 40,
          }}
        >
          Contact
        </Typography>
        <ContactInfo>
          <Typography
            sx={{
              fontFamily: "primary.fontFamily",
              fontSize: 17,
            }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </Typography>
        </ContactInfo>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          {DeveloperInfo.map((item) => (
            <Card sx={{ width: 290, height: 400, padding: 2 }}>
              <CardContent
                sx={{
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Fab>
                    <Typography
                      sx={{ fontFamily: "primary.fontFamily", fontWeight: 700 }}
                    >
                      {item.letter}
                    </Typography>
                  </Fab>
                  <Typography
                    sx={{
                      fontFamily: "primary.fontFamily",
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 15,
                    paddingTop: 3,
                    paddingBottom: 3,
                    fontFamily: "secondary.fontFamily",
                    fontSize: 17,
                  }}
                >
                  {item.about}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingBottom: 3,
                  }}
                >
                  <Fab sx={{ height: 50, width: 50 }}>
                    <EmailRoundedIcon sx={{ color: "#342C42" }} />
                  </Fab>
                  <Typography
                    sx={{
                      fontFamily: "secondary.fontFamily",
                      fontSize: 17,
                      paddingLeft: 2,
                    }}
                  >
                    {item.email}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </ContactContainer>
      <UpArrow />
    </>
  );
};

export default ContactPage;
