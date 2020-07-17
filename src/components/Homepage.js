import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {fetchAllRecipes, getFullRecipe} from "../redux";

const FlexDiv = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-around;
align-items: center;
margin: 0 auto;
background-color: #faeee7;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const RecipeDiv = styled.div`
margin: 5vh 2vw;
height: min-content;
color: #0a97b0;

animation: bounce-in-left 1.5s ease-in-out both;

@keyframes bounce-in-left {
  0% {
    transform: translateX(-600px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateX(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateX(-68px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateX(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateX(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateX(0);
    animation-timing-function: ease-out;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}
`;

const DummyRecipeImg = styled.img`
width: 25vw;
height: auto;
border-radius: 1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
width: 60vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 35vw;
}
`;

const RecipeDate = styled.span`
width: max-content;
font-size:0.9rem;
height: auto;
float: left;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size:0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const FullRecipeButton = styled.button`
width: max-content;
height: auto;
float: right;
font-size:0.9rem;
border-radius: 0.5rem;
padding:0.5rem;
color: #0a97b0;
background: transparent;
border:none;
:hover{
cursor: pointer;
color: #f54291
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size:0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const HomePage = (props) => {

  useEffect(() => {
    props.fetchAllRecipes();
  }, []);

  return (
    <FlexDiv>
      {props.allRecipes.map((recipe) =>
        (
          <RecipeDiv key={recipe._id}>
            <DummyRecipeImg src="./images/dummyRecipe.jpg" alt="RecipeImage"/>
            <h1>{recipe.recipeName}</h1>

            <FlexDiv>
              <RecipeDate>Created on {new Date(recipe.time).toLocaleDateString()}</RecipeDate>
              <Link to={`/recipe/${recipe._id}`}>
                <FullRecipeButton onClick={() => props.getFullRecipe(recipe._id)}>See full recipe...</FullRecipeButton>
              </Link>
            </FlexDiv>

          </RecipeDiv>
        )
      )}

    </FlexDiv>
  );
};

const mapStateToProps = state => {
  return {
    allRecipes: state.reducerRecipe.allRecipes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllRecipes: () => dispatch(fetchAllRecipes()),
    getFullRecipe: (id) => dispatch(getFullRecipe(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);