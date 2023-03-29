import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import { async } from 'regenerator-runtime';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Loading Spinner
// if (module.hot) {
//   module.hot.accept();
// }

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

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) Load Search results
    await model.loadSearchResults(query);

    //3)Render Results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1)Render New results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const init = () => {
  recipeView.addHandlerRender(getRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
