export const utilityReducer = (state, action) => {
    switch(action.type){
        case "SET_SLOGAN":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return{
                ...state, slogan: action.payload
            }
        case "SET_NAVIGATION_STATE":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, navigationIsOpen: action.payload
            }
        case "SET_ACTIVE_SECTION":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, activeSection: action.payload
            }
        case "SET_USER":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, 
                user: action.payload.username,
                userIsLogged: action.payload.status
            }
        case "SET_MODAL_STATE":
            console.log("UTILITY_DEBUG:", action.type, action.payload)
            return {
                ...state, 
                activeModal: action.payload.section,
                modalIsOpen: action.payload.modalState
            }
        default: 
            return state;
    }
}