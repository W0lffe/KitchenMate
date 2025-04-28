import { createContext,
        useReducer} from "react";
import { getRandomSlogan } from "../util/util";

export const KitchenContext = createContext({
    slogan: "",
    setSlogan: () => {},
})

const utilityReducer = (state, action) => {
    switch(action.type){
        case "SET_SLOGAN":
            console.log("DEBUG", action.type, action.payload)
            return{
                ...state, slogan: action.payload
            }
        default: 
            return state;
    }
}

export default function KitchenContextProvider({children}){

    const [utilState, utilDispatch] = useReducer(utilityReducer, {
        slogan: "",
    })

    const setSlogan = () => {
        utilDispatch({
            type: "SET_SLOGAN",
            payload: getRandomSlogan()
        })
    }

    const ctxValue = {
        slogan: utilState.slogan,
        setSlogan
    }

    return(
        <KitchenContext.Provider value={ctxValue}>
            {children}
        </KitchenContext.Provider>
    )
}