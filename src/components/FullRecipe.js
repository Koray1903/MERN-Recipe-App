import React, {useState, useRef} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import styled from 'styled-components';
import {
  deleteRecipe,
  deleteIngredientFromRecipe,
  deleteDirectionFromRecipe,
  addIngredientToRecipe,
  addDirectionToRecipe,
  addNewRecipeVersion
} from "../redux";

const FlexDiv = styled.div`
background-color: #faeee7;
color: #0a97b0;
padding: 5vh 5vw 0 5vw;
`;

const RecipeTitle = styled.p`
font-size: 2.5rem;
font-weight: bold;
text-align: center;
border-bottom: 2px solid #f54291;
padding-bottom: 1rem;
margin:0;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size:2rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const RecipeDate = styled.p`
text-align: right;
margin:0;
font-size: 1rem;
font-weight: 600;
letter-spacing: 0.05rem;
padding-top: 1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size:0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const FlexIngredientsDirections = styled.div`
display: flex;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const Title = styled.p`
font-weight: bold;
font-size: 2rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.5rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.5rem;
}
`;

const IngredientList = styled.ul`
text-align: justify;
width:45%;
font-size: 1.3rem;
line-height: 2.5rem;
border-right: 1px solid #f54291;
padding-right:2rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
border-right: none;
border-bottom: 2px solid #f54291;
padding-bottom:1rem;
width:80vw;
font-size: 0.9rem;
line-height: 2rem;
padding-right:0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.1rem;
}
`;

const DirectionList = styled.ol`
text-align: justify;
border-left: 1px solid #f54291;
width:45%;
font-size: 1.3rem;
line-height: 2.5rem;
padding-left :3rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.9rem;
line-height: 2rem;
border-left:none;
width:80vw;
padding-left:5vw;
margin-top:0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.1rem;
}
`;

const DeleteButton = styled.img`
margin-left: 1rem;
height: 3vh;
cursor: pointer;

@media screen and (min-width: 320px) and (max-width: 767px) {
height: 2.5vh;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
height: 2.5vh;
}
`;

const DirectionInput = styled.textarea`
font-family: 'Montserrat', sans-serif;
padding: 0.5rem;
border:none;
border-radius: 1rem;
width: 80%;
margin-top:1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
min-width: 70vw;
max-width: 70vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 90%;
}
`;

const IngredientInput = styled.textarea`
font-family: 'Montserrat', sans-serif;
padding: 0.5rem;
border:none;
border-radius: 1rem;
width: 70%;
margin-top:1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
min-width: 70vw;
max-width: 70vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 90%;
}
`;

const EditRecipeButton = styled.button`
font-family: 'Montserrat', sans-serif;
padding: 0.5rem;
border:none;
border-radius: 0.5rem;
font-size: 1rem;
font-weight: bold;
color: #faeee7;
background: #4cd3c2;
margin-top:2rem;
margin-bottom:2rem;
cursor: pointer;

