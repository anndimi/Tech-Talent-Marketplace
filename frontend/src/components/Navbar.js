import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Open from "../assets/menu.png";
import Close from "../assets/close.png";
import logoImg from "../assets/logo.png";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #289d8e;
  color: #ffffff;
`;

const Logo = styled.div`
  margin-left: 20px;
`;

const LogoImage = styled.img`
  width: 120px;
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
  &.toggle {
    background-image: url(${Open});
    z-index: 10;
  }
  &.toggle-active {
    background-image: url(${Close});
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
    background-color: #289d8e;
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
  font-size: 20px;
  padding: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const [isActive, setActive] = useState(false);

  const toggleNavbar = () => {
    setActive(!isActive);
  };

  return (
    <>
      <HeaderContainer>
        <Logo>
          <LogoImage src={logoImg} />
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
          <StyledLink to="/adds">Adds</StyledLink>
          <StyledLink to="/userprofile">My Profile</StyledLink>
          <StyledLink to="/about">About</StyledLink>
          <StyledLink to="/contact">Contact</StyledLink>
        </PopUpNav>
      </div>
    </>
  );
};
export default Navbar;
