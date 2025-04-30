import { createContext,
        useReducer} from "react";
import { getRandomSlogan } from "../util/util";
import { utilityReducer } from "./utilityReducer";

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
    activeModal: "",
})

export default function KitchenContextProvider({children}){

    const [utilState, utilDispatch] = useReducer(utilityReducer, {
        slogan: "",
        navigationIsOpen: true,
        activeSection: "",
        user: "",
        userIsLogged: false,
        activeModal: "",
        modalIsOpen: false,
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
        if(section === utilState.activeSection){
            section = undefined;
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
    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}