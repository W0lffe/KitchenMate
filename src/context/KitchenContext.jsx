import { createContext,
        useReducer,
         useRef,
         useState} from "react";
import { getRandomSlogan } from "../util/util";
import { utilityReducer, 
        recipesReducer,
        basketReducer } from "./reducer.js";
import { fetchBasket, fetchDishes, fetchRecipes, postRecipes, postBasket, postDishes } from "../api/http.js"
import { filter, sort } from "../util/filterSort.js";

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
    filterList: () => {},
    sortList: () => {},
    setAvailableDishes: () => {},
    availableDishes: [],
    setActiveDish: () => {},
    activeDish: null,
    deleteDish: () => {},
    addNewDish: () => {},
    updateDish: () => {},
    setAvailableBasket: () => {},
    availableBasket: [],
    addNewProduct: () => {},
    updateProducts: () => {},
    deleteProduct: () =>{},
    setProductObtained: () => {},
    editStatus: null,
    setEntryStatus: () => {},
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
        case "NEW_DISH":
            updatedDishes = [...state.availableDishes, action.payload]
            return {
                ...state, availableDishes: updatedDishes
            }
    }
}

export default function KitchenContextProvider({children}){

    const [isFetchingData, setIsFetchingData] = useState(false);
    const fetchedRecipes = useRef()
    const fetchedDishes = useRef()
    const fetchedBasket = useRef()

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
        availableBasket: [],
        editStatus: null,
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
           setEntryStatus(null)
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

        fetchedRecipes.current = recipes;
        setIsFetchingData(false);
    }

    const addNewRecipe = async (recipe) => {
        //postRecipes(utilState.user, newRecipe)
        const id = recipesState.availableRecipes.length + 1;
        const newRecipe = {...recipe, id};
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

        fetchedDishes.current = dishes;
        setIsFetchingData(false);
    }

    const setActiveDish = (dish) => {
        dishDispatch({
            type: "SET_ACTIVE_DISH",
            payload: dish
        })

    }

    const addNewDish = (dish) => {
        const id = dishesState.availableDishes.length + 1;
        const newDish = {...dish, id};
        dishDispatch({
            type: "NEW_DISH",
            payload: newDish
        })

        setActiveDish(null);
    }

    const updateDish = (dish) => {
        dishDispatch({
            type: "MODIFY_DISH",
            payload: dish
        })

        setActiveDish(null);
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

        fetchedBasket.current = basket;
        setIsFetchingData(false);
    }

    const addNewProduct = (products) => {
        let id = basketState.availableBasket.length;
        const newProducts = products.map(product => {
            const newProduct = {...product, id: parseInt(id + 1)}
            id++;
            return newProduct;
        });


        basketDispatch({
            type: "ADD_PRODUCTS",
            payload: newProducts
        })

      
        setEntryStatus(null);
        setModalState(null);
    }

    const updateProducts = (updatedProducts) => {
         basketDispatch({
                type: "SET_BASKET",
                payload: updatedProducts
        })
        setEntryStatus(null);
    }

    const setProductObtained = (obtainedProduct) => {
        basketDispatch({
            type: "MODIFY_PRODUCT",
            payload: obtainedProduct
        })
    }
    
    const deleteProduct = (product) => {
        console.log(product)
        basketDispatch({
            type: "DELETE_PRODUCT",
            payload: product
        })
        setEntryStatus(null);
    }

    const setEntryStatus = (status) => {
        basketDispatch({
            type: "SET_STATUS",
            payload: status
        })
    }

    const filterList = (value) => {

        switch(utilState.activeSection){
            case "recipes":
                filter({
                    fullList: fetchedRecipes.current,
                    value,
                    dispatch: recipeDispatch,
                    type: "SET_RECIPES"
                })
                break;
            case "dishes":
                filter({
                    fullList: fetchedDishes.current,
                    value,
                    dispatch: dishDispatch,
                    type: "SET_DISHES"
                })
                break;
            case "basket":
                filter({
                    fullList: fetchedBasket.current,
                    value,
                    dispatch: basketDispatch,
                    type: "SET_BASKET"
                })
                break;
        }
    }

    const sortList = (sortBy) => {
        
        switch(utilState.activeSection){
            case "recipes":
                sort({
                    fullList: recipesState.availableRecipes,
                    value: sortBy,
                    dispatch: recipeDispatch,
                    type: "SET_RECIPES"
                })
                break;
            case "dishes":
                sort({
                    fullList: dishesState.availableDishes,
                    value: sortBy,
                    dispatch: dishDispatch,
                    type: "SET_DISHES"
                })
                break;
            case "basket":
                sort({
                    fullList: basketState.availableBasket,
                    value: sortBy,
                    dispatch: basketDispatch,
                    type: "SET_BASKET"
                })
                break;
        }
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
        filterList,
        sortList,
        setAvailableDishes,
        availableDishes: dishesState.availableDishes,
        setActiveDish,
        activeDish: dishesState.activeDish,
        deleteDish,
        addNewDish,
        setAvailableBasket,
        availableBasket: basketState.availableBasket,
        addNewProduct,
        deleteProduct,
        updateDish,
        setProductObtained,
        updateProducts,
        editStatus: basketState.editStatus,
        setEntryStatus,
        setFavorite,

    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}