import * as model from './model';
import recipeView from './views/recipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Loading Spinner

//Getting Data from API
const getRecipe = async function () {
  //1) Loading the Recipe

  try {
    //Getting id for hash change
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //Loading Recipe
    await model.loadRecipe(id);

    //Rendering recipe on UI
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
// getRecipe();

//Render Changing hash onclicking the recipe
// window.addEventListener('hashchange', getRecipe);
// window.addEventListener('load', getRecipe);

//Modified version of 2 events for hashchange and load below:
// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, getRecipe));
const init = () => {
  recipeView.addHandlerRender(getRecipe);
};
init();
