import { listDivStyle, 
        listItemStyle, 
        labelStyle, 
        listStyle } from "./dishCreationStyles"
import { getListItemStyle } from "../List/listStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, 
        faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Toolbar/SearchBar";

export default function ComponentList({isMobile, isRecipe, listToUse, isSelected, handleUpdate, filter}){

    const header = isRecipe ? "Add Recipes to Dish" : "Components";
    const fallback = isRecipe ? "Recipe list is empty." : "No components added yet";

    const isComponentSelected = (recipeID) => {
        console.log(isSelected)
        const componentSelected = isSelected.includes(recipeID);
        console.log("recipe id:",recipeID, "is selected", componentSelected)
        return componentSelected;
    }

    return(
        isMobile ? (
            <div className={listDivStyle}>
                    <label className={labelStyle}>{header}</label>
                    <SearchBar filter={filter} />
                    {listToUse.length > 0 ? (isRecipe &&
                        <ul className={listStyle}>
                            {listToUse.map((recipe, i) => 
                            <li key={i} className={getListItemStyle(isMobile, isComponentSelected(recipe.id))}>
                                <label>{recipe.name}</label>
                                <FontAwesomeIcon icon={ isComponentSelected(recipe.id) ? faSquareMinus : faSquarePlus}
                                                onClick={() => handleUpdate(recipe.id)}/>
                            </li>)}
                        </ul>
                    ) : (
                        <label>{fallback}</label>
                    )}
            </div>
        ) : (
            <div className={listDivStyle}>
                <label className={labelStyle}>{header}</label>
                {listToUse.length > 0 ? (
                    <ul className={listStyle}>
                        {listToUse.map((component, i) => 
                          <li key={i} className={listItemStyle}>
                                <label>{component.name}</label>
                          </li>)} 
                    </ul>
                ) : (
                    <label>{fallback}</label>
                )}
            </div>
        )
        
    )
}