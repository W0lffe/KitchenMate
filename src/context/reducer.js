
/**
 * 
 * Utility reducer to manage general application state
 * @param {Object} state current state
 * @param {Object} action with type and payload
 * @returns new state
 */
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
                activeModal: action.payload.activeModal,
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

/**
 * 
 * Kitchen reducer to manage general application state
 * @param {Object} state current state
 * @param {Object} action with type and payload
 * @returns new state
 */
export const kitchenReducer = (state, action) => {
    //console.log("DEBUG: ", action.type, action.payload)
    switch(action.type){
        case "SET_ACTIVE_RECIPE":
            return {
                ...state, activeRecipe: action.payload
            }
        case "SET_RECIPES":
            return {
                ...state, availableRecipes: action.payload
            }
        case "ADD_RECIPE":
            return {
                ...state, availableRecipes: [...state.availableRecipes, action.payload]
            }
        case "UPDATE_RECIPE":
                return{
                    ...state, availableRecipes: state.availableRecipes.map((recipe) => 
                        recipe.id === action.payload.id ? action.payload : recipe )
                }
        case "REMOVE_RECIPE": 
                return{
                    ...state, availableRecipes: state.availableRecipes.filter((recipe) => recipe.id !== action.payload.id)
                }
        case "SET_DISHES":
            return{
                ...state, availableDishes: action.payload
            }
        case "SET_ACTIVE_DISH":
            return{
                ...state, activeDish: action.payload
            }
        case "ADD_DISH":
            return {
                ...state, availableDishes: [...state.availableDishes, action.payload]
            }
        case "UPDATE_DISH":
            return{
                ...state, availableDishes: state.availableDishes.map((dish) => 
                    dish.id === action.payload.id ? action.payload : dish )
            }
        case "REMOVE_DISH": 
            return{
                ...state, availableDishes: state.availableDishes.filter((dish) => dish.id !== action.payload.id)
            }
        case "SET_BASKET":
            return{
                ...state, availableBasket: action.payload
            }
        case "ADD_BASKET_ITEM":
            return {
                ...state, availableBasket: [...state.availableBasket, ...action.payload]
            }
        case "UPDATE_BASKET_ITEM":
            if(Array.isArray(action.payload) && action.payload.length > 1){
                return{
                   ...state, availableBasket: action.payload
                }
            }
                return{
                    ...state, availableBasket: state.availableBasket.map((item) => 
                        item.id === action.payload.id ? action.payload : item )
                }
        case "REMOVE_BASKET_ITEM": 
                return{
                    ...state, availableBasket: state.availableBasket.filter((item) => item.id !== action.payload.id)
                }
        case "SET_ENTRY_STATUS":
            return{
                ...state, editStatus: action.payload
            }
        default:
            return state
    }
}