@media screen and (min-width: 320px) and (max-width: 767px) {
margin-top:1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const SaveRecipeButton = styled.button`
font-family: 'Montserrat', sans-serif;
padding: 0.5rem;
border:none;
border-radius: 0.5rem;
font-size: 1rem;
font-weight: bold;
color: #faeee7;
background: #4cd3c2;
margin-top:2rem;
margin-bottom:2rem;
cursor: pointer;

@media screen and (min-width: 320px) and (max-width: 767px) {
margin-top:1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const DeleteRecipeButton = styled.button`
font-family: 'Montserrat', sans-serif;
padding: 0.5rem;
border:none;
border-radius: 0.5rem;
font-size: 1rem;
font-weight: bold;
color: #faeee7;
background: #4cd3c2;
margin-left:1rem;
margin-top:2rem;
margin-bottom:2rem;
cursor: pointer;

@media screen and (min-width: 320px) and (max-width: 767px) {
margin-top:1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const PreviousVersionsButton = styled.button`
font-family: 'Montserrat', sans-serif;
padding: 0.5rem;
border:none;
border-radius: 0.5rem;
font-size: 1rem;
font-weight: bold;
color: #faeee7;
background: #4cd3c2;
margin-left:1rem;
margin-top:2rem;
margin-bottom:2rem;
cursor: pointer;

@media screen and (min-width: 320px) and (max-width: 767px) {
margin-top:1rem;
margin-bottom:1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const PreviousVersionsFlex = styled.div`
display:flex;
justify-content: space-between;
margin:0 auto;
max-width:90vw;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}
`;

const FullRecipe = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [deleteMessageStatus, setDeleteMessageStatus] = useState(false);
  const [saveMessageStatus, setSaveMessageStatus] = useState(false);
  const [previousVersionsStatus, setPreviousVersionsStatus] = useState(false);

  const history = useHistory();
  const directionRef = useRef("");
  const ingredientRef = useRef("");

  const handleDelete = (id) => {
    props.deleteRecipe(id);
    setDeleteMessage("Recipe has been successfully deleted.");
    setDeleteMessageStatus(true);
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  const handleSave = () => {
    setEditMode(false);
    props.addNewRecipeVersion(props.fullRecipe.ingredients, props.fullRecipe.directions, props.fullRecipe._id);
    setSaveMessage("Recipe has been successfully saved.");
    setSaveMessageStatus(true);
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  const addIngredient = (event) => {
    if (event.key === 'Enter') {
      props.addIngredientToRecipe(ingredientRef.current.value);
      ingredientRef.current.value = "";
    }
  };

  const addDirection = (event) => {
    if (event.key === 'Enter') {
      props.addDirectionToRecipe(directionRef.current.value);
      directionRef.current.value = "";
    }
  };

  return (
    <FlexDiv>
      <RecipeTitle>{props.fullRecipe.recipeName}</RecipeTitle>

      <RecipeDate>Created on {new Date(props.fullRecipe.time).toLocaleDateString()}</RecipeDate>

      <FlexIngredientsDirections>
        {/* INGREDIENTS */}
        <IngredientList>

          <Title>Ingredients :</Title>

          {props.fullRecipe.ingredients.map((ingredient, index) =>
            (<li key={index}>
              {ingredient}
              <DeleteButton
                src={process.env.PUBLIC_URL + "/images/remove.svg"}
                hidden={!editMode}
                onClick={() => props.deleteIngredientFromRecipe(props.fullRecipe._id, index)}/>
            </li>))}

          <IngredientInput
            placeholder="add an ingredient"
            hidden={!editMode}
            ref={ingredientRef}
            onKeyUp={addIngredient}/>

        </IngredientList>
        {/* INGREDIENTS */}

        {/* DIRECTIONS */}
        <DirectionList>

          <Title>Directions :</Title>

          {props.fullRecipe.directions.map((direction, index) =>
            (<li key={index}>
              {direction}
              <DeleteButton
                src={process.env.PUBLIC_URL + "/images/remove.svg"}
                hidden={!editMode}
                onClick={() => props.deleteDirectionFromRecipe(props.fullRecipe._id, index)}/>
            </li>))}

          <DirectionInput
            placeholder="add a direction"
            hidden={!editMode}
            ref={directionRef}
            onKeyUp={addDirection}/>

        </DirectionList>
        {/* DIRECTIONS */}
      </FlexIngredientsDirections>

      {/* BUTTONS */}
      <EditRecipeButton
        hidden={editMode}
        onClick={() => setEditMode(true)}>
        Edit recipe
      </EditRecipeButton>

      <SaveRecipeButton
        hidden={!editMode}
        onClick={() => handleSave()}>
        Save recipe
      </SaveRecipeButton>

      <DeleteRecipeButton
        onClick={() => handleDelete(props.fullRecipe._id)}>
        Delete recipe
      </DeleteRecipeButton>

      <p style={{display: deleteMessageStatus ? true : "none"}}>{deleteMessage}</p>
      <p style={{display: saveMessageStatus ? true : "none"}}>{saveMessage}</p>

      <PreviousVersionsButton
        onClick={() => setPreviousVersionsStatus(!previousVersionsStatus)}>
        See Previous Versions
      </PreviousVersionsButton>

      <p style={{display: previousVersionsStatus ? true : "none"}}>
        {props.fullRecipe.prevVersions.map((element, index) => (
          <PreviousVersionsFlex style={{display: previousVersionsStatus ? true : "none"}} key={index}>
            <p>Version {index + 1}</p>
            <p>Created on {new Date(element.time).toLocaleDateString()}</p>
            <p>Ingredients :
              {element.ingredients.map((ingredient, index) => <li>{ingredient}</li>)}
            </p>
            <p>Directions :
              {element.directions.map((direction, index) => <li>{direction}</li>)}
            </p>
          </PreviousVersionsFlex>
        ))}
      </p>
      {/* BUTTONS */}

    </FlexDiv>
  );
};

const mapStateToProps = state => {
  return {
    fullRecipe: state.reducerRecipe.fullRecipe,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRecipe: (id) => dispatch(deleteRecipe(id)),
    deleteIngredientFromRecipe: (id, index) => dispatch(deleteIngredientFromRecipe(id, index)),
    deleteDirectionFromRecipe: (id, index) => dispatch(deleteDirectionFromRecipe(id, index)),
    addIngredientToRecipe: (ingredient) => dispatch(addIngredientToRecipe(ingredient)),
    addDirectionToRecipe: (direction) => dispatch(addDirectionToRecipe(direction)),
    addNewRecipeVersion: (ingredients, directions, id) => dispatch(addNewRecipeVersion(ingredients, directions, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullRecipe);