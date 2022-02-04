import React from "react";
import UserBg from "../assets/images/user-bg.jpg";
import styled from "styled-components";

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
      </InspirationContainer>
    </>
  );
};

export default Inspiration;
