import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../lotties/NotFountLottie.json";
import { StyledHeaderImage } from "../components/elements/HeroImage";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #212427;
  margin-top: 200px;
  margin-bottom: 100px;
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
      <StyledHeaderImage />
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
