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
                user: action.payload
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
        case "SET_INITIALIZED":
            return {
                ...state, isInitialized: action.payload
            }
        default: 
            return state;
    }
}


export const recipesReducer = (state, action) => {
    console.log("RECIPE_DEBUG: ", action.type, action.payload)
    switch(action.type){
        case "SET_ACTIVE_RECIPE":
            return {
                ...state, activeRecipe: action.payload
            }
        case "SET_RECIPES":
            return {
                ...state, availableRecipes: action.payload
            }
        default:
            return state
    }
}

export const basketReducer = (state, action) => {
    console.log("BASKET_DEBUG: ", action.type, action.payload);
    switch(action.type){
        case "SET_BASKET":
            return{
                ...state, availableBasket: action.payload
            }
        case "SET_STATUS":
            return{
                ...state, editStatus: action.payload
            }
    }
}

export const dishReducer = (state, action) => {
    console.log("DISH_DEBUG: ", action.type, action.payload)
    switch(action.type){
        case "SET_DISHES":
            return{
                ...state, availableDishes: action.payload
            }
        case "SET_ACTIVE_DISH":
            return{
                ...state, activeDish: action.payload
            }
    }
}