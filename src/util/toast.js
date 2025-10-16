import toast from "react-hot-toast";

export const handleToast = ({
    success,
    error,
    setActiveRecipe,
    setModalState,
    setActiveDish,
    setEntryStatus,
    delay = 500,
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
