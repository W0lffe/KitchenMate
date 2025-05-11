import { createContext,
        useReducer,
         useRef,
         useState} from "react";
import { getRandomSlogan } from "../util/util";
import { utilityReducer, 
        recipesReducer } from "./reducer.js";
import { fetchBasket, fetchDishes, fetchRecipes } from "../api/http.js"

export const KitchenContext = createContext({
    slogan: "",
    setSlogan: () => {},
    navigationIsOpen: false,
    toggleNavigation: () => {},
    activeSection: "",
    setActiveSection: () => {},
    userIsLogged: false,
    setUser: () => {},
    user: "",
    setModalState: () => {},
    modalIsOpen: false,
    isMobile: false,
    setIsMobile: () => {},
    activeModal: "",
    addNewRecipe: () => {},
    availableRecipes: [],
    setAvailableRecipes: () => {},
    activeRecipe: null,
    setActiveRecipe: () => {},
    deleteRecipe: () => {},
    isFetchingData: false,
    updateRecipe: () => {},
    filterRecipes: () => {},
    sortRecipes: () => {},
    setAvailableDishes: () => {},
    availableDishes: [],
    setActiveDish: () => {},
    activeDish: null,
    deleteDish: () => {},
    setAvailableBasket: () => {},
    availableBasket: [],
    setFavorite: () => {},
})

export const dishReducer = (state, action) => {
    console.log("DISH_DEBUG: ", action.type, action.payload)
    let updatedDishes;
    switch(action.type){
        case "SET_DISHES":
            return{
                ...state, availableDishes: action.payload
            }
        case "SET_ACTIVE_DISH":
            return{
                ...state, activeDish: action.payload
            }
        case "DELETE_DISH":
            updatedDishes = [...state.availableDishes.filter((dish) => dish.id !== action.payload)]
            return{
                ...state, availableDishes: updatedDishes
            }
        case "MODIFY_DISH":
            updatedDishes = state.availableDishes.map(dish => 
                dish.id === action.payload.id ? action.payload : dish
            )
            return{
                ...state, availableDishes: updatedDishes
            }
    }
}

export const basketReducer = (state, action) => {
    console.log("BASKET_DEBUG: ", action.type, action.payload)
    let updatedBasket;
    switch(action.type){
        case "SET_BASKET":
            return{
                ...state, availableBasket: action.payload
            }
    }
}


