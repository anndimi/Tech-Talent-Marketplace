import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: #f8c53a;
  color: white;
  height: 125px;
`;
export const Footer = () => {
  return (
    <FooterWrapper>
      <h1>this is the footer</h1>
    </FooterWrapper>
  );
};
