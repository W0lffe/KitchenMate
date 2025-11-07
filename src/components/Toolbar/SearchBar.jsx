import { inputStyle } from "./toolbarStyles";

/**
 * Search bar component for filtering items
 * @param {Function} filter the filter function to handle search input
 * @returns Search bar UI
 */
export default function SearchBar({filter}){

    return(
        <input type="text" 
                                name="search" 
                                placeholder="Search..." 
                                className={inputStyle} 
                                onChange={(event) => filter(event.target.value)}/>
    )
}