import { createContext,
        useEffect,
        useReducer,
         useRef,
         useState} from "react";
import { getRandomSlogan, 
        getReducerType } from "../util/util";
import { utilityReducer, 
        kitchenReducer } from "./reducer.js";
import { basketAPI, 
        dishesAPI, 
        recipesAPI, 
        login, 
        healthCheck} from "../api/http.js"
import { filter, 
        sort } from "../util/filterSort.js";
import { handleToast } from "../util/toast.js";

/**
 * KitchenContext to provide global state and functions
 */
export const KitchenContext = createContext({
    slogan: "",
    setSlogan: () => {},
    navigationIsOpen: false,
    toggleNavigation: () => {},
    activeSection: "",
    setActiveSection: () => {},
    setUser: () => {},
    user: null,
    isInitialized: false,
    setModalState: () => {},
    modalIsOpen: false,
    isMobile: false,
    setIsMobile: () => {},
    activeModal: {},
    availableRecipes: [],
    activeRecipe: null,
    setActiveRecipe: () => {},
    isFetchingData: false,
    filterList: () => {},
    sortList: () => {},
    availableDishes: [],
    setActiveDish: () => {},
    activeDish: null,
    availableBasket: [],
    editStatus: null,
    setEntryStatus: () => {},
    setFavorite: () => {},
    handleRequest: () => {},
    fullBasket: [],
    fullRecipes: [],
    fullDishes: [],
    updateActives: () => {}
})

/**
 * KitchenContextProvider component to provide context values to its children
 * @param {JSX} children components consuming the context
 * @returns {JSX} context provider component
 */
