import React from "react";
import styled, { keyframes } from "styled-components";
import UpArrow from "../components/elements/UpArrow";
import ArticleImg1 from "../assets/images/team-image.jpg";
import ArticleImg2 from "../assets/images/img1.jpg";
import ArticleImg3 from "../assets/images/img2.jpg";
import ArticleImg4 from "../assets/images/img3.jpg";
import { StyledHeaderImage } from "../components/elements/HeroImage";

const ImageAnimation = keyframes`
 0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  
  50% {
    -webkit-transform: translateY(-3%);
    transform: translateY(-3%);
  }
    
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    }
`;

const InspirationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 110px;
  h1 {
    color: #704462;
    font-size: 40px;
  }
  p {
    max-width: 60vw;
  }
  @media (min-width: 768px) {
    width: 100%;
  }
`;
export const Quote = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-weight: 900;
    color: #f8c53a;
    font-size: 28px;
    font-style: none;
  }
  .quote {
    font-size: 26px;
    font-weight: 500;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 100%;
    line-height: 30px;
  }
  .quote-guy {
    font-style: italic;
  }
`;
const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: baseline;
  }
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  width: 90%;
  height: 100%;

  p {
    font-weight: 300;
    font-size: 15px;
    word-break: normal;
    padding: 0px;
    margin: 0px;
    width: 100%;
    max-width: 95%;
  }
  @media (min-width: 768px) {
    width: 30%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
  transform: ease-in-out;
  &:hover {
    animation-name: ${ImageAnimation};
    animation-duration: 1s;
    transform: ease-in-out;
  }
  @media (min-width: 768px) {
    height: 400px;
  }
`;
const Title = styled.h3`
  font-weight: 500;
  font-size: 20px;
  word-break: normal;
  margin: 10px 0px;
  width: 95%;
`;
const LinkedArticles = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin-top: 30px;
  max-width: 1000px;
`;
const TopStory = styled.img`
  width: 50%;
  height: 500px;
  object-fit: cover;
  margin: 0px 20px;
  border-radius: 3px;
  @media (max-width: 992px) {
    display: none;
  }
`;
const LinkHeading = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 3px solid black;
  width: 100%;

  h2 {
    font-weight: 600;
    font-size: 25px;
    margin: 10px 0px 0px 0px;
    text-align: center;
  }
  p {
    font-weight: 400;
    font-size: 20px;
    margin: 0;
    margin-bottom: 10px;
    align-self: center;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const LinkedCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const Number = styled.div`
  width: 70px;
  margin: 0 5px;
  display: flex;
  justify-content: flex-end;
  h3 {
    font-weight: 200;
    color: #704462;
    font-size: 40px;
    margin: 20px 5px;
    letter-spacing: 0.5px;
  }
`;

const LinkContent = styled.div`
  display: flex;
  flex-direction: column;
  word-break: normal;
  justify-content: center;
  border-top: 2px solid black;
  padding: 20px 0px;

  h3 {
    font-weight: 600;
    font-size: 20px;
    margin: 0;
    padding: 0px 5px;
  }
  p {
    font-weight: 400;
    font-size: 15px;
    margin: 0;
    padding: 5px;
  }
  .author {
    font-weight: 300;
    font-size: 13px;
    margin: 0;
    padding: 0px 5px;
  }
`;

const Inspiration = () => {
  return (
    <>
      <StyledHeaderImage />
      <InspirationContainer>
        <h1>Inspiration</h1>
        <Quote>
          <p className="quote">
            <span>"</span>Technology is best when it brings people together
            <span>"</span>
          </p>
          <p className="quote-guy">
            -Matt Mullenweg, Social Media Entrepreneur
          </p>
        </Quote>
        <ArticleContainer>
          <Article>
            <Image src={ArticleImg1} />
            <Title>How to succeed when working as a team.</Title>
            <p>
              Working with a new team can be hard. This guide will lead you to
              make the dream work with your teamwork.
            </p>
          </Article>
          <Article>
            <Image src={ArticleImg2} />
            <Title>How I became a frontend developer.</Title>
            <p>
              I needed a change of careers and in two years I managed to go from
              knowing nothing about code to feeling like I can do it all.
            </p>
          </Article>
          <Article>
            <Image src={ArticleImg3} />
            <Title>Are you a game developer?</Title>
            <p>
              There are two new programming languages taking over in the gaming
              world. Learn these and you will be able to move to any company
            </p>
          </Article>
        </ArticleContainer>
        <LinkedArticles>
          <TopStory src={ArticleImg4}></TopStory>
          <Wrapper>
            <LinkHeading>
              <h2>Top Stories</h2>
              <p>Your guide to hack the tech industry</p>
            </LinkHeading>
            <LinkedCard>
              <Number>
                <h3>01</h3>
              </Number>
              <LinkContent>
                <h3>Top 10 npm packages</h3>
                <p>
                  Hack your React application using these 10 npm packages to
                  save time and code in your components all by writing npm
                  install ...
                </p>
                <p className="author">By Lilla My</p>
              </LinkContent>
            </LinkedCard>
            <LinkedCard>
              <Number>
                <h3>02</h3>
              </Number>
              <LinkContent>
                <h3>Design systems</h3>
                <p>
                  By building a design system my company got better at
                  communicating about code and design.{" "}
                </p>
                <p className="author">By Greven</p>
              </LinkContent>
            </LinkedCard>
            <LinkedCard>
              <Number>
                <h3>03</h3>
              </Number>
              <LinkContent>
                <h3>Google Analytics</h3>
                <p>
                  Using Google Analytics saved our company. Learn all of the
                  advantages Analytics have to offer.
                </p>
                <p className="author">By Cocolady</p>
              </LinkContent>
            </LinkedCard>
          </Wrapper>
        </LinkedArticles>
      </InspirationContainer>
      <UpArrow />
    </>
  );
};

export default Inspiration;
