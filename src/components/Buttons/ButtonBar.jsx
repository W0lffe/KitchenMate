
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, 
        faPenToSquare, 
        faStar,
        faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { getIconStyle, topButtonBar } from "../ItemInspectView/inspectStyles";
import IconButton from "./IconButton";
import Button from "./Button";


/**
 * Component rendering a bar of buttons for item actions
 * @param {boolean} isMobile indicates if the device used is mobile
 * @param {function} handleDelete function to handle delete action
 * @param {function} handleModify function to handle modify action
 * @param {function} handleFavorite function to handle favorite action
 * @param {function} handleAddCart function to handle add to cart action
 * @param {string} fav indicates if the item is favorited
 * @returns 
 */
export default function ButtonBar({isMobile, handleDelete, handleModify, handleFavorite, handleAddCart, fav}){

    return(
        <span className={topButtonBar + `${isMobile ? " sticky top-0 bg-gray-950/90" : ""}`}>
            <IconButton func={handleDelete}>
                <FontAwesomeIcon icon={faTrash} 
                                    className={getIconStyle("del")}
                />
            </IconButton>
            <IconButton func={handleModify}>
                <FontAwesomeIcon icon={faPenToSquare} 
                                    className={getIconStyle()}
                />
            </IconButton>
            <IconButton func={handleFavorite}>
                <FontAwesomeIcon icon={faStar} 
                                    className={getIconStyle(fav)}
                />
            </IconButton>
            <IconButton func={handleAddCart}>
                <FontAwesomeIcon icon={faCartPlus} 
                                    className={getIconStyle()}
            />
            </IconButton>
                {isMobile && <Button use={"close"}/>}
            </span>
    )
}