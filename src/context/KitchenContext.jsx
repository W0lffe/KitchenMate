import { createContext,
        useReducer,
         useRef,
         useState} from "react";
import { getRandomSlogan } from "../util/util";
import { utilityReducer } from "./utilityReducer";
import { fetchRecipes } from "../api/http.js"

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
    filterRecipes: () => {},
    sortRecipes: () => {},

})

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
        default:
            return state
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

        if(section === "recipes"){
           setActiveRecipe(null)
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

    const setModalState = (section) => {
        utilDispatch({
            type: "SET_MODAL_STATE",
            payload: {
                section,
                modalState: !utilState.modalIsOpen
            }
        })
    }

    const setAvailableRecipes = async () => {
        setIsFetchingData(true);
        console.log("fetch", isFetchingData)

        const recipes = await fetchRecipes(utilState.user);
        await new Promise(r => setTimeout(r, 1000));
        recipeDispatch({
                type: "SET_RECIPES",
                payload: recipes
        })

        recipeListRef.current = recipes;
        setIsFetchingData(false);
        console.log("fetch", isFetchingData)

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
        isFetchingData: isFetchingData,
        filterRecipes,
        sortRecipes
    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}