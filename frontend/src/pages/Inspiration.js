import React from "react";
import UserBg from "../assets/images/user-bg.jpg";
import styled from "styled-components";
import { UpArrow } from "../components/elements/UpArrow";
import ArticleImg1 from "../assets/images/team-image.jpg";
import ArticleImg2 from "../assets/images/img1.jpg";
import ArticleImg3 from "../assets/images/img2.jpg";
import ArticleImg4 from "../assets/images/img3.jpg";

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

const InspirationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  p {
    max-width: 60vw;
    @media (min-width: 768px) {
      width: 400px;
    }
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
    word-break: break-all;
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
  @media (min-width: 768px) {
    height: 400px;
  }
`;
const Title = styled.h3`
  font-weight: 500;
  font-size: 20px;
  word-break: break-all;
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
  @media (max-width: 768px) {
    display: none;
  }
`;
const LinkHeading = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 3px solid black;
  text-align: center;
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
    text-align: center;
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
    color: purple;
    font-size: 40px;
    margin: 20px 5px;
    letter-spacing: 0.5px;
  }
`;

const LinkContent = styled.div`
  display: flex;
  flex-direction: column;
  word-break: break-all;
  justify-content: center;
  border-top: 2px solid black;
  padding: 20px 0px;

  h3 {
    font-weight: 600;
    font-size: 20px;
    margin: 0;
  }
  p {
    font-weight: 400;
    font-size: 15px;
    margin: 0;
    padding: 5px;
  }
`;

const Inspiration = () => {
  return (
    <>
      <StyledImage />
      <InspirationContainer>
        <h1>Inspiration baby!</h1>
        <p>
          Cupcake ipsum dolor sit amet pastry. Candy ice cream macaroon marzipan
          jelly-o powder topping pudding. Marshmallow ice cream tiramisu apple
          pie cake gummi bears ice cream. Liquorice icing sweet roll caramels
          liquorice jelly muffin. Bonbon candy marshmallow danish liquorice
          danish. Apple pie cookie marzipan biscuit chupa chups cake muffin.
          Croissant chocolate gummies pie dragée chocolate cake biscuit apple
          pie. Bear claw oat cake sweet roll brownie cake cotton candy. Powder
          icing powder bonbon lemon drops icing cupcake pie. Tart marzipan
          cotton candy dessert chupa chups topping cookie pastry icing. Tootsie
          roll chocolate cake caramels brownie oat cake. Shortbread oat cake
          tootsie roll cake apple pie. Brownie cotton candy jujubes cookie
          sesame snaps sesame snaps chocolate sweet chocolate. Cake cake wafer
          fruitcake dessert shortbread pastry pie. Wafer soufflé marshmallow
          halvah biscuit dessert candy canes. Muffin marshmallow brownie oat
          cake oat cake. Chocolate apple pie caramels chupa chups bear claw
          fruitcake powder cotton candy. Powder pudding cheesecake sesame snaps
          cotton candy tiramisu lollipop bear claw. Caramels fruitcake cake tart
          croissant topping. Cupcake danish cupcake sugar plum cookie marzipan
          cupcake chocolate cake powder. Gummi bears jujubes topping candy canes
          marzipan. Sesame snaps topping sweet jelly bonbon. Pie soufflé pudding
          caramels sesame snaps.
        </p>
        <ArticleContainer>
          <Article>
            <Image src={ArticleImg1} />
            <Title>This is a very nice heading about an article</Title>
            <p>
              This is a very long description about this article that we have
              written. The article is very relevant to the page and have to be
              here to fill it out.
            </p>
          </Article>
          <Article>
            <Image src={ArticleImg2} />
            <Title>This is a very nice heading about an article</Title>
            <p>
              This is a very long description about this article that we have
              written. The article is very relevant to the page and have to be
              here to fill it out.
            </p>
          </Article>
          <Article>
            <Image src={ArticleImg3} />
            <Title>This is a very nice heading about an article</Title>
            <p>
              This is a very long description about this article that we have
              written. The article is very relevant to the page and have to be
              here to fill it out.
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
                  {" "}
                  This is a long description of what this article is about and
                  to get people to click it
                </p>
                <p>By Lilla My</p>
              </LinkContent>
            </LinkedCard>
            <LinkedCard>
              <Number>
                <h3>02</h3>
              </Number>
              <LinkContent>
                <h3>Hack your project</h3>
                <p>
                  {" "}
                  This is a long description of what this article is about and
                  to get people to click it
                </p>
                <p>By Mumin</p>
              </LinkContent>
            </LinkedCard>
            <LinkedCard>
              <Number>
                <h3>03</h3>
              </Number>
              <LinkContent>
                <h3>Figma for beginners</h3>
                <p>
                  {" "}
                  This is a long description of what this article is about and
                  to get people to click it
                </p>
                <p>By random</p>
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
