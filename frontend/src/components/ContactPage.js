import React from "react";

import styled from "styled-components";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    max-width: 60vw;
    @media (min-width: 768px) {
      width: 400px;
    }
  }
`;

const ContactPage = () => {
  return (
    <ContactContainer>
      <h1>Contact</h1>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
      <h2>Header</h2>
      <h2>Another header</h2>
    </ContactContainer>
  );
};

export default ContactPage;
