import { KitchenContext } from "../../context/KitchenContext"
import { useContext, 
        useState, 
        useEffect } from "react"
import { getListItemStyle, 
        listItemNameStyle } from "./listStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, 
        faSquareCheck, 
        faTrash, 
        faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";


export default function ListItem({item}){

    const {setActiveRecipe, setActiveDish, isMobile, setModalState, activeSection, activeDish, handleRequest} = useContext(KitchenContext)
    const [section, setSection] = useState(null);

    useEffect(() => {
        setSection(activeSection)
    },[activeSection])
    
    const isCreatingDish = activeDish?.mode === "create";
    const isEditingDish = activeDish?.mode === "edit";
    let iconToUse = section === "basket" ? faSquareCheck : faEye;
    iconToUse = isCreatingDish || isEditingDish ? faSquarePlus : iconToUse;

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
        if(section === "recipes"){
            setActiveRecipe({recipe: item, mode: "detail"});

            if(isMobile){
                setModalState(activeSection, true);
            }
        }
        else if(section === "dishes"){
            if(isCreatingDish){
                const existingComponents = activeDish?.components || [];
                const components = [...existingComponents, item];
               
                setActiveDish({dish: null, mode: "create", components})
            }
            else if(isEditingDish){
                const existingComponents = activeDish.dish?.components || [];
                const components = [...existingComponents, item];
                setActiveDish({
                    dish: {
                        ...activeDish.dish,
                        components
                    },
                    mode: "edit"})
            }
            else{
                setActiveDish({dish: item, mode: "detail"});
            }
            if(isMobile){
                setModalState(activeSection, true);
            }
        }
        else if(section === "basket"){
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

        toast.success(`Product is ${!item.obtained ? "obtained!" : "not obtained!"}`);
        }
    }

    return(
        <li className={getListItemStyle(isMobile, item.obtained ? item.obtained : null)}>
            {section === "recipes" || (section === "dishes" && (isCreatingDish || isEditingDish)) ? <RecipeItem item={item}/> : null}
            {section === "basket" ? <BasketItem item={item}/> : null}
            {(section === "dishes" && (!isCreatingDish && !isEditingDish)) ? <DishItem item={item} /> : null}
            <FontAwesomeIcon onClick={handleClick} icon={iconToUse} className={item.obtained ? "text-green-600" : " text-[17px]"}/>
            {section === "basket" ? <FontAwesomeIcon icon={faTrash} onClick={handleDelete} /> : null}
        </li>
    )
}

function RecipeItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.name}</label>
        <label>{item.output?.portions}</label>
        <label>{item.prepTime?.time} {item.prepTime?.format}</label>
        </>
    )
}

function BasketItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.product}</label>
        <label>{item.quantity}</label>
        <label>{item.unit}</label>
        </>
    )
}

function DishItem({item}){
    return(
        <>
        <label className={listItemNameStyle}>{item.name}</label>
        <label>{item.course}</label>
        <label>{item.components?.length}</label>
        </>
    )
}