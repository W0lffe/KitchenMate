import { createContext,
        useReducer} from "react";
import { getRandomSlogan } from "../util/util";

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
    activeModal: ""
})

const utilityReducer = (state, action) => {
    switch(action.type){
        case "SET_SLOGAN":
            console.log("DEBUG", action.type, action.payload)
            return{
                ...state, slogan: action.payload
            }
        case "SET_NAVIGATION_STATE":
            console.log("DEBUG", action.type, action.payload)
            return {
                ...state, navigationIsOpen: action.payload
            }
        case "SET_ACTIVE_SECTION":
            console.log("DEBUG", action.type, action.payload)
            return {
                ...state, activeSection: action.payload
            }
        case "SET_USER":
            console.log("DEBUG", action.type, action.payload)
            return {
                ...state, 
                user: action.payload.username,
                userIsLogged: action.payload.status
            }
        case "SET_MODAL_STATE":
            console.log("DEBUG", action.type, action.payload)
            return {
                ...state, 
                activeModal: action.payload.section,
                modalIsOpen: action.payload.modalState
            }
        default: 
            return state;
    }
}

export default function KitchenContextProvider({children}){

    const [utilState, utilDispatch] = useReducer(utilityReducer, {
        slogan: "",
        navigationIsOpen: true,
        activeSection: "",
        user: "",
        userIsLogged: false,
        activeModal: "",
        modalIsOpen: false
    })

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
        activeModal: utilState.activeModal
    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}