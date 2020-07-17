import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const FlexDiv = styled.div`
height: max-content;
display: flex;
justify-content: space-between;
align-items: center;
padding: 3vh 5vw;
background-color: #f54291;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const FlexLogoTitle = styled.div`
height: max-content;
display: flex;
justify-content: flex-start;
align-items: center;

@media screen and (min-width: 320px) and (max-width: 767px) {
padding-bottom:1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const Logo = styled.img`
height: 10vh;

animation: slide-in-left 1s ease-in-out both;

@keyframes slide-in-left {
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
height: 7vh;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
height: 8vh;
}
`;

const Title = styled.p`
font-size: 3.5rem;
font-weight: bold;
color: #faeee7;
letter-spacing: 0.1rem;
margin:0 1rem;

animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
@keyframes text-focus-in {
  0% {
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.9rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 2.5rem;
}
`;

const NewRecipe = styled.button`
font-size: 1.5rem;
font-weight: 600;
color: #faeee7;
background: #4cd3c2;
border: none;
border-radius: 1rem;
padding: 0.5rem;
cursor: pointer;

animation: slide-in-right 1s ease-in-out both;

@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.3rem;
}
`;

const NavBar = () => {

  return (
    <FlexDiv>

      <FlexLogoTitle>
        <Link to={`/`}>
          <Logo src={process.env.PUBLIC_URL + "/images/logo.svg"}/>
        </Link>
        <Title>My Cook Book</Title>
      </FlexLogoTitle>

      <Link to={`/new`}>
        <NewRecipe>Create a new recipe +</NewRecipe>
      </Link>
    </FlexDiv>
  );
};

export default NavBar;