export default function KitchenContextProvider({children}){

    const [isFetchingData, setIsFetchingData] = useState(false);
    const recipeListRef = useRef()

    const [utilState, utilDispatch] = useReducer(utilityReducer, {
        slogan: "",
        navigationIsOpen: true,
        activeSection: "",
        user: "",
        userIsLogged: false,
        activeModal: "",
        modalIsOpen: false,
        isMobile: false,
    })


    const [recipesState, recipeDispatch] = useReducer(recipesReducer, {
        availableRecipes: [],
        activeRecipe: null
    })

    const [dishesState, dishDispatch] = useReducer(dishReducer, {
        availableDishes: [],
        activeDish: null
    })

    const [basketState, basketDispatch] = useReducer(basketReducer, {
        availableBasket: []
    
    })



    /******************START OF UTILITY REDUCER RELATED FUNCTIONS******************************************* */
    const setIsMobile = (isMobile) => {
        utilDispatch({
            type: "SET_MOBILE",
            payload: isMobile
        })
    }
    const setSlogan = () => {
        utilDispatch({
            type: "SET_SLOGAN",
            payload: getRandomSlogan()
        })
    }

    const toggleNavigation = () => {
        utilDispatch({
            type: "SET_NAVIGATION_STATE",
            payload: !utilState.navigationIsOpen
        })
    }

    const setActiveSection = (section) => {
        if(section === utilState.activeSection){
            section = undefined;
        }

        if(section !== null){
           setActiveRecipe(null)
           setActiveDish(null)
        }

        utilDispatch({
            type: "SET_ACTIVE_SECTION",
            payload: section
        })
    }

    const setUser = (user) => {
        utilDispatch({
            type: "SET_USER",
            payload: user
        })
    }

    const setModalState = (section, modalState) => {
        utilDispatch({
            type: "SET_MODAL_STATE",
            payload: {
                section,
                modalState
            }
        })
    }


 /******************START OF RECIPES REDUCER RELATED FUNCTIONS******************************************* */
    const setAvailableRecipes = async () => {
        setIsFetchingData(true);

        const recipes = await fetchRecipes(utilState.user);
        await new Promise(r => setTimeout(r, 1000));
        recipeDispatch({
                type: "SET_RECIPES",
                payload: recipes
        })

        recipeListRef.current = recipes;
        setIsFetchingData(false);

    }

    const addNewRecipe = async (newRecipe) => {
        await new Promise(r => setTimeout(r, 1000));
        recipeDispatch({
            type: "ADD_RECIPE",
            payload: newRecipe
        })

        setActiveRecipe(null);
    }

    const deleteRecipe = async (id) => {
        await new Promise(r => setTimeout(r, 1000));
        recipeDispatch({
            type: "DELETE_RECIPE",
            payload: id
        })

        setActiveRecipe(null);
    }
    
    const setActiveRecipe = (recipe) => {
        recipeDispatch({
            type: "SET_ACTIVE_RECIPE",
            payload: recipe
        })
    }

    const updateRecipe = (updatedRecipe) => {
        recipeDispatch({
            type: "MODIFY_RECIPE",
            payload: updatedRecipe
        })

        setActiveRecipe(null);
    }


    /******************START OF DISH REDUCER RELATED FUNCTIONS******************************************* */

    const setAvailableDishes = async () => {
        setIsFetchingData(true);

        const dishes = await fetchDishes(utilState.user);
        await new Promise(r => setTimeout(r, 1000));
        dishDispatch({
                type: "SET_DISHES",
                payload: dishes
        })

        setIsFetchingData(false);
    }

    const setActiveDish = (dish) => {
        dishDispatch({
            type: "SET_ACTIVE_DISH",
            payload: dish
        })
    }

    const deleteDish = async (id) => {
        await new Promise(r => setTimeout(r, 1000));
        dishDispatch({
            type: "DELETE_DISH",
            payload: id
        })

        setActiveDish(null);
    }

    /******************START OF BASKET REDUCER RELATED FUNCTIONS******************************************* */

    const setAvailableBasket = async() => {
        setIsFetchingData(true);

        const basket = await fetchBasket(utilState.user);
        await new Promise(r => setTimeout(r, 1000));
        basketDispatch({
                type: "SET_BASKET",
                payload: basket
        })

        setIsFetchingData(false);
    }

    const filterRecipes = (value) => {
        let filtered;
        if(value.length > 0){
            filtered = recipesState.availableRecipes.filter((recipe) => recipe.name.toLowerCase().includes(value.toLowerCase()))
        }
        else{
            filtered = recipeListRef.current;
        }

        recipeDispatch({
            type: "SET_RECIPES",
            payload: filtered
        })
        
    }

    const setFavorite = (item, isRecipe) => {

        item.favorite = !item.favorite;
        
        if(isRecipe){
            recipeDispatch({
                type: "MODIFY_RECIPE",
                payload: item
            })
        }
        else{
            dishDispatch({
                type: "MODIFY_DISH",
                payload: item
            })
    
        }
    }

    const sortRecipes = (sortBy) => {
        const sorted = [...recipesState.availableRecipes].sort((a, b) => {
            let valA;
            let valB;

            switch(sortBy){
                case "time":
                    valA = a.prepTime.time
                    valB = b.prepTime.time
                    return valA - valB;
                case "name":
                    valA = a.name
                    valB = b.name
                    return valA.localeCompare(valB)
                case "fav":
                    valA = a.favorite
                    valB = b.favorite
                    return valB - valA;
                case "date":
                    valA = a.date
                    valB = b.date
                    return valB.localeCompare(valA)
            }
        })

        recipeDispatch({
            type: "SET_RECIPES",
            payload: sorted
        })
    }

    const ctxValue = {
        slogan: utilState.slogan,
        setSlogan,
        navigationIsOpen: utilState.navigationIsOpen,
        toggleNavigation,
        activeSection: utilState.activeSection,
        setActiveSection,
        userIsLogged: utilState.userIsLogged,
        setUser, 
        user: utilState.user,
        setModalState,
        modalIsOpen: utilState.modalIsOpen,
        activeModal: utilState.activeModal,
        isMobile: utilState.isMobile,
        setIsMobile,
        addNewRecipe,
        availableRecipes: recipesState.availableRecipes,
        setAvailableRecipes,
        activeRecipe: recipesState.activeRecipe,
        setActiveRecipe,
        deleteRecipe,
        updateRecipe,
        isFetchingData: isFetchingData,
        filterRecipes,
        sortRecipes,
        setAvailableDishes,
        availableDishes: dishesState.availableDishes,
        setActiveDish,
        activeDish: dishesState.activeDish,
        deleteDish,
        setAvailableBasket,
        availableBasket: basketState.availableBasket,
        setFavorite,

    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}