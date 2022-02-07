import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../lotties/NotFountLottie.json";
import UserBg from "../assets/images/user-bg.jpg";

const StyledUserImage = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${UserBg});
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #212427;
  margin-top: 100px;
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
      <StyledUserImage />
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
