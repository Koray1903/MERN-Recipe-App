import React, {useEffect, useRef} from 'react';
import {connect} from "react-redux";
import styled from 'styled-components';
import {createNewRecipe, resetNewRecipe, addNewIngredient, addNewDirection, addNewName} from "../redux";


const MainFlex = styled.div`
display: flex;
justify-content: space-between;
padding: 5vh 5vw 5vh 5vw;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column-reverse;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const RecipePreviewFlex = styled.div`
display: flex;
flex-direction: column;
width:50vw;
color: #0a97b0;

@media screen and (min-width: 320px) and (max-width: 767px) {
width: 80vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width:40vw;
}
`;

const Title = styled.p`
font-weight: bold;
font-size: 1.5rem;
text-align: left;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.2rem;
}
`;

const RecipeTitle = styled.div`
font-size: 1.5rem;
font-weight: bold;
text-align: center;
border-bottom: 2px solid #f54291;
padding-bottom: 1rem;
margin:0;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.2rem;
}
`;

const RecipeIngredients = styled.ul`
text-align: justify;
font-size: 1rem;
line-height: 1.5rem;
padding-bottom: 1rem;
border-bottom: 2px solid #f54291;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.9rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}
`;

const RecipeDirections = styled.ol`
text-align: justify;
font-size: 1rem;
line-height: 1.5rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.9rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}
`;

const FlexForm = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;

@media screen and (min-width: 320px) and (max-width: 767px) {
justify-content: center;
align-items: center;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const RecipeName = styled.input`
font-family: "Montserrat", sans-serif;
border: none;
padding: 0.5rem;
width:30vw;
font-size: 1.5rem;
margin: 1rem;
border-radius: 0.5rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
width:80vw;
font-size: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width:40vw;
font-size: 1.2rem;
}
`;

const RecipeIngredient = styled.textarea`
font-family: "Montserrat", sans-serif;
border: none;
padding: 0.5rem;
min-width:30vw;
max-width:30vw;
font-size: 1.5rem;
margin: 1rem;
border-radius: 0.5rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
min-width:80vw;
max-width:80vw;
font-size: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
min-width:40vw;
max-width:40vw;
font-size: 1.2rem;
}
`;

const RecipeDirection = styled.textarea`
font-family: "Montserrat", sans-serif;
border: none;
padding: 0.5rem;
min-width:30vw;
max-width:30vw;
font-size: 1.5rem;
margin: 1rem;
border-radius: 0.5rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
min-width:80vw;
max-width:80vw;
font-size: 1.2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
min-width:40vw;
max-width:40vw;
font-size: 1.2rem;
}
`;

const PostButton = styled.button`
font-family: "Montserrat", sans-serif;
border: none;
padding: 0.5rem;
width:30vw;
font-size: 1.5rem;
font-weight: bold;
color: #faeee7;
background: #4cd3c2;
margin: 1rem;
border-radius: 0.5rem;
cursor: pointer;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.2rem;
width:20vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.2rem;
width:20vw;
}
`;

const NewRecipe = (props) => {

  const nameRef = useRef("");
  const directionRef = useRef("");
  const ingredientRef = useRef("");

  useEffect(() => {
    return () => {
      props.resetNewRecipe();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const addRecipeName = (event) => {
    if (event.key === 'Enter') {
      props.addNewName(nameRef.current.value);
      nameRef.current.value = "";
    }
  };

  const addIngredient = (event) => {
    if (event.key === 'Enter') {
      props.addNewIngredient(ingredientRef.current.value);
      ingredientRef.current.value = "";
    }
  };

  const addDirection = (event) => {
    if (event.key === 'Enter') {
      props.addNewDirection(directionRef.current.value);
      directionRef.current.value = "";
    }
  };


  return (
    <MainFlex>

      <RecipePreviewFlex>

        <Title>Name :</Title>

        <RecipeTitle>{props.newRecipe.recipeName}</RecipeTitle>

        <Title>Ingredients :</Title>
        <RecipeIngredients>
          {props.newRecipe.ingredients ? props.newRecipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          )) : null}</RecipeIngredients>

        <Title>Directions :</Title>
        <RecipeDirections>
          {props.newRecipe.directions ? props.newRecipe.directions.map((direction, index) => (
            <li key={index}>{direction}</li>
          )) : null}</RecipeDirections>

      </RecipePreviewFlex>


      <FlexForm onSubmit={handleSubmit}>

        <RecipeName placeholder="Enter a recipe name"
                    ref={nameRef}
                    onKeyUp={addRecipeName}/>

        <RecipeIngredient placeholder="Enter an ingredient"
                          ref={ingredientRef}
                          onKeyUp={addIngredient}/>

        <RecipeDirection placeholder="Enter a direction"
                         ref={directionRef}
                         onKeyUp={addDirection}/>

        <PostButton
          onClick={() => props.createNewRecipe(props.newRecipe.recipeName, props.newRecipe.ingredients, props.newRecipe.directions)}>
          Post
        </PostButton>

      </FlexForm>

    </MainFlex>
  );
};

const mapStateToProps = state => {
  return {
    newRecipe: state.reducerRecipe.newRecipe,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewName: (name) => dispatch(addNewName(name)),
    addNewIngredient: (ingredient) => dispatch(addNewIngredient(ingredient)),
    addNewDirection: (direction) => dispatch(addNewDirection(direction)),
    createNewRecipe: (recipeName, ingredients, directions) => dispatch(createNewRecipe(recipeName, ingredients, directions)),
    resetNewRecipe: () => dispatch(resetNewRecipe())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecipe);