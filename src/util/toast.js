import toast from "react-hot-toast";

/**
 * Function to handle toasts for success and error messages across the app
 * @param {Object} success success message to show
 * @param {Object} error error message to show
 * @param {Function} setActiveRecipe function to set active recipe state
 * @param {Function} setModalState function to set modal state
 * @param {Function} setActiveDish function to set active dish state
 * @param {Function} setEntryStatus function to set entry status state
 * @param {number} delay delay before closing modal and resetting states
 * @param {boolean} close whether to close modal and reset states
 * @returns if error is present
 */
export const handleToast = ({
    success,
    error,
    setActiveRecipe,
    setModalState,
    setActiveDish,
    setEntryStatus,
    delay = 250,
    close = true
}) => {
    
    if(error){
        toast.error(error)
        return;
    }

    if(success){
        toast.success(success);
    }

    if(close){
        setTimeout(() => {
            if(setModalState) setModalState({}, false);
            if(setEntryStatus) setEntryStatus(null);
            if(setActiveRecipe) setActiveRecipe(null);
            if(setActiveDish) setActiveDish(null);
        }, delay);
    }

}