export default function KitchenContextProvider({children}){

    
    const [isFetchingData, setIsFetchingData] = useState(false);
    /**
     * Reference to list of fetched recipes, used for sorting and filtering
     */
    const fetchedRecipes = useRef()
     /**
     * Reference to list of fetched dishes, used for sorting and filtering
     */
    const fetchedDishes = useRef()
     /**
     * Reference to list of fetched basket, used for sorting and filtering
     */
    const fetchedBasket = useRef()

    const [utilState, utilDispatch] = useReducer(utilityReducer, {
        slogan: "",
        navigationIsOpen: true,
        activeSection: "",
        user: null,
        activeModal: {},
        modalIsOpen: false,
        isMobile: false,
    })

    const [kitchenState, kitchenDispatch] = useReducer(kitchenReducer, {
        availableRecipes: [],
        activeRecipe: null,
        availableDishes: [],
        activeDish: null,
        availableBasket: [],
        editStatus: null,
    })

    /**
     * Handler object for basket state updates which holds reducer type, api function, and reference
     * @property {string} type: "SET_BASKET"
     * @property {function} api: basketAPI
     * @property {Object} ref: fetchedBasket
     */
    const basketStateHandler = {
            type: "SET_BASKET",
            api: basketAPI,
            ref: fetchedBasket
    };
    /**
     * Handler object for dish state updates which holds reducer type, api function, and reference
     * @property {string} type: "SET_DISHES"
     * @property {function} api: dishesAPI
     * @property {Object} ref: fetchedDishes
     */
    const dishesStateHandler = {
            type: "SET_DISHES",
            api: dishesAPI,
            ref: fetchedDishes
    };
    /**
     * Handler object for recipe state updates which holds reducer type, api function, and reference
     * @property {string} type: "SET_RECIPES"
     * @property {function} api: recipesAPI
     * @property {Object} ref: fetchedRecipes
     */
    const recipesStateHandler = {
            type: "SET_RECIPES",
            api: recipesAPI,
            ref: fetchedRecipes
    };

    useEffect(() => {
        const run = async () => {

            const {status, error} = await healthCheck();
            
            if(status){
                if(!utilState.user){
                    const {user, error} = await login();
                    handleToast({
                        error,
                    })
                    if(user) setUser(user);
                }

                if(utilState.user && utilState.user?.id !== null){
                    initializeData();
                }

                if(kitchenState.activeRecipe){
                    setActiveRecipe(null)
                }
                if(kitchenState.activeDish){
                    setActiveDish(null)
                }
            }
            else{
                handleToast({
                    error
                })
            }
           
        }
        run();
      
    }, [utilState.user])

    /**
     * Request handler to make API calls and update state accordingly
     * @param {Object} dataToHandle includes data and method
     * @param {boolean} basketAdd flag to indicate if adding to basket
     * @returns success/error response from server
     */
    const handleRequest = async (dataToHandle, basketAdd) => {

        const isRecipe = utilState.activeSection === "recipes";
        const isDish = utilState.activeSection === "dishes";
        const isBasket = utilState.activeSection === "basket";

        console.log("dataTohandle",dataToHandle)

        const {data, method} = dataToHandle;
        const body = {
                data,
                method
            }

        let response;
        const reducerHandler = {
                type: getReducerType(method, utilState.activeSection, basketAdd),
                payload: data
        }
        console.log("handleri", reducerHandler)
        let apiHandler = null;
        
        if(basketAdd){
            response = await basketAPI(body);
            apiHandler = basketStateHandler;
        }
        else if(isRecipe){
            response = await recipesAPI(body);
            apiHandler = recipesStateHandler;
        }
        else if(isDish){
            response = await dishesAPI(body);
            apiHandler = dishesStateHandler;
        }
        else if(isBasket){
            response = await basketAPI(body);
            apiHandler = basketStateHandler;
        }

        const {success, error} = response;

        if(success){
            kitchenDispatch(reducerHandler);
            setAvailableList(apiHandler);
            if(data.dependencies !== undefined){
                setAvailableList(dishesStateHandler);
            }
            updateActives();
        }

        return response;
    }

    /**
     * Function to initialize data by fetching recipes, dishes, and basket
     */
    const initializeData = () => {
        setAvailableList(recipesStateHandler);
        setAvailableList(dishesStateHandler);
        setAvailableList(basketStateHandler);
    }

    /**
     * Function to reset all lists to their unfiltered state by setting full fetched data from references
     */
    const resetToUnfiltered = () => {
       kitchenDispatch({
        type: basketStateHandler.type,
        payload: fetchedBasket.current
       })
       kitchenDispatch({
        type: recipesStateHandler.type,
        payload: fetchedRecipes.current
       })
       kitchenDispatch({
        type: dishesStateHandler.type,
        payload: fetchedDishes.current
       })
    }


    /**
     * Function to set isMobile state in context
     * @param {boolean} isMobile indicates if device is mobile 
     */
    const setIsMobile = (isMobile) => {
        utilDispatch({
            type: "SET_MOBILE",
            payload: isMobile
        })
    }
    /**
     * Function to set a random slogan in context
     */
    const setSlogan = () => {
        utilDispatch({
            type: "SET_SLOGAN",
            payload: getRandomSlogan()
        })
    }
    /**
     * Function to toggle navigation open/close state in context
     */
    const toggleNavigation = () => {
        utilDispatch({
            type: "SET_NAVIGATION_STATE",
            payload: !utilState.navigationIsOpen
        })
    }
    /**
     * Function to set active section in context, resets other states as needed
     * @param {string} section section to set as active
     */
    const setActiveSection = (section) => {

        if(section === utilState.activeSection){
            section = null;
        }

        resetToUnfiltered();

        if(section !== null){
            setActiveRecipe(null)
            setActiveDish(null)
            setEntryStatus(null)
            toggleNavigation();
        }

        utilDispatch({
            type: "SET_ACTIVE_SECTION",
            payload: section
        })
    }
    /**
     * Function to set user in context
     * @param {Object} user object containing user data, name and id
     */
    const setUser = (user) => {
        utilDispatch({
            type: "SET_USER",
            payload: user
        })
        setActiveSection(null);
    }
    /**
     * Sets modal state in context
     * @param {Object} activeModal wich modal to set as active
     * @param {boolean} modalState open or closed = true or false
     */
    const setModalState = (activeModal, modalState) => {
        utilDispatch({
            type: "SET_MODAL_STATE",
            payload: {
                activeModal,
                modalState
            }
        })
    }

    /**
     * Function to fetch and set available list (recipes, dishes, basket) in context
     * @param {Object} params includes type, api, ref
     * @returns 1. If user is not logged in, sets empty list and returns 
     * @returns 2. If error occurs during fetch, shows toast and returns
     */
    const setAvailableList = async (params) => {

        const {type, api, ref} = params;

        if(!utilState.user){
            kitchenDispatch({
                type,
                payload: []
            })
            return;
        }

        setIsFetchingData(true);

        const { data, error } = await api({
            user: utilState.user.id
        });

        if(error){
            handleToast({error});
        }

        kitchenDispatch({
                type,
                payload: !error ? data : []
        })

        ref.current = !error ? data : [];

        setIsFetchingData(false);
    }


    const updateActives = () => {
        
        if(kitchenState.activeDish?.mode === "detail"){
            const id = kitchenState.activeDish.dish.id;
            kitchenDispatch({
                type: "SET_ACTIVE_DISH",
                payload: {
                    dish: fetchedDishes.current.find(dish=> dish.id === id),
                    mode: "detail"
                }
            })
        }
        else if(kitchenState.activeRecipe?.mode === "detail"){
            const id = kitchenState.activeRecipe.recipe.id;
            kitchenDispatch({
                type: "SET_ACTIVE_RECIPE",
                payload: {
                    recipe: fetchedRecipes.current.find(recipe => recipe.id === id),
                    mode: "detail"
                }
            })
        }
    }
    
    /**
     * Sets active recipe in context, used in recipe creation/editing
     * @param {Object} recipe recipe object to set as active
     */
    const setActiveRecipe = (recipe) => {
        kitchenDispatch({
            type: "SET_ACTIVE_RECIPE",
            payload: recipe
        })
    }
   /**
    * Sets active dish in context, used in dish creation/editing
    * @param {Object} dish dish object to set as active
    */
    const setActiveDish = (dish) => {
        kitchenDispatch({
            type: "SET_ACTIVE_DISH",
            payload: dish
        })
    }
    /**
     * Sets entry status in context, used in manual basket entries
     * @param {Object} status status: bool and mode: "add" or "edit"
     */
    const setEntryStatus = (status) => {
        kitchenDispatch({
            type: "SET_ENTRY_STATUS",
            payload: status
        })
    }

    /**
     * Function to filter the available list based on a search value
     * @param {string} value search word/key
     */
    const filterList = (value) => {

        //console.log("filtering", value)

        if(["edit", "create"].includes(kitchenState.activeDish?.mode)){
            filter({
                    fullList: fetchedRecipes.current,
                    value,
                    dispatch: kitchenDispatch,
                    type: "SET_RECIPES"
                })
            return;
        }

        switch(utilState.activeSection){
            case "recipes":
                filter({
                    fullList: fetchedRecipes.current,
                    value,
                    dispatch: kitchenDispatch,
                    type: "SET_RECIPES"
                })
                break;
            case "dishes":
                filter({
                    fullList: fetchedDishes.current,
                    value,
                    dispatch: kitchenDispatch,
                    type: "SET_DISHES"
                })
                break;
            case "basket":
                filter({
                    fullList: fetchedBasket.current,
                    value,
                    dispatch: kitchenDispatch,
                    type: "SET_BASKET"
                })
                break;
        }
    }

    /**
     * Function to sort the available list based on a specified key
     * @param {string} value sorting key
     */
    const sortList = (sortBy) => {

        if(kitchenState.activeDish?.mode === "create"){
           sort({
                    fullList: kitchenState.availableRecipes,
                    value: sortBy,
                    dispatch: kitchenDispatch,
                    type: "SET_RECIPES"
                })
            return;
        }
        
        switch(utilState.activeSection){
            case "recipes":
                sort({
                    fullList: kitchenState.availableRecipes,
                    value: sortBy,
                    dispatch: kitchenDispatch,
                    type: "SET_RECIPES"
                })
                break;
            case "dishes":
                sort({
                    fullList: kitchenState.availableDishes,
                    value: sortBy,
                    dispatch: kitchenDispatch,
                    type: "SET_DISHES"
                })
                break;
            case "basket":
                sort({
                    fullList: kitchenState.availableBasket,
                    value: sortBy,
                    dispatch: kitchenDispatch,
                    type: "SET_BASKET"
                })
                break;
        }
    }

    /**
     * Context value object to be provided to consuming components
     */
    const ctxValue = {
        slogan: utilState.slogan,
        setSlogan,
        navigationIsOpen: utilState.navigationIsOpen,
        toggleNavigation,
        activeSection: utilState.activeSection,
        setActiveSection,
        setUser, 
        user: utilState.user,
        setModalState,
        modalIsOpen: utilState.modalIsOpen,
        activeModal: utilState.activeModal,
        isMobile: utilState.isMobile,
        setIsMobile,
        availableRecipes: kitchenState.availableRecipes,
        activeRecipe: kitchenState.activeRecipe,
        setActiveRecipe,
        isFetchingData: isFetchingData,
        filterList,
        sortList,
        availableDishes: kitchenState.availableDishes,
        setActiveDish,
        activeDish: kitchenState.activeDish,
        availableBasket: kitchenState.availableBasket,
        editStatus: kitchenState.editStatus,
        setEntryStatus,
        handleRequest,
        fullBasket: fetchedBasket,
        fullRecipes: fetchedRecipes,
        fullDishes: fetchedDishes,
    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}