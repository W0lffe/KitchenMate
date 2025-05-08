export const utilityReducer = (state, action) => {
    switch(action.type){
        case "SET_SLOGAN":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return{
                ...state, slogan: action.payload
            }
        case "SET_NAVIGATION_STATE":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, navigationIsOpen: action.payload
            }
        case "SET_ACTIVE_SECTION":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, activeSection: action.payload
            }
        case "SET_USER":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, 
                user: action.payload.username,
                userIsLogged: action.payload.status
            }
        case "SET_MODAL_STATE":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, 
                activeModal: action.payload.section,
                modalIsOpen: action.payload.modalState
            }
        case "SET_MOBILE":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, isMobile: action.payload
            }
        default: 
            return state;
    }
}


export const recipesReducer = (state, action) => {
    let updatedRecipes;
    switch(action.type){
        case "SET_ACTIVE_RECIPE":
            console.log("DEBUG: ", action.type, action.payload)
            return {
                ...state, activeRecipe: action.payload
            }
        case "ADD_RECIPE":
            updatedRecipes = [...state.availableRecipes, action.payload];
            console.log("DEBUG: ", action.type, action.payload, updatedRecipes);
            return {
                ...state, availableRecipes: updatedRecipes
            }
        case "SET_RECIPES":
            console.log("DEBUG: ", action.type, action.payload)
            return {
                ...state, availableRecipes: action.payload
            }
        case "DELETE_RECIPE":
            console.log("DEBUG: ", action.type, action.payload)
            updatedRecipes = state.availableRecipes.filter((recipe) =>  recipe.id !== action.payload )
            return {
                ...state, availableRecipes: updatedRecipes
            }
        case "MODIFY_RECIPE":
            console.log("DEBUG: ", action.type, action.payload)
            updatedRecipes = state.availableRecipes.map(recipe => 
                recipe.id === action.payload.id ? action.payload : recipe
            )
            console.log("updated list",updatedRecipes)
            return {
                ...state, availableRecipes: updatedRecipes
            }
        default:
            return state
    }
}