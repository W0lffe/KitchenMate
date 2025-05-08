export const utilityReducer = (state, action) => {
    console.log("UTILITY_DEBUG:", action.type, action.payload)
    switch(action.type){
        case "SET_SLOGAN":
            return{
                ...state, slogan: action.payload
            }
        case "SET_NAVIGATION_STATE":
            return {
                ...state, navigationIsOpen: action.payload
            }
        case "SET_ACTIVE_SECTION":
            return {
                ...state, activeSection: action.payload
            }
        case "SET_USER":
            return {
                ...state, 
                user: action.payload.username,
                userIsLogged: action.payload.status
            }
        case "SET_MODAL_STATE":
            return {
                ...state, 
                activeModal: action.payload.section,
                modalIsOpen: action.payload.modalState
            }
        case "SET_MOBILE":
            return {
                ...state, isMobile: action.payload
            }
        default: 
            return state;
    }
}


export const recipesReducer = (state, action) => {
    let updatedRecipes;
    console.log("RECIPE_DEBUG: ", action.type, action.payload)
    switch(action.type){
        case "SET_ACTIVE_RECIPE":
            return {
                ...state, activeRecipe: action.payload
            }
        case "ADD_RECIPE":
            updatedRecipes = [...state.availableRecipes, action.payload];
            console.log("RECIPE_DEBUG-UPDATED: ", updatedRecipes);
            return {
                ...state, availableRecipes: updatedRecipes
            }
        case "SET_RECIPES":
            return {
                ...state, availableRecipes: action.payload
            }
        case "DELETE_RECIPE":
            updatedRecipes = state.availableRecipes.filter((recipe) =>  recipe.id !== action.payload )
            return {
                ...state, availableRecipes: updatedRecipes
            }
        case "MODIFY_RECIPE":
            updatedRecipes = state.availableRecipes.map(recipe => 
                recipe.id === action.payload.id ? action.payload : recipe
            )
            console.log("RECIPE_DEBUG-UPDATED: ", updatedRecipes);
            return {
                ...state, availableRecipes: updatedRecipes
            }
        default:
            return state
    }
}