import React from "react";
import styled from "styled-components";
import UpArrow from "../components/elements/UpArrow";
import { Box, Card, CardContent, Typography } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { StyledHeaderImage } from "../components/elements/HeroImage";
// import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 130px;
  h1 {
    color: #704462;
    font-size: 40px;
  }
`;

const ContactInfo = styled.div`
  width: 70%;
  padding: 30px 0px;
`;

const ContactText = styled.h2`
  font-weight: 600;
  color: #4c4c4c;
`;

const DeveloperInfo = [
  {
    name: "Johanna Mannestål",
    letter: "J",
    image: "https://i.imgur.com/7uHeogl.jpg",
    about: `Curious frontend developer and behavioral scientist who love to combine logic and creativity to build great and user friendly products.`,
    email: "johanna.mannestal@gmail.com",
    github: "https://github.com/JohannaMJ",
    portfolio: "https://johannamj-portfolio.netlify.app/",
  },
  {
    name: "Madeleine Svensson",
    letter: "M",
    image: "https://i.imgur.com/dJrEs0Z.jpg",
    about: `Frontend developer with a bootcamp and a two year UX design diploma in my backpack.`,
    email: "madeleinesvensson13@gmail.com",
    github: "https://github.com/madeleinesvensson",
    portfolio: "https://madeleinesvenssonportfolio.netlify.app",
  },
  {
    name: "Lovisa Carling",
    letter: "L",
    image: "https://i.imgur.com/yNP1NLn.jpg",
    about: `Frontend developer at day, gamer at night. Experience in project management and process improvement. Fueled by being creative (and by loads of coffee).`,
    email: "lovisa.carling@gmail.com",
    github: "https://github.com/Asivol93",
    portfolio: "https://portfolio-carling.netlify.app/",
  },
  {
    name: "Anna Dimitrakopoulos",
    letter: "A",
    image: "https://i.imgur.com/i6W78U4.jpg",
    about: `Former speech and language pathologist turned frontend developer. The thing I love most about coding are the “aha” moments of understanding how things work (or why they don’t!).`,
    email: "dimitrakopoulos.anna@gmail.com",
    github: "https://github.com/anndimi",
    portfolio: "https://portfolio-annadimi.netlify.app/",
  },
];

const ContactPage = () => {
  return (
    <>
      <StyledHeaderImage />
      <ContactContainer>
        <h1>Contact</h1>
        <ContactInfo>
          <ContactText>
            Contact us for more information about Tech Talent Marketplace or if
            you have feedback or ideas on how to improve our platform!
          </ContactText>
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
            <Card
              key={item.letter}
              sx={{ width: 325, height: 425, padding: 2 }}
            >
              <CardContent
                sx={{
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={item.image}
                    style={{
                      width: 85,
                      height: 85,
                      borderRadius: 50,
                      objectFit: "cover",
                    }}
                    alt="profile"
                  />

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
                    marginTop: 3,
                    marginBottom: 3,
                    padding: 0,
                    fontFamily: "secondary.fontFamily",
                  }}
                >
                  {item.about}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <EmailRoundedIcon sx={{ color: "#342C42", fontSize: 25 }} />
                  <Typography
                    sx={{
                      fontFamily: "secondary.fontFamily",
                      fontSize: 15,
                      paddingLeft: 2,
                      wordBreak: "normal",
                    }}
                  >
                    {item.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GitHubIcon sx={{ color: "#342C42", fontSize: 25 }} />
                  <a
                    style={{ margin: 0 }}
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography
                      sx={{
                        fontFamily: "secondary.fontFamily",
                        fontSize: 15,
                        paddingLeft: 2,
                        wordBreak: "break-word",
                        "&:hover": {
                          color: "#F8C53A",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {item.github}
                    </Typography>
                  </a>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ColorLensIcon sx={{ color: "#342C42", fontSize: 25 }} />
                  <a
                    style={{ margin: 0 }}
                    href={item.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography
                      sx={{
                        fontFamily: "secondary.fontFamily",
                        fontSize: 15,
                        paddingLeft: 2,
                        wordBreak: "break-word",
                        "&:hover": {
                          color: "#F8C53A",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {item.portfolio}
                    </Typography>
                  </a>
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
