import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Open from "../../assets/icons/menu.png";
import Close from "../../assets/icons/close.png";
import logoImg from "../../assets/icons/logo.png";
import { useSelector } from "react-redux";
import { SignOutButton } from "./StyledButtons";
import { Typography } from "@mui/material";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  color: #ffffff;
`;

const Logo = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  z-index: 1;
  cursor: pointer;
  div {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
  }
`;

const LogoImage = styled.img`
  width: 100px;
`;

const HamburgerNav = styled.div`
  background-position: center;
  cursor: pointer;
  background-repeat: no-repeat;
  align-self: center;
  background-size: 30px;
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 20px;
  margin-top: 50px;
  &.toggle {
    background-image: url(${Open});
    z-index: 10;
  }
  &.toggle-active {
    background-image: url(${Close});
    position: fixed;
    right: 0;
    z-index: 30;
  }
`;

const PopUpNav = styled.nav`
  &.side-menu-active {
    position: fixed;
    z-index: 20;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    background: black;
    justify-content: center;
    background-color: #342c42;
    @media (min-width: 768px) {
      width: 250px;
    }
  }
  &.side-menu-hidden {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 22px;
  padding: 10px;
  margin: 10px;
  &:hover {
    text-decoration: underline;
    color: #f8c53a;
  }
`;

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const id = useSelector((store) => store.user.userId);
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setActive(!isActive);
  };

  const scrollWin = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <HeaderContainer>
        <Logo
          onClick={() => {
            navigate("/");
            scrollWin();
          }}
        >
          <LogoImage src={logoImg} />
          <div>
            <Typography
              sx={{
                fontFamily: "primary.fontFamily",
                fontSize: 25,
                fontWeight: 700,
                padding: 0,
              }}
            >
              Tech Talent
            </Typography>
            <Typography
              sx={{
                fontFamily: "primary.fontFamily",
                fontSize: 20,
                padding: 0,
              }}
            >
              Marketplace
            </Typography>
          </div>
        </Logo>
        <HamburgerNav
          className={isActive ? "toggle-active" : "toggle"}
          onClick={toggleNavbar}
        ></HamburgerNav>
      </HeaderContainer>
      <div>
        <PopUpNav
          className={isActive ? "side-menu-active" : "side-menu-hidden"}
          onClick={toggleNavbar}
        >
          {accessToken ? (
            <>
              <StyledLink
                to="/"
                onClick={() => {
                  scrollWin();
                }}
              >
                Home
              </StyledLink>
              <StyledLink
                to="/posts"
                onClick={() => {
                  scrollWin();
                }}
              >
                Posts
              </StyledLink>
              <StyledLink
                to={`/userprofile/${id}`}
                onClick={() => {
                  scrollWin();
                }}
              >
                My Profile
              </StyledLink>
              <StyledLink
                to="/inspiration"
                onClick={() => {
                  scrollWin();
                }}
              >
                Inspiration
              </StyledLink>
              <StyledLink
                to="/about"
                onClick={() => {
                  scrollWin();
                }}
              >
                About
              </StyledLink>
              <StyledLink
                to="/contact"
                onClick={() => {
                  scrollWin();
                }}
              >
                Contact
              </StyledLink>
              <SignOutButton />
            </>
          ) : (
            <>
              <StyledLink
                to="/"
                onClick={() => {
                  scrollWin();
                }}
              >
                Home
              </StyledLink>
              <StyledLink
                to="/signup"
                onClick={() => {
                  scrollWin();
                }}
              >
                Sign up/ Sign in
              </StyledLink>
              <StyledLink
                to="/posts"
                onClick={() => {
                  scrollWin();
                }}
              >
                Posts
              </StyledLink>
              <StyledLink
                to={`/userprofile/${id}`}
                onClick={() => {
                  scrollWin();
                }}
              >
                My Profile
              </StyledLink>
              <StyledLink
                to="/inspiration"
                onClick={() => {
                  scrollWin();
                }}
              >
                Inspiration
              </StyledLink>
              <StyledLink
                to="/about"
                onClick={() => {
                  scrollWin();
                }}
              >
                About
              </StyledLink>
              <StyledLink
                to="/contact"
                onClick={() => {
                  scrollWin();
                }}
              >
                Contact
              </StyledLink>
            </>
          )}
        </PopUpNav>
      </div>
    </>
  );
};
export default Navbar;
