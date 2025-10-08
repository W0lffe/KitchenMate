import { listDivStyle, 
        listItemStyle, 
        listSpanStyle,
        labelStyle, 
        listStyle } from "./dishCreationStyles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../Toolbar/SearchBar";

export default function ComponentList({isMobile, isRecipe, list, func, filter}){

    const header = isRecipe ? "Add Recipes to Dish" : "Components";
    const fallback = isRecipe ? "Recipe list is empty." : "No components added yet";

    return(
        isMobile ? (
            <div className={listDivStyle}>
                <span className={listSpanStyle}>
                    <label className={labelStyle}>{header}</label>
                    <SearchBar filter={filter} />
                    {list.length > 0 ? (isRecipe &&
                        <ul>
                            {list.map((recipe, i) => 
                            <li key={i} className={listItemStyle}>
                                <label>{recipe.name}</label>
                                <FontAwesomeIcon icon={faSquareCheck}
                                                onClick={() => func(recipe.id)}/>
                            </li>)}
                        </ul>
                    ) : (
                        <label>{fallback}</label>
                    )}
                </span>
            </div>
        ) : (
            <div className={listDivStyle}>
                <label className={labelStyle}>{header}</label>
                {list.length > 0 ? (
                    <ul className={listStyle}>
                        {list.map((component, i) => 
                          <li key={i} className={listItemStyle}>
                                <label>{component.name}</label>
                                <FontAwesomeIcon icon={faSquareCheck}
                                                onClick={() => func(component.id)}/>
                          </li>)} 
                    </ul>
                ) : (
                    <label>{fallback}</label>
                )}
                    
                    
            </div>
        )
        
    )
}