
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, 
        faPenToSquare, 
        faStar,
        faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { getIconStyle, iconSpan } from "../ItemInspectView/inspectStyles";
import IconButton from "./IconButton";
import Button from "./Button";

export default function ButtonBar({isMobile, handleDelete, handleModify, handleFavorite, handleAddCart, fav}){

    return(
        <span className={iconSpan}>
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