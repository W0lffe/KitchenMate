import { KitchenContext } from "../../context/KitchenContext"
import { useContext } from "react"
import { getListItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, 
        faSquareCheck, 
        faTrash, 
        faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import createComponentUpdater from "../DishCreation/dishUtil";
import IconButton from "../Buttons/IconButton";


export default function ListItem({item}){

    const {setActiveRecipe, setActiveDish, isMobile, setModalState, activeSection, activeDish, handleRequest, isFetchingData} = useContext(KitchenContext)

    const {mode, dish} = activeDish || {};
    const {updateComponents} = createComponentUpdater({
        dish, mode, setActiveDish}
    );
  
    const isCreatingDish = activeDish?.mode === "create";
    const isEditingDish = activeDish?.mode === "edit";

    const iconToUse = (isCreatingDish || isEditingDish) ? faSquarePlus :
                        activeSection === "basket" ? faSquareCheck : faEye;

    const handleDelete = async () => {
        const response = await handleRequest({
            data: {id: item.id},
            method: "DELETE"
        })
        const {error, success} = response;

        if(error){
            toast.error(error);
            return;
        }

        toast.success(success);
    }
   
    const handleClick = async () => {
        if(activeSection === "recipes"){
            setActiveRecipe({recipe: item, mode: "detail"});

            if(isMobile){
                setModalState(activeSection, true);
            }
        }
        else if(activeSection === "dishes"){
            if(isCreatingDish || isEditingDish){
                updateComponents(item.id);
            }
            else{
                setActiveDish({dish: item, mode: "detail"});
            }
            if(isMobile){
                setModalState(activeSection, true);
            }
        }
        else if(activeSection === "basket"){
            const updatedItem = {...item, obtained: !item.obtained};
            const response = await handleRequest({
                data: {
                    updatedItem,
                    update: true
                },
                method: "PUT"
            });

             const {error} = response;

        if(error){
            toast.error(error);
            return;
        }

        toast.success(`Product is marked as ${!item.obtained ? "obtained!" : "not obtained!"}`);
        }
    }

    return(
        <li className={getListItemStyle(isMobile, item.obtained ? item.obtained : null)}>
            {activeSection === "recipes" || (activeSection === "dishes" && (isCreatingDish || isEditingDish)) ? <RecipeItem item={item} isCreatingDish={isCreatingDish || isEditingDish}/> : null}
            {activeSection === "basket" && <BasketItem item={item}/>}
            {(activeSection === "dishes" && (!isCreatingDish && !isEditingDish)) && <DishItem item={item} />}
            <IconButton func={handleClick}>
                 <FontAwesomeIcon icon={iconToUse} 
                                className={item.obtained ? "text-green-600" : " text-[17px]"}/>
            </IconButton>
            {activeSection === "basket" && 
                <IconButton func={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            }
        </li>
    )
}

function RecipeItem({item, isCreatingDish}){
    const {name, portions, time, timeFormat} = item;

    return(
        <>
        <label className={listItemNameStyle}>{name}</label>
        {!isCreatingDish && 
            <>
                <label>{portions}</label>
                <label>{time} {timeFormat}</label>
            </>
        }
        </>
    )
}

function BasketItem({item}){
    const {product, quantity, unit} = item;

    return(
        <>
        <label className={listItemNameStyle}>{product}</label>
        <label>{quantity}</label>
        <label>{unit}</label>
        </>
    )
}

function DishItem({item}){
    const {name, course, components} = item;

    return(
        <>
        <label className={listItemNameStyle}>{name}</label>
        <label>{course}</label>
        <label>{components?.length}</label>
        </>
    )
}