import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import React from "react";

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  const fetchDetails = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=9f662d0ed9744745a7d6c5855442f513`
    );
    const recipeData = await data.json();
    console.log(recipeData);
    setRecipe(recipeData);
  };

  useEffect(() => {
    fetchDetails(params.id);
    console.log(params.id);
  }, [params.id]);

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt="" />
      </div>
      <Info>
        <ButtonsContainer>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </ButtonsContainer>
        {activeTab === "instructions" && (
          <div>
            <h3
              dangerouslySetInnerHTML={{
                __html: recipe.summary,
              }}
            ></h3>
            <h3
              dangerouslySetInnerHTML={{
                __html: recipe.instructions,
              }}
            ></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    width: 40vh;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const Button = styled.div`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  cursor: pointer;
  margin-right: 1rem;
`;

const Info = styled.div`
  margin-left: 6rem;
`;

export default Recipe;
