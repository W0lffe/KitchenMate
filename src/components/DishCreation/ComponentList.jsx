import { listDivStyle, 
        listItemStyle, 
        labelStyle, 
        listStyle } from "./dishCreationStyles"
import { getListItemStyle } from "../List/listStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, 
        faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Toolbar/SearchBar";


/**
 * Component list used in DishCreation component.
 * @param {boolean} isMobile whether the device is mobile or not
 * @param {boolean} isRecipe whether the list is for selecting recipes or displaying components
 * @param {Array} listToUse list of recipes/components to display
 * @param {Array} isSelected list of selected recipe IDs
 * @param {Function} handleUpdate function to handle updating selected components
 * @param {Function} filter function to filter the list
 * @returns list of components/recipes to use in DishCreation
 */
export default function ComponentList({isMobile, isRecipe, listToUse, isSelected, handleUpdate, filter}){

    const header = isRecipe ? "Add Recipes to Dish" : "Components";
    const fallback = isRecipe ? "Recipe list is empty." : "No components added yet";

    /**
     * Check if a component is selected
     * @param {*} recipeID id value of current recipe
     * @returns boolean
     */
    const isComponentSelected = (recipeID) => {
        const componentSelected = isSelected.includes(recipeID);
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