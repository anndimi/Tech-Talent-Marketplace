import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../lotties/NotFountLottie.json";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 40%;
  left: 25%;
  right: 25%;
  color: #212427;
`;

const ErrorCode = styled.h1`
  margin: 0;
`;

const LottieContainer = styled.div`
  margin-top: -100px;
  width: 400px;
`;

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <PageContainer>
        <ErrorCode>404</ErrorCode>
        <h2>Page not found</h2>
        <LottieContainer>
          <Lottie options={defaultOptions} />
        </LottieContainer>
      </PageContainer>
    </>
  );
};

export default NotFound;
