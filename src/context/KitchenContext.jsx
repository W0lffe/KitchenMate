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
        recipesAPI } from "../api/http.js"
import { filter, 
        sort } from "../util/filterSort.js";
import toast from "react-hot-toast";

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
    activeModal: "",
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
})

export default function KitchenContextProvider({children}){

    const [isFetchingData, setIsFetchingData] = useState(false);
    const fetchedRecipes = useRef()
    const fetchedDishes = useRef()
    const fetchedBasket = useRef()

    const [utilState, utilDispatch] = useReducer(utilityReducer, {
        slogan: "",
        navigationIsOpen: true,
        activeSection: "",
        user: {
            id: 0
        },
        activeModal: "",
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

    const basketStateHandler = {
            type: "SET_BASKET",
            api: basketAPI,
            ref: fetchedBasket
    };
    const dishesStateHandler = {
            type: "SET_DISHES",
            api: dishesAPI,
            ref: fetchedDishes
    };
    const recipesStateHandler = {
            type: "SET_RECIPES",
            api: recipesAPI,
            ref: fetchedRecipes
    };

    useEffect(() => {
        initializeData();
    }, [utilState.user])

    const handleRequest = async (dataToHandle, basketAdd) => {

        const isRecipe = utilState.activeSection === "recipes";
        const isDish = utilState.activeSection === "dishes";
        const isBasket = utilState.activeSection === "basket";

        console.log("dataTohandle",dataToHandle)

        const {data, method} = dataToHandle;
        const body = {
                data,
                user: utilState.user.id,
                method
            }

        let response;
        const reducerHandler = {
                type: getReducerType(method, utilState.activeSection, basketAdd),
                payload: data.updatedItem ? data.updatedItem : data
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
        }

        return response;
    }

    const initializeData = () => {

        setAvailableList(recipesStateHandler)
        setAvailableList(dishesStateHandler)
        setAvailableList(basketStateHandler);
    }

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

        toggleNavigation();

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

    const setAvailableList = async (params) => {
        

        const {type, api, ref} = params;

        if(utilState.user === null){
             kitchenDispatch({
                type,
                payload: []
        })
            return;
        }

        setIsFetchingData(true);


        const { data, error } = await api({
            user: utilState.user.id
        }) 

        if(error){
            toast.error(error);
            setIsFetchingData(false);
            return;
        }

        kitchenDispatch({
                type,
                payload: data
        })

        ref.current = data;

        setIsFetchingData(false);

    }
     
    const setActiveRecipe = (recipe) => {
        kitchenDispatch({
            type: "SET_ACTIVE_RECIPE",
            payload: recipe
        })
    }
   
    const setActiveDish = (dish) => {
        kitchenDispatch({
            type: "SET_ACTIVE_DISH",
            payload: dish
        })
    }
    const setEntryStatus = (status) => {
        kitchenDispatch({
            type: "SET_ENTRY_STATUS",
            payload: status
        })
    }


    const filterList = (value) => {

        console.log("filtering", value)

        if(kitchenState.activeDish?.mode === "create"){
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
        fullRecipes: fetchedRecipes
    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}